/**
 * Hook personalizado para gestionar zonas desde Strapi
 */

import { useState, useEffect, useCallback } from 'react';
import { Zone } from '@/types';
import { strapiAdapter } from '@/lib/strapi-adapter';

interface UseZonesReturn {
  zones: Zone[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useZones(): UseZonesReturn {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchZones = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await strapiAdapter.getZones();
      setZones(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar zonas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchZones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { zones, loading, error, refetch: fetchZones };
}

export function useZone(slug: string) {
  const [zone, setZone] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchZone = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const zone = await strapiAdapter.getZoneBySlug(slug);
      setZone(zone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar la zona');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchZone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return { zone, loading, error, refetch: fetchZone };
}
