"use client";

import { useState, useEffect } from 'react';
import { Business } from '@/types';
import { strapiAdapter } from '@/lib/strapi-adapter';

export function useNavbarSearch(searchTerm: string, selectedZone: string = "pedregal") {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchBusinesses = async () => {
      if (!searchTerm.trim()) {
        setBusinesses([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Obtener todos los negocios y filtrar manualmente para mayor control
        const response = await strapiAdapter.getBusinesses({});
        let filteredBusinesses = response.data;

        // Filtrar por zona si se especifica
        if (selectedZone) {
          filteredBusinesses = filteredBusinesses.filter(b => b.zone?.slug === selectedZone);
        }

        // Filtrar por término de búsqueda
        const query = searchTerm.toLowerCase();
        filteredBusinesses = filteredBusinesses.filter(b => 
          b.name.toLowerCase().includes(query) || 
          (b.description && b.description.toLowerCase().includes(query))
        );

        setBusinesses(filteredBusinesses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(searchBusinesses, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedZone]);

  return { businesses, loading, error };
}
