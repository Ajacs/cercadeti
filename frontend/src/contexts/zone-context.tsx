'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Zone } from '@/types';
import { strapiAdapter } from '@/lib/strapi-adapter';

interface ZoneContextType {
  selectedZone: Zone | null;
  setSelectedZone: (zone: Zone) => void;
  loading: boolean;
}

const ZoneContext = createContext<ZoneContextType | undefined>(undefined);

const ZONE_STORAGE_KEY = 'cercadeti_selected_zone';

export function ZoneProvider({ children }: { children: ReactNode }) {
  const [selectedZone, setSelectedZoneState] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar zona inicial (desde localStorage o la primera zona activa)
  useEffect(() => {
    async function initializeZone() {
      try {
        // Intentar cargar desde localStorage
        const storedZoneSlug = localStorage.getItem(ZONE_STORAGE_KEY);

        if (storedZoneSlug) {
          // Cargar zona desde el slug guardado
          const zone = await strapiAdapter.getZoneBySlug(storedZoneSlug);
          if (zone && zone.is_active) {
            setSelectedZoneState(zone);
            setLoading(false);
            return;
          }
        }

        // Si no hay zona guardada o no es válida, cargar la primera zona activa
        const zonesResponse = await strapiAdapter.getZones();
        const activeZones = zonesResponse.data.filter(z => z.is_active);

        if (activeZones.length > 0) {
          const firstZone = activeZones[0];
          setSelectedZoneState(firstZone);
          localStorage.setItem(ZONE_STORAGE_KEY, firstZone.slug);
        }
      } catch (error) {
        console.error('Error initializing zone:', error);
      } finally {
        setLoading(false);
      }
    }

    initializeZone();
  }, []);

  const setSelectedZone = (zone: Zone) => {
    setSelectedZoneState(zone);
    localStorage.setItem(ZONE_STORAGE_KEY, zone.slug);
  };

  return (
    <ZoneContext.Provider value={{ selectedZone, setSelectedZone, loading }}>
      {children}
    </ZoneContext.Provider>
  );
}

export function useZoneContext() {
  const context = useContext(ZoneContext);
  if (context === undefined) {
    throw new Error('useZoneContext must be used within a ZoneProvider');
  }
  return context;
}
