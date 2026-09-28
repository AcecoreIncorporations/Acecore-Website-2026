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

const sharedInstalments = [
  { label: '3 Months (+7% interest)', amount: '₦636,700' },
  { label: '4 Months (+10% interest)', amount: '₦477,500' },
  { label: '5 Months (+13% interest)', amount: '₦382,000' },
];

export const pricingPlans = [
  {
    id: 'prime',
    name: 'POWERCELL PRIME',
    amount: 4_400_000,
    prices: {
      solar: '₦4,000,000',
      powercell: '₦3,000,000',
    },
    specs: ['3.5kW Output', '5kWh Capacity'],
    instalments: sharedInstalments,
  },
  {
    id: 'prime-plus',
    name: 'POWERCELL PRIME+',
    amount: 8_900_000,
    prices: {
      solar: '₦7,500,000',
      powercell: '₦5,500,000',
    },
    specs: ['3.5kW Output', '5kWh Capacity'],
    instalments: sharedInstalments,
  },
  {
    id: 'ultra',
    name: 'POWERCELL ULTRA',
    amount: 15_500_000,
    prices: {
      solar: '₦12,000,000',
      powercell: '₦10,000,000',
    },
    specs: ['3.5kW Output', '5kWh Capacity'],
    instalments: sharedInstalments,
  },
];
