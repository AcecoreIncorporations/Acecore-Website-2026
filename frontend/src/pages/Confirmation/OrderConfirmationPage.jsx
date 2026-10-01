import PageLayout from '../../components/layout/PageLayout';
import SEO from '../../components/common/SEO';
import { seoPages } from '../../data/seoData';
import ConfirmationEmptyState from '../../components/confirmation/ConfirmationEmptyState';
import ConfirmationLayout from '../../components/confirmation/ConfirmationLayout';
import { getQuoteSession, isOrderConfirmed } from '../../lib/quoteSession';

export default function OrderConfirmationPage() {
  const session = getQuoteSession();

  return (
    <PageLayout>
      <SEO {...seoPages.orderConfirmation} />
      {isOrderConfirmed(session) ? (
        <ConfirmationLayout order={session.order} />
      ) : (
        <ConfirmationEmptyState />
      )}
    </PageLayout>
  );
}
