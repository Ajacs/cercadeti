/**
 * Hook personalizado para gestionar negocios desde Strapi
 */

import { useState, useEffect, useCallback } from 'react';
import { Business, BusinessFilters, BusinessSearchParams } from '@/types';
import { strapiAdapter } from '@/lib/strapi-adapter';

interface UseBusinessesReturn {
  businesses: Business[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageCount: number;
  refetch: () => Promise<void>;
  search: (params: BusinessSearchParams) => Promise<void>;
  filter: (filters: BusinessFilters) => Promise<void>;
}

export function useBusinesses(initialParams?: BusinessSearchParams): UseBusinessesReturn {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const fetchBusinesses = useCallback(async (params: BusinessSearchParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = {
        populate: '*',
        sort: params.sort ? [`${params.sort}:${params.order || 'desc'}`] : ['rating:desc'],
        pagination: {
          page: params.page || 1,
          pageSize: params.pageSize || 12
        },
        filters: {
          ...(params.category_slug && { 
            'category.slug': { $eq: params.category_slug }
          }),
          ...(params.zone_slug && { 
            'zone.slug': { $eq: params.zone_slug }
          }),
          ...(params.featured !== undefined && { featured: { $eq: params.featured } })
        }
      };

      // Usar el adaptador que maneja tanto Strapi como datos mock
      const response = await strapiAdapter.getBusinesses(queryParams);
      setBusinesses(response.data);
      setTotal(response.meta?.pagination?.total || response.data.length);
      setPageCount(response.meta?.pagination?.pageCount || 1);
      setPage(response.meta?.pagination?.page || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar negocios');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchBusinesses();
  }, [fetchBusinesses]);

  const search = useCallback(async (params: BusinessSearchParams) => {
    await fetchBusinesses(params);
  }, [fetchBusinesses]);

  const filter = useCallback(async (filters: BusinessFilters) => {
    const searchParams: BusinessSearchParams = {
      ...filters,
      category_slug: filters.category_id ? undefined : undefined, // Necesitaríamos un mapeo
      zone_slug: filters.zone_id ? undefined : undefined, // Necesitaríamos un mapeo
      featured: filters.featured
    };
    await fetchBusinesses(searchParams);
  }, [fetchBusinesses]);

  useEffect(() => {
    fetchBusinesses(initialParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    businesses,
    loading,
    error,
    total,
    page,
    pageCount,
    refetch,
    search,
    filter
  };
}

export function useBusiness(id: number) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusiness = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      const businessData = await strapiAdapter.getBusinessById(id);
      setBusiness(businessData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el negocio');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBusiness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { business, loading, error, refetch: fetchBusiness };
}

export function useBusinessByDocumentId(documentId: string) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusiness = useCallback(async () => {
    if (!documentId) return;
    
    setLoading(true);
    setError(null);

    try {
      const businessData = await strapiAdapter.getBusinessByDocumentId(documentId);
      setBusiness(businessData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el negocio');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    fetchBusiness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  return { business, loading, error, refetch: fetchBusiness };
}

export function useFeaturedBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatured = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await strapiAdapter.getFeaturedBusinesses();
      setBusinesses(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar negocios destacados');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatured();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { businesses, loading, error, refetch: fetchFeatured };
}

export function useBusinessesByZone(zoneSlug: string) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = useCallback(async () => {
    if (!zoneSlug) return;

    setLoading(true);
    setError(null);

    try {
      const response = await strapiAdapter.getBusinesses({ zone_slug: zoneSlug });
      setBusinesses(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar negocios de la zona');
    } finally {
      setLoading(false);
    }
  }, [zoneSlug]);

  useEffect(() => {
    fetchBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoneSlug]);

  return { businesses, loading, error, refetch: fetchBusinesses };
}
