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
      amount: 3050000,
      prices: {
        solar: '₦3,050,000',
        powercell: '₦2,600,000',
      },
      specs: ['3.5kVA Output', '5kWh Capacity'],
      solarSpecs: ['Three 610w Solar Panels'],
      instalments: {
        solar: [
          { label: '3 Months (+7% interest)', amount: '₦1,087,833' },
          { label: '4 Months (+10% interest)', amount: '₦838,750' },
          { label: '5 Months (+13% interest)', amount: '₦689,300' },
        ],
        powercell: [
          { label: '3 Months (+7% interest)', amount: '₦927,333' },
          { label: '4 Months (+10% interest)', amount: '₦715,000' },
          { label: '5 Months (+13% interest)', amount: '₦587,600' },
        ],
      },
    },
    {
      id: 'prime-plus',
      name: 'POWERCELL PRIME+',
      amount: 5200000,
      prices: {
        solar: '₦5,200,000',
        powercell: '₦4,300,000',
      },
      specs: ['5kVA Output', '10kWh Capacity'],
      solarSpecs: ['Six 610w Solar Panels'],
      instalments: {
        solar: [
          { label: '3 Months (+7% interest)', amount: '₦1,854,667' },
          { label: '4 Months (+10% interest)', amount: '₦1,430,000' },
          { label: '5 Months (+13% interest)', amount: '₦1,175,200' },
        ],
        powercell: [
          { label: '3 Months (+7% interest)', amount: '₦1,533,667' },
          { label: '4 Months (+10% interest)', amount: '₦1,182,500' },
          { label: '5 Months (+13% interest)', amount: '₦971,800' },
        ],
      },
    },
    {
      id: 'ultra',
      name: 'POWERCELL ULTRA',
      amount: 10000000,
      prices: {
        solar: '₦10,000,000',
        powercell: '₦8,200,000',
      },
      specs: ['10kVA Output', '20kWh Capacity'],
      solarSpecs: ['Twelve 610w Solar Panels'],
      instalments: {
        solar: [
          { label: '3 Months (+7% interest)', amount: '₦3,566,667' },
          { label: '4 Months (+10% interest)', amount: '₦2,750,000' },
          { label: '5 Months (+13% interest)', amount: '₦2,260,000' },
        ],
        powercell: [
          { label: '3 Months (+7% interest)', amount: '₦2,924,667' },
          { label: '4 Months (+10% interest)', amount: '₦2,255,000' },
          { label: '5 Months (+13% interest)', amount: '₦1,853,200' },
        ],
      },
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
