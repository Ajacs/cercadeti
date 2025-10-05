import { useState, useEffect, useCallback } from 'react';
import { strapiAdapter } from '@/lib/strapi-adapter';
import type { Business } from '@/types';

interface BusinessSearchParams {
  category_slug?: string;
  zone_slug?: string;
  featured?: boolean;
  query?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export function useBusinessesSimple(initialParams?: BusinessSearchParams) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = useCallback(async (params: BusinessSearchParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Llamar al adaptador sin filtros complejos
      const response = await strapiAdapter.getBusinesses({});

      // Filtrar manualmente en el frontend
      let filteredBusinesses = response.data;
      
      if (params.category_slug) {
        filteredBusinesses = filteredBusinesses.filter(b =>
          b.category?.slug === params.category_slug
        );
      }

      if (params.zone_slug) {
        filteredBusinesses = filteredBusinesses.filter(b =>
          b.zone?.slug === params.zone_slug
        );
      }

      setBusinesses(filteredBusinesses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar negocios');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusinesses(initialParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    businesses,
    loading,
    error,
    refetch: () => fetchBusinesses(initialParams)
  };
}
