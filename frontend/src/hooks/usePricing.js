import { useEffect, useState, useCallback } from 'react';
import { getPricing } from '../services/pricingApi.js';
import { pricingCopy, pricingModes, pricingPlans } from '../data/pricing.js';

const INITIAL_STATE = {
  modes: pricingModes,
  copy: pricingCopy,
  plans: pricingPlans,
  updatedAt: null,
  isFallback: false,
};

export function usePricing() {
  const [data, setData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDynamicPricing = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getPricing();
      setData(result);
      if (result.isFallback && result.error) {
        setError(result.error);
      } else {
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDynamicPricing();
  }, [fetchDynamicPricing]);

  return {
    modes: data.modes || pricingModes,
    copy: data.copy || pricingCopy,
    plans: data.plans || pricingPlans,
    updatedAt: data.updatedAt,
    isFallback: data.isFallback,
    loading,
    error,
    refresh: fetchDynamicPricing,
  };
}

export default usePricing;
