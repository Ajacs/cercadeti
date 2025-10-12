"use client";

import { useState, useRef } from "react";
import { useBusinessesByZone } from "@/hooks/use-strapi-businesses";
import { HeroDynamic } from "@/components/hero-dynamic";
import { CategoryMosaic } from "@/components/category-mosaic";
import { ContentSections } from "@/components/content-sections";
import { useAds } from "@/hooks/use-strapi-ads";
import { useZoneContext } from "@/contexts/zone-context";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Usar el contexto de zona global
  const { selectedZone, loading: zoneLoading } = useZoneContext();

  // Cargar negocios de la zona seleccionada
  const { businesses, loading: businessesLoading, error } = useBusinessesByZone(selectedZone?.slug || "");
  const { ads: premiumAds, loading: adsLoading, error: adsError } = useAds();

  const loading = zoneLoading || businessesLoading;

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Cargando negocios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="space-y-16">
        {/* Hero Section */}
        <HeroDynamic
          businessCount={businesses.length}
          onShowCategories={scrollToCategories}
        />

        {/* Categories Mosaic */}
        <div ref={categoriesRef}>
          <CategoryMosaic
            onSelectCategory={setSelectedCategory}
            selectedZone={selectedZone?.slug || ""}
          />
        </div>

        {/* Content Sections */}
        <ContentSections
          businesses={businesses}
          premiumAds={premiumAds}
          adsLoading={adsLoading}
          adsError={adsError}
        />
      </div>
    </div>
  );
}
