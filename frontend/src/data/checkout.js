import powercellImage from '../assets/images/product/powercell2.png';
import { formatNaira } from '../lib/formatNaira';
import { pricingPlans } from './pricing';
import { quotePackages } from './requestQuote';

export const checkoutCopy = {
  summaryTitle: 'Order summary',
  summarySupport: 'Configuration carried over from your quote.',
  completeTitle: 'Complete your order',
  completeSupport: 'No need to re-enter the information from your quote.',
  productSubtitle: 'Portable modular energy storage',
  quantityLabel: 'Quantity',
  configurationLabel: 'Configuration',
  editConfiguration: 'Edit configuration',
  deliveryTitle: 'Delivery details',
  editContact: 'Edit',
  changeDelivery: 'Change',
  shippingPrefix: 'Shipping method · Standard delivery',
  paymentSummaryTitle: 'Payment summary',
  deliveryStatus: 'Calculated at fulfillment',
  taxStatus: 'Calculated at checkout',
  totalLabel: 'Total',
  paymentMethodLabel: 'Payment method',
  paymentMethodTitle: 'Card / bank transfer',
  paymentMethodSupport: 'Secure payment',
  emailLabel: 'Email for receipt',
  orderNoteLabel: 'Order note',
  orderNotePlaceholder: 'Optional delivery note',
  placeOrder: 'Place Order',
  policyBefore: 'By placing this order, you agree to Acecore’s ',
  policyLink: 'terms and purchase policy',
  policyHref: '/about',
  policyAfter: '.',
  backToQuote: 'Back to quote',
  emptyTitle: 'No Powercell configuration found.',
  emptyDescription: 'Configure a Powercell to continue to checkout.',
  emptyPricing: 'Back to Pricing',
  emptyConfigure: 'Configure your Powercell',
  pendingMessage: 'Checkout UI complete. Payment processing is not connected yet.',
};

export const checkoutSteps = [
  { id: 'configuration', number: 1, label: 'Configuration', state: 'complete' },
  { id: 'payment', number: 2, label: 'Payment', state: 'current' },
  { id: 'review', number: 3, label: 'Review', state: 'upcoming' },
];

export const checkoutPaymentMethod = {
  id: 'card-bank-transfer',
  title: checkoutCopy.paymentMethodTitle,
  subtitle: checkoutCopy.paymentMethodSupport,
};

function displayProductName(planName) {
  return String(planName || '')
    .replace(/^POWERCELL\s+/i, 'Powercell ')
    .replace(/\bPRIME\+/i, 'Prime+')
    .replace(/\bPRIME\b/i, 'Prime')
    .replace(/\bULTRA\b/i, 'Ultra');
}

export function formatCheckoutPhone(phone) {
  const raw = String(phone || '').trim();
  if (!raw) return '';

  const digits = raw.replace(/\D/g, '');
  let local = digits;
  if (local.startsWith('234')) local = local.slice(3);
  if (local.startsWith('0')) local = local.slice(1);

  if (local.length === 10) {
    return `+234 (0) ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }

  if (local.length === 11 && local.startsWith('0') === false) {
    return `+234 ${local}`;
  }

  return raw.startsWith('+') ? raw : `+234 ${raw}`;
}

export function buildCheckoutView(session) {
  const packageItem =
    quotePackages.find((item) => item.id === session?.packageId) || quotePackages[0];
  const plan =
    pricingPlans.find((item) => item.id === packageItem.model) || pricingPlans[0];
  const form = session?.form || {};
  const includesSolar = packageItem.id.includes('solar');
  const amount = Number(plan.amount) || 0;

  return {
    packageId: packageItem.id,
    modelId: plan.id,
    productName: displayProductName(plan.name),
    subtitle: checkoutCopy.productSubtitle,
    image: powercellImage,
    quantity: 1,
    quantityValue: '1 unit',
    configurationLabel: includesSolar
      ? 'Solar included • Home backup'
      : 'Standard • Home backup',
    amount,
    formattedAmount: formatNaira(amount),
    formattedTotal: formatNaira(amount),
    customerName: `${form.firstName || ''} ${form.lastName || ''}`.trim(),
    phone: formatCheckoutPhone(form.phone),
    email: String(form.email || '').trim(),
    address: String(form.installationAddress || '').trim(),
    editConfigHref: '/request-quote#quote-configuration',
    editContactHref: '/request-quote#rq-first-name',
    changeDeliveryHref: '/request-quote#rq-address',
    quoteHref: '/request-quote',
  };
}
