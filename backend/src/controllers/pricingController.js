import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.resolve(__dirname, '../../data/pricing.json');

const DEFAULT_PRICING = {
  modes: [
    { id: 'solar', label: 'Solar Included' },
    { id: 'powercell', label: 'Powercell Only' },
  ],
  copy: {
    eyebrow: 'PRICING',
    title: 'Choose the Right Powercell for You.',
    description: 'Compare Powercell models and choose the system that fits your energy needs.',
    cta: 'Get Your Powercell',
    instalmentLabel: 'Installation payment',
  },
  plans: [
    {
      id: 'prime',
      name: 'POWERCELL PRIME',
      amount: 4400000,
      prices: {
        solar: '₦4,000,000',
        powercell: '₦3,000,000',
      },
      specs: ['3.5kW Output', '5kWh Capacity'],
      instalments: [
        { label: '3 Months (+7% interest)', amount: '₦636,700' },
        { label: '4 Months (+10% interest)', amount: '₦477,500' },
        { label: '5 Months (+13% interest)', amount: '₦382,000' },
      ],
    },
    {
      id: 'prime-plus',
      name: 'POWERCELL PRIME+',
      amount: 8900000,
      prices: {
        solar: '₦7,500,000',
        powercell: '₦5,500,000',
      },
      specs: ['3.5kW Output', '5kWh Capacity'],
      instalments: [
        { label: '3 Months (+7% interest)', amount: '₦636,700' },
        { label: '4 Months (+10% interest)', amount: '₦477,500' },
        { label: '5 Months (+13% interest)', amount: '₦382,000' },
      ],
    },
    {
      id: 'ultra',
      name: 'POWERCELL ULTRA',
      amount: 15500000,
      prices: {
        solar: '₦12,000,000',
        powercell: '₦10,000,000',
      },
      specs: ['3.5kW Output', '5kWh Capacity'],
      instalments: [
        { label: '3 Months (+7% interest)', amount: '₦636,700' },
        { label: '4 Months (+10% interest)', amount: '₦477,500' },
        { label: '5 Months (+13% interest)', amount: '₦382,000' },
      ],
    },
  ],
  updatedAt: new Date().toISOString(),
};

export function readPricingData() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[PricingController] Error reading pricing data, using defaults:', err.message);
  }
  return DEFAULT_PRICING;
}

export function writePricingData(data) {
  const payload = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(payload, null, 2), 'utf8');
  return payload;
}

export function getAllPricing() {
  return readPricingData();
}

export function getPlanById(planId) {
  const data = readPricingData();
  return data.plans.find((p) => p.id === planId) || null;
}

export function updatePricing(updatedFields) {
  const current = readPricingData();
  const merged = {
    ...current,
    ...updatedFields,
    // Preserve core sub-objects if not explicitly provided
    copy: { ...current.copy, ...(updatedFields.copy || {}) },
    modes: updatedFields.modes || current.modes,
    plans: updatedFields.plans || current.plans,
  };
  return writePricingData(merged);
}

export function updatePlanPrice(planId, priceUpdates) {
  const current = readPricingData();
  const index = current.plans.findIndex((p) => p.id === planId);
  if (index === -1) {
    throw new Error(`Plan not found: ${planId}`);
  }

  const updatedPlans = [...current.plans];
  updatedPlans[index] = {
    ...updatedPlans[index],
    ...priceUpdates,
    prices: {
      ...updatedPlans[index].prices,
      ...(priceUpdates.prices || {}),
    },
  };

  return writePricingData({
    ...current,
    plans: updatedPlans,
  });
}

export function resetPricing() {
  return writePricingData(DEFAULT_PRICING);
}
