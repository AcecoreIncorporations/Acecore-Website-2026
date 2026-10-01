/**
 * Contact API Service
 * Handles submitting user contact inquiries to the Acecore backend
 */

const API_BASE = '/api';

export async function submitContactForm({ fullName, email, phone, message }) {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        message,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error:
          data.error ||
          `Submission failed (${response.status}). Please try again or email us directly at support@acecore.tech.`,
      };
    }

    return {
      success: true,
      message: data.message || 'Thank you! Your message has been sent to our team.',
      preview: Boolean(data.preview),
    };
  } catch (networkError) {
    console.warn('[contactApi] Network error contacting backend:', networkError);
    return {
      success: false,
      error:
        'Unable to connect to the mail server. Please try again later or reach us directly at support@acecore.tech or on WhatsApp.',
    };
  }
}
