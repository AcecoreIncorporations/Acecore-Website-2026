import ConfirmationSummary from './ConfirmationSummary';
import SalesContact from './SalesContact';

export default function ConfirmationLayout({ order }) {
  return (
    <section className="confirmation" aria-label="Order confirmation">
      <div className="confirmation__shell">
        <ConfirmationSummary order={order} />
        <SalesContact />
      </div>
    </section>
  );
}
