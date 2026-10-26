export const pricingModes = [
  { id: 'solar', label: 'Solar Included' },
  { id: 'powercell', label: 'Powercell Only' },
];

export const pricingCopy = {
  eyebrow: 'PRICING',
  title: 'Choose the Right Powercell for You.',
  description:
    'Compare Powercell models and choose the system that fits your energy needs.',
  cta: 'Get Your Powercell',
  instalmentLabel: 'Installation payment',
};

export const pricingPlans = [
  {
    id: 'prime',
    name: 'POWERCELL PRIME',
    amount: 2_500_000,
    prices: {
      solar: '₦2,500,000',
      powercell: '₦2,500,000',
    },
    specs: ['3.5kVA Output', '5kWh Capacity'],
    instalments: [
      { label: '3 Months (+7% interest)', amount: '₦891,700' },
      { label: '4 Months (+10% interest)', amount: '₦687,500' },
      { label: '5 Months (+13% interest)', amount: '₦565,000' },
    ],
  },
  {
    id: 'prime-plus',
    name: 'POWERCELL PRIME+',
    amount: 4_300_000,
    prices: {
      solar: '₦4,300,000',
      powercell: '₦4,300,000',
    },
    specs: ['5kVA Output', '10kWh Capacity'],
    instalments: [
      { label: '3 Months (+7% interest)', amount: '₦1,533,700' },
      { label: '4 Months (+10% interest)', amount: '₦1,182,500' },
      { label: '5 Months (+13% interest)', amount: '₦971,800' },
    ],
  },
  {
    id: 'ultra',
    name: 'POWERCELL ULTRA',
    amount: 7_500_000,
    prices: {
      solar: '₦7,500,000',
      powercell: '₦7,500,000',
    },
    specs: ['10kVA Output', '15kWh Capacity'],
    instalments: [
      { label: '3 Months (+7% interest)', amount: '₦2,675,000' },
      { label: '4 Months (+10% interest)', amount: '₦2,062,500' },
      { label: '5 Months (+13% interest)', amount: '₦1,695,000' },
    ],
  },
];
