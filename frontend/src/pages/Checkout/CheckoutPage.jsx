import PageLayout from '../../components/layout/PageLayout';
import SEO from '../../components/common/SEO';
import { seoPages } from '../../data/seoData';
import CheckoutEmptyState from '../../components/checkout/CheckoutEmptyState';
import CheckoutLayout from '../../components/checkout/CheckoutLayout';
import { getQuoteSession, isCheckoutReady } from '../../lib/quoteSession';

export default function CheckoutPage() {
  const session = getQuoteSession();

  return (
    <PageLayout>
      <SEO {...seoPages.checkout} />
      {isCheckoutReady(session) ? (
        <CheckoutLayout session={session} />
      ) : (
        <CheckoutEmptyState />
      )}
    </PageLayout>
  );
}
