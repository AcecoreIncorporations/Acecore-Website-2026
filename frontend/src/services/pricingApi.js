import { pricingCopy, pricingModes, pricingPlans } from '../data/pricing.js';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '/api';

const DEFAULT_DATA = {
  modes: pricingModes,
  copy: pricingCopy,
  plans: pricingPlans,
  updatedAt: null,
};

export async function getPricing() {
  try {
    const res = await fetch(`${API_BASE}/pricing`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    if (result.success && result.data) {
      return {
        ...result.data,
        isFallback: false,
      };
    }
    throw new Error('Invalid API response format');
  } catch (err) {
    console.warn(
      '[PricingAPI] Could not connect to backend pricing service, using offline fallback data:',
      err.message,
    );
    return {
      ...DEFAULT_DATA,
      isFallback: true,
      error: err.message,
    };
  }
}

export async function getPlanById(planId) {
  try {
    const res = await fetch(`${API_BASE}/pricing/${planId}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();
    if (result.success && result.data) {
      return result.data;
    }
  } catch (err) {
    console.warn(`[PricingAPI] Error fetching plan ${planId}, using fallback:`, err.message);
  }

  return DEFAULT_DATA.plans.find((p) => p.id === planId) || DEFAULT_DATA.plans[0];
}

export async function updatePlanPrice(planId, pricePayload) {
  const res = await fetch(`${API_BASE}/pricing/${planId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pricePayload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP error! status: ${res.status}`);
  }

  return res.json();
}
