/**
 * Hook personalizado para gestionar anuncios desde Strapi
 */

import { useState, useEffect, useCallback } from 'react';
import { Ad } from '@/types';
import { StrapiAPI, StrapiUtils } from '@/lib/strapi';

interface UseAdsReturn {
  ads: Ad[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAds(): UseAdsReturn {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAds = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await StrapiAPI.ads.getActive();
      const transformed = StrapiUtils.transformStrapiCollection(response);
      setAds(transformed.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar anuncios');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ads, loading, error, refetch: fetchAds };
}

export function useBusinessAds(businessId: number) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessAds = useCallback(async () => {
    if (!businessId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await StrapiAPI.ads.getByBusiness(businessId);
      const transformed = StrapiUtils.transformStrapiCollection(response);
      setAds(transformed.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar anuncios del negocio');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchBusinessAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId]);

  return { ads, loading, error, refetch: fetchBusinessAds };
}
