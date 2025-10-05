/**
 * Hook personalizado para gestionar ofertas desde Strapi
 */

import { useState, useEffect, useCallback } from 'react';
import { Offer } from '@/types';
import { StrapiAPI, StrapiUtils } from '@/lib/strapi';

interface UseOffersReturn {
  offers: Offer[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useOffers(): UseOffersReturn {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await StrapiAPI.offers.getActive();
      const transformed = StrapiUtils.transformStrapiCollection(response);
      setOffers(transformed.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar ofertas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { offers, loading, error, refetch: fetchOffers };
}

export function useBusinessOffers(businessId: number) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessOffers = useCallback(async () => {
    if (!businessId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await StrapiAPI.offers.getByBusiness(businessId);
      const transformed = StrapiUtils.transformStrapiCollection(response);
      setOffers(transformed.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar ofertas del negocio');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchBusinessOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId]);

  return { offers, loading, error, refetch: fetchBusinessOffers };
}
