"use client";

import { useState } from 'react';
import { BusinessCard } from './business-card';
import { useBusinesses, useFeaturedBusinesses } from '@/hooks/use-strapi-businesses';
import { useCategories } from '@/hooks/use-strapi-categories';
import { useZones } from '@/hooks/use-strapi-zones';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, MapPin, Tag } from 'lucide-react';

interface StrapiBusinessListProps {
  featured?: boolean;
  categorySlug?: string;
  zoneSlug?: string;
  showFilters?: boolean;
}

export function StrapiBusinessList({ 
  featured = false, 
  categorySlug, 
  zoneSlug, 
  showFilters = true 
}: StrapiBusinessListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || '');
  const [selectedZone, setSelectedZone] = useState<string>(zoneSlug || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks para datos
  const { 
    businesses, 
    loading, 
    error, 
    total, 
    search 
  } = useBusinesses({
    category_slug: selectedCategory || undefined,
    zone_slug: selectedZone || undefined,
    featured: featured || undefined,
    query: searchQuery || undefined
  });

  const { businesses: featuredBusinesses, loading: featuredLoading } = useFeaturedBusinesses();
  const { categories, loading: categoriesLoading } = useCategories();
  const { zones, loading: zonesLoading } = useZones();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await search({ query: searchQuery.trim() });
    }
  };

  const handleCategoryFilter = async (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    await search({ 
      category_slug: categorySlug,
      zone_slug: selectedZone || undefined,
      featured: featured || undefined
    });
  };

  const handleZoneFilter = async (zoneSlug: string) => {
    setSelectedZone(zoneSlug);
    await search({ 
      category_slug: selectedCategory || undefined,
      zone_slug: zoneSlug,
      featured: featured || undefined
    });
  };

  const clearFilters = async () => {
    setSelectedCategory('');
    setSelectedZone('');
    setSearchQuery('');
    await search({ featured: featured || undefined });
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error al cargar los negocios: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      {showFilters && (
        <div className="space-y-4">
          {/* Búsqueda */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar negocios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Buscar'}
            </Button>
          </div>

          {/* Filtros de categoría */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="font-medium">Categorías:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === '' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleCategoryFilter('')}
              >
                Todas
              </Badge>
              {categoriesLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.slug ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleCategoryFilter(category.slug)}
                  >
                    {category.name}
                  </Badge>
                ))
              )}
            </div>
          </div>

          {/* Filtros de zona */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Zonas:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedZone === '' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleZoneFilter('')}
              >
                Todas
              </Badge>
              {zonesLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                zones.map((zone) => (
                  <Badge
                    key={zone.id}
                    variant={selectedZone === zone.slug ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleZoneFilter(zone.slug)}
                  >
                    {zone.name}
                  </Badge>
                ))
              )}
            </div>
          </div>

          {/* Botón limpiar filtros */}
          {(selectedCategory || selectedZone || searchQuery) && (
            <Button variant="outline" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          )}
        </div>
      )}

      {/* Resultados */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {featured ? 'Negocios Destacados' : 'Negocios'}
            {total > 0 && (
              <span className="text-sm text-gray-500 ml-2">({total} resultados)</span>
            )}
          </h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Business cards */}
        {!loading && businesses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard 
                key={business.id} 
                business={business}
                showOfferBadge={true}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && businesses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">
              No se encontraron negocios
            </div>
            <div className="text-gray-400 text-sm">
              {searchQuery || selectedCategory || selectedZone 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'No hay negocios disponibles en este momento'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para mostrar solo negocios destacados
export function FeaturedBusinesses() {
  return <StrapiBusinessList featured={true} showFilters={false} />;
}

// Componente para mostrar negocios por categoría
export function BusinessesByCategory({ categorySlug }: { categorySlug: string }) {
  return <StrapiBusinessList categorySlug={categorySlug} />;
}

// Componente para mostrar negocios por zona
export function BusinessesByZone({ zoneSlug }: { zoneSlug: string }) {
  return <StrapiBusinessList zoneSlug={zoneSlug} />;
}
