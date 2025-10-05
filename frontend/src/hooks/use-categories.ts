"use client";

import { useState, useEffect } from 'react';
import { strapiAdapter } from '@/lib/strapi-adapter';
import type { Category } from '@/types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await strapiAdapter.getCategories();
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
