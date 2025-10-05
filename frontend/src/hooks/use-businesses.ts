"use client";

import { useState, useEffect } from 'react';
import { mockBusinesses } from '@/lib/data';
import { businessToBusinessWithDetails } from '@/lib/adapters';
import type { BusinessWithDetails } from '@/types';

export function useBusinesses() {
  const [businesses, setBusinesses] = useState<BusinessWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        const adaptedBusinesses = mockBusinesses.map(businessToBusinessWithDetails);
        setBusinesses(adaptedBusinesses);
        setLoading(false);
      } catch (err) {
        setError('Error loading businesses');
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { businesses, loading, error };
}
