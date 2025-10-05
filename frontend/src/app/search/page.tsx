"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BusinessList } from "@/components/business-list";
import { BusinessSearch } from "@/components/business-search";
import { useNavbarSearch } from "@/hooks/use-navbar-search";
import { Search, Filter, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("pedregal");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { businesses, loading, error } = useNavbarSearch(searchTerm, selectedZone);

  // Get search parameters from URL
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const zone = searchParams.get('zone') || 'pedregal';
    const category = searchParams.get('category');

    setSearchTerm(query);
    setSelectedZone(zone);
    setSelectedCategory(category);
  }, [searchParams]);

  // Filter businesses by category if selected
  const filteredBusinesses = selectedCategory
    ? businesses.filter(b => b.category?.name === selectedCategory)
    : businesses;

  return (
    <div className="container mx-auto px-4 max-w-7xl py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-headline font-bold">
              Resultados de búsqueda
            </h1>
            {searchTerm && (
            <p className="text-muted-foreground">
              Para: <span className="font-semibold text-primary">"{searchTerm}"</span> en{" "}
              <span className="font-semibold text-primary">
                {selectedZone === "pedregal" ? "El Pedregal" : selectedZone}
              </span>
            </p>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl">
          <BusinessSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory || undefined}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtros:</span>
        </div>

        <Button
          variant={selectedCategory ? "outline" : "default"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          Todas las categorías
        </Button>

        {/* Category filters */}
        {Array.from(new Set(businesses.map(b => b.category?.name).filter(Boolean))).map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category || null)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredBusinesses.length} resultado{filteredBusinesses.length !== 1 ? 's' : ''} encontrado{filteredBusinesses.length !== 1 ? 's' : ''}
          </span>
          {selectedCategory && (
            <Badge variant="secondary">
              Categoría: {selectedCategory}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Zona: {selectedZone}</span>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Buscando resultados...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <Search className="h-12 w-12 mx-auto mb-2" />
            <p>Error al buscar resultados</p>
          </div>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : filteredBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto mb-2" />
            <p>No se encontraron resultados</p>
          </div>
          <p className="text-muted-foreground mb-4">
            {searchTerm
              ? `No hay resultados para "${searchTerm}" en ${selectedZone === "pedregal" ? "El Pedregal" : selectedZone}${selectedCategory ? ` en la categoría ${selectedCategory}` : ''}`
              : 'Intenta con otros términos de búsqueda'
            }
          </p>
          <Button onClick={() => setSearchTerm("")}>
            Limpiar búsqueda
          </Button>
        </div>
      ) : (
        <BusinessList
          title=""
          icon={<Search className="h-6 w-6 text-primary" />}
          businesses={filteredBusinesses}
          viewAllHref="#"
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Cargando resultados de búsqueda...
          </p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
