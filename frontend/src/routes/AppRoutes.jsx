import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ProductPage from '../pages/Product/ProductPage';
import PricingPage from '../pages/Pricing/PricingPage';
import AboutPage from '../pages/About/AboutPage';
import SupportPage from '../pages/Support/SupportPage';
import RequestQuotePage from '../pages/RequestQuote/RequestQuotePage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import OrderConfirmationPage from '../pages/Confirmation/OrderConfirmationPage';
import MeetTeamPage from '../pages/MeetTeam/MeetTeamPage';
import TermsPage from '../pages/Terms/TermsPage';
import PageLayout from '../components/layout/PageLayout';
import Container from '../components/ui/Container';
import SEO from '../components/common/SEO';
import { seoPages } from '../data/seoData';

function NotFoundPage() {
  return (
    <PageLayout>
      <SEO {...seoPages.notFound} />
      <section className="page-hero">
        <Container>
          <h1>Page not found</h1>
          <p className="text-muted">The page you requested does not exist.</p>
        </Container>
      </section>
    </PageLayout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/team" element={<MeetTeamPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/request-quote" element={<RequestQuotePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="/confirmation" element={<Navigate to="/order-confirmation" replace />} />
      <Route path="/contact" element={<Navigate to="/support" replace />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
