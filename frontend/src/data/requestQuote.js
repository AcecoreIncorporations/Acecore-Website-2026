import { pricingPlans } from './pricing.js';

export const requestQuoteCopy = {
  eyebrow: 'PRICING',
  title: 'Request a Powercell Quote',
  description:
    'Compare Powercell models and choose the system that fits your energy needs.',
  // disclaimer:
  //   '*Does not include VAT, delivery, installation, or other costs and fees. Final price will be provided by a Certified Installer.',
  // disclaimerLinkLabel: 'Learn more about Powercell',
  disclaimerLinkHref: '/product',
  previewCaption:
    'After you submit, an Acecore Certified Installer based in your area will reach out with pricing information and next steps.',
  previewLinkLabel: 'Acecore Certified Installer',
  previewLinkHref: '/support',
  formTitle: 'Get Started',
  installerNote:
    'Logistics and installation materials pricing may vary depending on your location and type of facility. An Acecore Certified Installer will contact you about next steps.',
  // updatesLabel: 'Get Acecore Updates',
  // updatesLinkLabel: 'Learn more about Acecore Updates',
  // updatesLinkHref: '/support',
  // legal:
  //   'By clicking "Get your quote", I authorise Acecore to share the contact information I provide with a local Certified Installer to contact me about this request.',
  submitLabel: 'Get your quote',
  continueLabel: 'Continue to checkout',
  successMessage:
    'Your quote is ready. Review it below, then continue to checkout.',
  videoSrc:
    'https://res.cloudinary.com/dznd7vzlb/video/upload/q_auto,f_auto/v1788784782/Website_Section_hh2bfc.mp4',
};

export const quoteStates = [
  ['rivers', 'Rivers State'],
  ['abia', 'Abia State'],
  ['adamawa', 'Adamawa State'],
  ['akwaIbom', 'Akwa Ibom State'],
  ['anambra', 'Anambra State'],
  ['bauchi', 'Bauchi State'],
  ['bayelsa', 'Bayelsa State'],
  ['benue', 'Benue State'],
  ['borno', 'Borno State'],
  ['crossRiver', 'Cross River State'],
  ['delta', 'Delta State'],
  ['ebonyi', 'Ebonyi State'],
  ['edo', 'Edo State'],
  ['ekiti', 'Ekiti State'],
  ['enugu', 'Enugu State'],
  ['gombe', 'Gombe State'],
  ['imo', 'Imo State'],
  ['jigawa', 'Jigawa State'],
  ['kaduna', 'Kaduna State'],
  ['kano', 'Kano State'],
  ['katsina', 'Katsina State'],
  ['kebbi', 'Kebbi State'],
  ['kogi', 'Kogi State'],
  ['kwara', 'Kwara State'],
  ['lagos', 'Lagos State'],
  ['nasarawa', 'Nasarawa State'],
  ['niger', 'Niger State'],
  ['ogun', 'Ogun State'],
  ['ondo', 'Ondo State'],
  ['osun', 'Osun State'],
  ['oyo', 'Oyo State'],
  ['plateau', 'Plateau State'],
  ['sokoto', 'Sokoto State'],
  ['taraba', 'Taraba State'],
  ['yobe', 'Yobe State'],
  ['zamfara', 'Zamfara State'],
  ['fct', 'Federal Capital Territory'],
];

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
  notesTitle: 'N/B',
  notes: [
    'Delivery to locations outside eastern states : 7 - 14 working days',
    'Delivery to locations within eastern states : 1 - 7 working days',
    'Manufacturer warranty of 3 years on all products.',
    'Warranty does not cover damages caused by lightning, poor earthing, or improper installation environments.',
    'A 50% down payment must be made before installation scheduling.',

  ],
  addOns: [
    {
      item: 'Installation Materials',
      description: 'Mounting accessories and cabling kit',
      price: '₦100,000',
      qty: '1',
      total: '₦100,000',
    },
    {
      item: 'Logistics',
      description: 'Item delivery to site',
      price: '₦200,000',
      qty: '1',
      total: '₦200,000',
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

const installationMaterialsPrices = {
  bungalow: '₦150,000',
  duplex: '₦200,000',
  storyBuilding: '₦250,000',
  warehouse: '₦180,000',
};

const logisticsPrices = {
  rivers: '₦80,000',
  imo: '₦150,000',
  abia: '₦150,000',
  anambra: '₦150,000',
  akwaIbom: '₦150,000',
  bayelsa: '₦150,000',
  delta: '₦150,000',
  enugu: '₦200,000',
  ebonyi: '₦200,000',
  adamawa: '₦300,000',
  bauchi: '₦300,000',
  benue: '₦300,000',
  borno: '₦300,000',
  gombe: '₦300,000',
  jigawa: '₦300,000',
  kaduna: '₦300,000',
  kano: '₦300,000',
  katsina: '₦300,000',
  kebbi: '₦300,000',
  kogi: '₦300,000',
  kwara: '₦300,000',
  nasarawa: '₦300,000',
  niger: '₦300,000',
  plateau: '₦300,000',
  sokoto: '₦300,000',
  taraba: '₦300,000',
  yobe: '₦300,000',
  zamfara: '₦300,000',
};

export function getQuoteReceiptAddOns(config, facilityType, state) {
  const materialsPrice =
    config === 'solar'
      ? installationMaterialsPrices[facilityType] || '₦100,000'
      : '₦100,000';
  const logisticsPrice = logisticsPrices[state] || '₦250,000';

  return quoteReceiptMeta.addOns.map((addOn) => {
    if (addOn.item === 'Installation Materials') {
      return { ...addOn, price: materialsPrice, total: materialsPrice };
    }
    if (addOn.item === 'Logistics') {
      return { ...addOn, price: logisticsPrice, total: logisticsPrice };
    }
    return addOn;
  });
}

export function getQuotePackages(plans = pricingPlans) {
  return plans.flatMap((plan) =>
    ['solar', 'powercell'].map((config) => {
      const includesSolar = config === 'solar';
      const price = plan.prices[config];
      const amount = Number(String(price).replace(/[^\d]/g, ''));

      return {
        id: `${plan.id}-${includesSolar ? 'solar' : 'no-panel'}`,
        model: plan.id,
        config,
        title: plan.name,
        price,
        amount,
        description: includesSolar ? 'Solar Included' : 'Powercell Only',
      };
    }),
  );
}

export const quotePackages = getQuotePackages();

/** Map pricing / comparison model ids → default quote package id */
export function resolveQuotePackageId(model, config) {
  const normalized = String(model || '')
    .toLowerCase()
    .replace('primeplus', 'prime-plus')
    .replace('price', 'prime');
  const normalizedConfig = config === 'solar' ? 'solar' : 'powercell';
  const selected = quotePackages.find(
    (item) => item.model === normalized && item.config === normalizedConfig,
  );

  const fallback = quotePackages.find(
    (item) => item.model === pricingPlans[0]?.id && item.config === normalizedConfig,
  );
  return selected?.id || fallback?.id || quotePackages[0].id;
}

export function comparisonProductToModel(productId) {
  if (productId === 'primePlus') return 'prime-plus';
  if (productId === 'ultra') return 'ultra';
  if (productId === 'prime' || productId === 'price') return 'prime';
  return productId;
}
