import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Container from '../components/ui/Container';
import SEO from '../components/common/SEO';
import { seoPages } from '../data/seoData';

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const ProductPage = lazy(() => import('../pages/Product/ProductPage'));
const PricingPage = lazy(() => import('../pages/Pricing/PricingPage'));
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const SupportPage = lazy(() => import('../pages/Support/SupportPage'));
const RequestQuotePage = lazy(() => import('../pages/RequestQuote/RequestQuotePage'));
const CheckoutPage = lazy(() => import('../pages/Checkout/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('../pages/Confirmation/OrderConfirmationPage'));
const MeetTeamPage = lazy(() => import('../pages/MeetTeam/MeetTeamPage'));
const TermsPage = lazy(() => import('../pages/Terms/TermsPage'));

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
    <Suspense fallback={null}>
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
    </Suspense>
  );
}
