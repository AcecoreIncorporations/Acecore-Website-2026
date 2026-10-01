import fs from 'node:fs';
import path from 'node:path';
import tls from 'node:tls';
import net from 'node:net';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_FILE_PATH = path.resolve(__dirname, '../../.env');

// Zero-dependency .env loader
export function loadEnvFile() {
  if (fs.existsSync(ENV_FILE_PATH)) {
    try {
      const content = fs.readFileSync(ENV_FILE_PATH, 'utf8');
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (process.env[key] === undefined) {
            process.env[key] = val;
          }
        }
      });
    } catch (err) {
      console.warn('[emailService] Could not read .env file:', err.message);
    }
  }
}

loadEnvFile();

export function getSmtpConfig() {
  loadEnvFile();
  const host = process.env.SMTP_HOST || '';
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const toEmail = process.env.CONTACT_TO_EMAIL || 'support@acecore.tech';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || user || 'support@acecore.tech';

  const isConfigured = Boolean(host && user && pass);

  return {
    host,
    port,
    secure,
    user,
    pass,
    toEmail,
    fromEmail,
    isConfigured,
  };
}

/**
 * Native Socket-based SMTP transport implementation
 * Supports direct SSL/TLS (port 465) and STARTTLS (port 587 / 25)
 */
function sendNativeSmtp({ host, port, secure, user, pass, from, to, subject, text, html }) {
  return new Promise((resolve, reject) => {
    let socket;
    let stage = 'CONNECT';
    const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    function send(data) {
      socket.write(`${data}\r\n`);
    }

    const onData = (buffer) => {
      const response = buffer.toString();
      const code = parseInt(response.slice(0, 3), 10);

      // Multi-line SMTP responses (e.g. 250-...) continue until space after code (e.g. 250 OK)
      if (response.charAt(3) === '-') {
        return;
      }

      if (code >= 400) {
        socket.destroy();
        return reject(new Error(`SMTP Error [${code}]: ${response.trim()}`));
      }

      switch (stage) {
        case 'CONNECT':
          stage = 'HELO';
          send(`EHLO acecore.tech`);
          break;

        case 'HELO':
          if (!secure && port === 587) {
            stage = 'STARTTLS';
            send('STARTTLS');
          } else {
            stage = 'AUTH_LOGIN';
            send('AUTH LOGIN');
          }
          break;

        case 'STARTTLS':
          stage = 'UPGRADE_TLS';
          socket.removeAllListeners('data');
          const tlsSocket = tls.connect({
            socket,
            host,
            rejectUnauthorized: false,
          });

          tlsSocket.on('secureConnect', () => {
            socket = tlsSocket;
            socket.on('data', onData);
            socket.on('error', reject);
            stage = 'POST_TLS_EHLO';
            send('EHLO acecore.tech');
          });
          tlsSocket.on('error', reject);
          break;

        case 'POST_TLS_EHLO':
          stage = 'AUTH_LOGIN';
          send('AUTH LOGIN');
          break;

        case 'AUTH_LOGIN':
          stage = 'AUTH_USER';
          send(Buffer.from(user).toString('base64'));
          break;

        case 'AUTH_USER':
          stage = 'AUTH_PASS';
          send(Buffer.from(pass).toString('base64'));
          break;

        case 'AUTH_PASS':
          stage = 'MAIL_FROM';
          send(`MAIL FROM:<${from}>`);
          break;

        case 'MAIL_FROM':
          stage = 'RCPT_TO';
          send(`RCPT TO:<${to}>`);
          break;

        case 'RCPT_TO':
          stage = 'DATA';
          send('DATA');
          break;

        case 'DATA':
          stage = 'DATA_CONTENT';
          const mimeMessage = [
            `From: "Acecore Support" <${from}>`,
            `To: <${to}>`,
            `Subject: ${subject}`,
            `MIME-Version: 1.0`,
            `Content-Type: multipart/alternative; boundary="${boundary}"`,
            '',
            `--${boundary}`,
            `Content-Type: text/plain; charset=utf-8`,
            `Content-Transfer-Encoding: 7bit`,
            '',
            text,
            '',
            `--${boundary}`,
            `Content-Type: text/html; charset=utf-8`,
            `Content-Transfer-Encoding: 7bit`,
            '',
            html,
            '',
            `--${boundary}--`,
            '.',
          ].join('\r\n');

          send(mimeMessage);
          break;

        case 'DATA_CONTENT':
          stage = 'QUIT';
          send('QUIT');
          break;

        case 'QUIT':
          socket.end();
          resolve({ success: true, messageId: `native-${Date.now()}` });
          break;
      }
    };

    if (secure) {
      socket = tls.connect(port, host, { rejectUnauthorized: false }, () => {});
    } else {
      socket = net.connect(port, host, () => {});
    }

    socket.setTimeout(15000);
    socket.on('data', onData);
    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('SMTP Connection timed out after 15 seconds'));
    });
    socket.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Main dispatch function for contact email
 */
