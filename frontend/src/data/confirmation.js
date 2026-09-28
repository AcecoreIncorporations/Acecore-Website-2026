import { formatNaira } from '../lib/formatNaira';
import { isCheckoutReady } from '../lib/quoteSession';

export const confirmationCopy = {
  title: 'Order confirmed',
  support:
    'Your Powercell order has been received. We’ll keep you updated as it moves through fulfillment.',
  orderLabel: 'ORDER',
  statusEyebrow: 'Current status',
  nextTitle: 'What happens next',
  detailsTitle: 'Order details',
  deliveringTo: 'Delivering to',
  trackOrder: 'Track order',
  trackPending: 'Tracking becomes available once your order ships.',
  emptyTitle: 'No confirmed order found.',
  emptyDescription: 'Place an order from checkout to see confirmation details.',
  emptyCheckout: 'Return to Checkout',
  emptyPricing: 'Return to Pricing',
  priceUnavailable: '₦ —',
};

export const orderStatuses = {
  received: {
    id: 'received',
    label: 'Order received',
    description: 'We’re preparing your order.',
    progress: 0.78,
    activeStep: 1,
  },
  preparing: {
    id: 'preparing',
    label: 'Preparing your Powercell',
    description: 'Your unit is being prepared and checked before dispatch.',
    progress: 0.5,
    activeStep: 2,
  },
  shipped: {
    id: 'shipped',
    label: 'On the way',
    description: 'Tracking details will be shared as your order ships.',
    progress: 0.82,
    activeStep: 3,
  },
  delivered: {
    id: 'delivered',
    label: 'Delivered',
    description: 'Your Powercell has been delivered.',
    progress: 1,
    activeStep: 3,
  },
};

export const confirmationTimeline = [
  {
    id: 'received',
    number: '01',
    title: 'Order received',
    description: 'Your order and payment have been confirmed.',
  },
  {
    id: 'preparing',
    number: '02',
    title: 'Preparing your Powercell',
    description: 'Your unit will be prepared and checked before dispatch.',
  },
  {
    id: 'delivery',
    number: '03',
    title: 'Delivery',
    description: 'Tracking details will be shared once your order ships.',
  },
];

function createOrderId() {
  return `AC-${String(Math.floor(10000 + Math.random() * 90000))}`;
}

function configurationSummary(view) {
  const solar = String(view.configurationLabel || '').toLowerCase().includes('solar');
  return `${view.quantityValue} · ${solar ? 'Solar included configuration' : 'Home backup configuration'}`;
}

export function createConfirmedOrder({ view, email, orderNote, session }) {
  return {
    orderId: createOrderId(),
    createdAt: new Date().toISOString(),
    status: 'received',
    email: email || view.email || '',
    orderNote: orderNote || '',
    product: {
      id: view.modelId,
      packageId: view.packageId,
      name: view.productName,
      quantity: view.quantity,
      quantityValue: view.quantityValue,
      configuration: view.configurationLabel,
      configurationSummary: configurationSummary(view),
      amount: Number.isFinite(view.amount) ? view.amount : null,
    },
    delivery: {
      address: view.address,
      shippingMethod: 'Standard delivery',
      customerName: view.customerName,
    },
    quotationNumber: session?.quotationNumber || null,
  };
}

export function getOrderStatus(order) {
  return orderStatuses[order?.status] || orderStatuses.received;
}

export function formatOrderDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatOrderPrice(amount) {
  if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    return confirmationCopy.priceUnavailable;
  }
  return formatNaira(amount);
}

export function confirmationEmptyAction() {
  return isCheckoutReady()
    ? { to: '/checkout', label: confirmationCopy.emptyCheckout }
    : { to: '/pricing', label: confirmationCopy.emptyPricing };
}
