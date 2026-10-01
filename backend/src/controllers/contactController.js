import { sendContactEmail } from '../services/emailService.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function handleContactSubmission(body) {
  const { fullName, email, phone, message } = body || {};

  // 1. Validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return {
      status: 400,
      body: { success: false, error: 'Please enter your full name (at least 2 characters).' },
    };
  }

  // Header injection defense: disallow newlines in name and email
  if (/[\r\n]/.test(fullName)) {
    return {
      status: 400,
      body: { success: false, error: 'Full name contains invalid characters.' },
    };
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return {
      status: 400,
      body: { success: false, error: 'Please enter a valid email address.' },
    };
  }

  if (/[\r\n]/.test(email)) {
    return {
      status: 400,
      body: { success: false, error: 'Email contains invalid characters.' },
    };
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return {
      status: 400,
      body: { success: false, error: 'Please enter a message (at least 5 characters).' },
    };
  }

  // 2. Dispatch Email
  const cleanData = {
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? String(phone).trim() : '',
    message: message.trim(),
  };

  try {
    const result = await sendContactEmail(cleanData);
    return {
      status: 200,
      body: {
        success: true,
        message: 'Thank you! Your message has been sent to the Acecore team.',
        preview: Boolean(result.preview),
      },
    };
  } catch (err) {
    console.error('[contactController] Failed to send email:', err);
    return {
      status: 500,
      body: {
        success: false,
        error:
          'Could not send message through the email service. Please try again or email us directly at support@acecore.tech.',
      },
    };
  }
}
