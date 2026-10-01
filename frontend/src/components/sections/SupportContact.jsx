import { useState } from 'react';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import {
  supportChannels,
  supportFormFields,
  supportHeroCopy,
} from '../../data/support';
import { submitContactForm } from '../../services/contactApi';

const emptyForm = supportFormFields.reduce((acc, field) => {
  acc[field.name] = '';
  return acc;
}, {});

function ChannelCard({ label, value, href, external }) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a className="support-channel" href={href} {...linkProps}>
      <div className="support-channel__copy">
        <span className="support-channel__label">{label}</span>
        <span className="support-channel__value">{value}</span>
      </div>
      <span className="support-channel__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SupportContact() {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    // Client-side validation
    if (!form.fullName || form.fullName.trim().length < 2) {
      setStatus({
        type: 'error',
        message: 'Please enter your full name (at least 2 characters).',
      });
      return;
    }

    if (!form.email || !EMAIL_REGEX.test(form.email.trim())) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (!form.message || form.message.trim().length < 5) {
      setStatus({
        type: 'error',
        message: 'Please enter your message (at least 5 characters).',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitContactForm(form);
      if (response.success) {
        setStatus({
          type: 'success',
          message: response.message || 'Thank you! Your message has been sent successfully.',
        });
        setForm(emptyForm);
      } else {
        setStatus({
          type: 'error',
          message: response.error || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'A network error occurred. Please contact us directly at support@acecore.tech.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="support-contact" aria-labelledby="support-contact-title">
      <div className="support-contact__inner home-shell">
        <Reveal className="support-contact__intro">
          <p className="support-contact__eyebrow">{supportHeroCopy.eyebrow}</p>
          <h1 id="support-contact-title" className="support-contact__title">
            {supportHeroCopy.title}
          </h1>
          <p className="support-contact__description">{supportHeroCopy.description}</p>
        </Reveal>

        <div className="support-contact__layout">
          <Reveal className="support-contact__channels" y={20} delay={0.12}>
            {supportChannels.map((channel) => (
              <ChannelCard key={channel.id} {...channel} />
            ))}
          </Reveal>

          <Reveal className="support-contact__form-wrap" y={24} delay={0.18}>
            <form className="support-form" onSubmit={handleSubmit} noValidate>
              {status && (
                <div
                  className={`support-form__status support-form__status--${status.type}`}
                  role={status.type === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                >
                  <span className="support-form__status-icon" aria-hidden="true">
                    {status.type === 'success' ? '✓' : '⚠️'}
                  </span>
                  <span className="support-form__status-text">{status.message}</span>
                </div>
              )}

              {supportFormFields.map((field) => {
                const sharedProps = {
                  id: field.id,
                  name: field.name,
                  value: form[field.name],
                  onChange: handleChange,
                  autoComplete: field.autoComplete,
                  disabled: isSubmitting,
                  className: 'support-form__control',
                };

                const fieldClass =
                  field.type === 'textarea'
                    ? 'support-form__field support-form__field--message'
                    : 'support-form__field';

                return (
                  <label key={field.id} className={fieldClass} htmlFor={field.id}>
                    <span className="support-form__label">{field.label}</span>
                    {field.type === 'textarea' ? (
                      <textarea {...sharedProps} rows={6} />
                    ) : (
                      <input {...sharedProps} type={field.type} />
                    )}
                  </label>
                );
              })}

              <div className="support-form__actions">
                <Button
                  type="submit"
                  variant="brand"
                  className="support-form__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending message...' : 'Send message'}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