export async function sendContactEmail({ fullName, email, phone, message }) {
  const config = getSmtpConfig();

  const subject = `New Contact Inquiry from ${fullName} - Acecore Support`;

  const plainText = [
    `ACECORE CONTACT INQUIRY`,
    `=====================================`,
    `Full Name:  ${fullName}`,
    `Email:      ${email}`,
    `Phone:      ${phone || 'Not provided'}`,
    `Date:       ${new Date().toLocaleString()}`,
    `-------------------------------------`,
    `Message:`,
    message,
    `=====================================`,
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0d10; color: #ffffff; margin: 0; padding: 24px; }
    .card { background-color: #16181d; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; }
    .header { background: #000000; padding: 24px; border-bottom: 2px solid #57ef67; }
    .header h2 { margin: 0; color: #57ef67; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0; color: #818181; font-size: 13px; }
    .body { padding: 24px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #818181; font-weight: 600; margin-bottom: 4px; }
    .value { font-size: 15px; color: #ffffff; font-weight: 500; }
    .message-box { background: #0b0d10; border-left: 3px solid #57ef67; padding: 16px; border-radius: 6px; margin-top: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #f0f0f0; }
    .footer { padding: 16px 24px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 12px; color: #818181; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Acecore Customer Inquiry</h2>
      <p>Submitted via Acecore Support Contact Form</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${fullName}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${email}" style="color: #57ef67; text-decoration: none;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${phone || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    </div>
    <div class="footer">
      Acecore Incorporations • Clean Energy Generation & Storage
    </div>
  </div>
</body>
</html>
`;

  // If SMTP is NOT configured, run in development preview mode
  if (!config.isConfigured) {
    console.log('\n📧 [SMTP PREVIEW MODE] Contact Form Submission Received');
    console.log('----------------------------------------------------');
    console.log(`From:    ${fullName} <${email}>`);
    console.log(`Phone:   ${phone || 'N/A'}`);
    console.log(`To:      ${config.toEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message:\n${message}`);
    console.log('----------------------------------------------------');
    console.log('ℹ️  To send real emails, add your SMTP credentials to backend/.env');
    console.log('----------------------------------------------------\n');

    return {
      success: true,
      messageId: `preview-${Date.now()}`,
      preview: true,
      message: 'Inquiry received successfully (development preview mode)',
    };
  }

  // 1. Try nodemailer if installed
  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Acecore Website" <${config.fromEmail}>`,
      to: config.toEmail,
      replyTo: email,
      subject,
      text: plainText,
      html,
    });

    console.log(`✅ [SMTP] Email sent via Nodemailer to ${config.toEmail}: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      preview: false,
    };
  } catch (nodemailerErr) {
    // If nodemailer is not installed or failed, fallback to native SMTP socket transport
    if (nodemailerErr.code === 'ERR_MODULE_NOT_FOUND') {
      console.log('[SMTP] Nodemailer not found, sending via native SMTP socket transport...');
      const result = await sendNativeSmtp({
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: config.user,
        pass: config.pass,
        from: config.fromEmail,
        to: config.toEmail,
        subject,
        text: plainText,
        html,
      });
      console.log(`✅ [SMTP] Email sent via native SMTP to ${config.toEmail}: ${result.messageId}`);
      return result;
    }
    throw nodemailerErr;
  }
}
