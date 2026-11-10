import { confirmationCopy } from '../../data/confirmation';
import { whatsappSupportChannel } from '../../data/support';

export default function SalesContact() {
  const linkProps = whatsappSupportChannel.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <section className="confirmation-card confirmation-sales" aria-labelledby="confirmation-sales-title">
      <h2 id="confirmation-sales-title" className="confirmation-card__title">
        {confirmationCopy.salesContactTitle}
      </h2>
      <a className="support-channel confirmation-sales__link" href={whatsappSupportChannel.href} {...linkProps}>
        <div className="support-channel__copy">
          <span className="support-channel__value">{whatsappSupportChannel.value}</span>
        </div>
        <span className="support-channel__arrow" aria-hidden="true">
          ↗
        </span>
      </a>
    </section>
  );
}
