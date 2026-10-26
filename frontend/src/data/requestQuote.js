export const requestQuoteCopy = {
  eyebrow: 'PRICING',
  title: 'Request a Powercell Quote',
  description:
    'Compare Powercell models and choose the system that fits your energy needs.',
  disclaimer:
    '*Does not include VAT, delivery, installation, or other costs and fees. Final price will be provided by a Certified Installer.',
  disclaimerLinkLabel: 'Learn more about Powercell without Solar Panel',
  disclaimerLinkHref: '/product',
  previewCaption:
    'After you submit, an Acecore Certified Installer based in your area will reach out with pricing information and next steps.',
  previewLinkLabel: 'Acecore Certified Installer',
  previewLinkHref: '/support',
  formTitle: 'Get Started',
  installerNote:
    'An Acecore Certified Installer will contact you about next steps and pricing.',
  updatesLabel: 'Get Acecore Updates',
  updatesLinkLabel: 'Learn more about Acecore Updates',
  updatesLinkHref: '/support',
  legal:
    'By clicking "Get your quote", I authorise Acecore to share the contact information I provide with a local Certified Installer to contact me about this request.',
  submitLabel: 'Get your quote',
  continueLabel: 'Continue to checkout',
  successMessage:
    'Your quote is ready. Review it below, then continue to checkout.',
  videoSrc:
    'https://res.cloudinary.com/dznd7vzlb/video/upload/q_auto,f_auto/v1788784782/Website_Section_hh2bfc.mp4',
};

export const quoteReceiptMeta = {
  companyName: 'ACECORE INCORPORATIONS',
  companyAddress:
    '36C SEASIDE ROAD OYIGBO, PORT HARCOURT, RIVERS STATE, NIGERIA.',
  rcNumber: 'RC NO: 1901016',
  website: 'WWW.ACECORE.TECH',
  phone: '+234 814 507 0171',
  thankYou: 'Thank you for choosing us',
  paymentTitle: 'Payment Details',
  bank: 'Sterling Bank',
  accountNumber: '0137456418',
  accountName: 'ACECORE Limited.',
  discountNote: 'There was a 10% Discount on the All-in-One system.',
  notesTitle: 'N/B',
  notes: [
    'Manufacturer warranty of 3 years on all products.',
    'Warranty does not cover damages caused by lightning, poor earthing, or improper installation environments.',
    'A 40% down payment must be made before installation scheduling.',
  ],
  addOns: [
    {
      item: 'Installation Kits',
      description: 'Mounting accessories and cabling kit',
      price: '₦100*',
      qty: '1',
      total: '₦100*',
    },
    {
      item: 'Logistics',
      description: 'Item delivery to site',
      price: '₦200*',
      qty: '1',
      total: '₦200*',
    },
    {
      item: 'Installation Commission',
      description: 'Certified installer labour',
      price: 'FREE',
      qty: '1',
      total: 'FREE',
    },
  ],
};

export const quotePackages = [
  {
    id: 'prime-no-panel',
    model: 'prime',
    title: '1 Powercell Prime Without Panel',
    price: '₦5,000*',
    description: 'Requires a solar panel not included in price',
  },
  {
    id: 'prime-solar',
    model: 'prime',
    title: '1 Powercell Prime With Solar Panel',
    price: '₦5,975*',
    description: '',
  },
  {
    id: 'prime-plus-no-panel',
    model: 'prime-plus',
    title: '1 Powercell Without Solar Panel +1 Extra Smart socket',
    price: '₦9,000*',
    description: '',
  },
  {
    id: 'prime-plus-solar',
    model: 'prime-plus',
    title: '1 Powercell Prime With Solar Panel +1 Extra Smart socket',
    price: '₦9,975*',
    description: '',
  },
];

/** Map pricing / comparison model ids → default quote package id */
export function resolveQuotePackageId(model, config) {
  const normalized = (model || '').toLowerCase();

  if (normalized === 'ultra' || normalized === 'prime-plus' || normalized === 'primeplus') {
    return config === 'solar' ? 'prime-plus-solar' : 'prime-plus-no-panel';
  }

  if (normalized === 'prime' || normalized === 'price') {
    return config === 'solar' ? 'prime-solar' : 'prime-no-panel';
  }

  return quotePackages[0].id;
}

export function comparisonProductToModel(productId) {
  if (productId === 'primePlus') return 'prime-plus';
  if (productId === 'ultra') return 'ultra';
  if (productId === 'price') return 'prime';
  return productId;
}
