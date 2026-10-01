import PageLayout from '../../components/layout/PageLayout';
import SEO from '../../components/common/SEO';
import { seoPages } from '../../data/seoData';
import RequestQuoteSection from '../../components/sections/RequestQuoteSection';

export default function RequestQuotePage() {
  return (
    <PageLayout>
      <SEO {...seoPages.requestQuote} />
      <RequestQuoteSection />
    </PageLayout>
  );
}
