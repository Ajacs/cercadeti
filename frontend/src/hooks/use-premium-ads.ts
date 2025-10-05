"use client";

import { useState, useEffect } from 'react';
import { premiumAds } from '@/lib/premium-ads-data';

export function usePremiumAds() {
  const [ads, setAds] = useState<typeof premiumAds>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setAds(premiumAds);
        setLoading(false);
      } catch (err) {
        setError('Error loading premium ads');
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return { ads, loading, error };
}
