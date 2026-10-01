<?php
/**
 * Acecore Contact Form Submission API (cPanel / PHP Native)
 * Endpoint: /api/contact or /api/contact.php
 */

require_once __DIR__ . '/config.php';

handle_cors_preflight();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json_response(405, [
        'success' => false,
        'error' => 'Method not allowed. Use POST.'
    ]);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    send_json_response(400, [
        'success' => false,
        'error' => 'Invalid JSON payload.'
    ]);
}

$fullName = isset($input['fullName']) ? trim($input['fullName']) : '';
$email    = isset($input['email']) ? trim($input['email']) : '';
$phone    = isset($input['phone']) ? trim($input['phone']) : '';
$message  = isset($input['message']) ? trim($input['message']) : '';

// 1. Validation & Injection Defense
if (strlen($fullName) < 2) {
    send_json_response(400, [
        'success' => false,
        'error' => 'Please enter your full name (at least 2 characters).'
    ]);
}

if (preg_match('/[\r\n]/', $fullName)) {
    send_json_response(400, [
        'success' => false,
        'error' => 'Full name contains invalid characters.'
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json_response(400, [
        'success' => false,
        'error' => 'Please enter a valid email address.'
    ]);
}

if (preg_match('/[\r\n]/', $email)) {
    send_json_response(400, [
        'success' => false,
        'error' => 'Email contains invalid characters.'
    ]);
}

if (strlen($message) < 5) {
    send_json_response(400, [
        'success' => false,
        'error' => 'Please enter a message (at least 5 characters).'
    ]);
}

// 2. Email Formatting
$subject = "New Contact Inquiry from {$fullName} - Acecore Support";
$dateStr = date('Y-m-d H:i:s');

$plainText = <<<TXT
ACECORE CONTACT INQUIRY
=====================================
Full Name:  {$fullName}
Email:      {$email}
Phone:      {$phone}
Date:       {$dateStr}
-------------------------------------
Message:
{$message}
=====================================
TXT;

$safeFullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
$safeEmail    = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone    = htmlspecialchars($phone ?: 'Not provided', ENT_QUOTES, 'UTF-8');
$safeMessage  = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$htmlBody = <<<HTML
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
    .message-box { background: #0b0d10; border-left: 3px solid #57ef67; padding: 16px; border-radius: 6px; margin-top: 16px; font-size: 14px; line-height: 1.6; color: #f0f0f0; }
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
        <div class="value">{$safeFullName}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:{$safeEmail}" style="color: #57ef67; text-decoration: none;">{$safeEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">{$safePhone}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">{$safeMessage}</div>
      </div>
    </div>
    <div class="footer">
      Acecore Incorporations • Clean Energy Generation & Storage
    </div>
  </div>
</body>
</html>
HTML;

/**
 * Socket-based SMTP mail delivery function
 */
function send_php_smtp($host, $port, $secure, $user, $pass, $from, $to, $replyTo, $subject, $text, $html) {
    $timeout = 15;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $remote = ($secure && $port === 465) ? "ssl://{$host}" : "tcp://{$host}";
    $socket = @stream_socket_client("{$remote}:{$port}", $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        throw new Exception("Connection to SMTP failed: {$errstr} ({$errno})");
    }

    $read = function() use ($socket) {
        $data = '';
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === ' ') break;
        }
        return $data;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        $res = $read();
        $code = (int)substr($res, 0, 3);
        if ($code >= 400) {
            throw new Exception("SMTP error [{$code}]: {$res}");
        }
        return $res;
    };

    $read();
    $send("EHLO " . (gethostname() ?: 'acecore.tech'));

    if (!$secure && $port === 587) {
        $send("STARTTLS");
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $send("EHLO " . (gethostname() ?: 'acecore.tech'));
    }

    if ($user && $pass) {
        $send("AUTH LOGIN");
        $send(base64_encode($user));
        $send(base64_encode($pass));
    }

    $send("MAIL FROM:<{$from}>");
    $send("RCPT TO:<{$to}>");
    $send("DATA");

    $boundary = "----=_Part_" . time() . "_" . bin2hex(random_bytes(4));
    $headers = [
        "From: Acecore Support <{$from}>",
        "To: <{$to}>",
        "Reply-To: <{$replyTo}>",
        "Subject: {$subject}",
        "MIME-Version: 1.0",
        "Content-Type: multipart/alternative; boundary=\"{$boundary}\""
    ];

    $mime = implode("\r\n", $headers) . "\r\n\r\n";
    $mime .= "--{$boundary}\r\n";
    $mime .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $mime .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $mime .= $text . "\r\n\r\n";
    $mime .= "--{$boundary}\r\n";
    $mime .= "Content-Type: text/html; charset=UTF-8\r\n";
    $mime .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $mime .= $html . "\r\n\r\n";
    $mime .= "--{$boundary}--\r\n";
    $mime .= ".";

    $send($mime);
    $send("QUIT");
    fclose($socket);
    return true;
}

// 3. Dispatch Logic
$isSmtpConfigured = defined('SMTP_HOST') && SMTP_HOST !== '' && defined('SMTP_USER') && SMTP_USER !== '';

if ($isSmtpConfigured) {
    try {
        send_php_smtp(
            SMTP_HOST,
            SMTP_PORT,
            SMTP_SECURE,
            SMTP_USER,
            SMTP_PASS,
            CONTACT_FROM_EMAIL,
            CONTACT_TO_EMAIL,
            $email,
            $subject,
            $plainText,
            $htmlBody
        );

        send_json_response(200, [
            'success' => true,
            'message' => 'Thank you! Your message has been sent to our team.'
        ]);
    } catch (Exception $e) {
        error_log('[Acecore Contact API] SMTP Error: ' . $e->getMessage());
        // Attempt fallback to PHP mail()
        $headers = "From: " . CONTACT_FROM_EMAIL . "\r\n" .
                   "Reply-To: " . $email . "\r\n" .
                   "Content-Type: text/html; charset=UTF-8\r\n";
        if (@mail(CONTACT_TO_EMAIL, $subject, $htmlBody, $headers)) {
            send_json_response(200, [
                'success' => true,
                'message' => 'Thank you! Your message has been sent to our team.'
            ]);
        }

        send_json_response(500, [
            'success' => false,
            'error' => 'Email delivery failed. Please contact us directly at support@acecore.tech.'
        ]);
    }
} else {
    // If SMTP credentials not yet provided, operate in Development Preview Mode
    // Log inquiry to local file for verification without failing
    $logEntry = date('Y-m-d H:i:s') . " | {$fullName} <{$email}> | Phone: {$phone} | Message: " . str_replace("\n", " ", $message) . "\n";
    @file_put_contents(__DIR__ . '/inquiries.log', $logEntry, FILE_APPEND);

    send_json_response(200, [
        'success' => true,
        'message' => 'Thank you! Your message has been received (Development Preview Mode).',
        'preview' => true
    ]);
}
