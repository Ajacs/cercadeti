
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useBusinessSearch } from "@/hooks/use-business-search";

interface BusinessSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory?: string;
  onSearchResults?: (results: any[]) => void;
}

export function BusinessSearch({ searchTerm, setSearchTerm, selectedCategory, onSearchResults }: BusinessSearchProps) {
  const { businesses, loading, error } = useBusinessSearch(searchTerm, selectedCategory);

  // Notificar resultados de búsqueda al componente padre
  React.useEffect(() => {
    if (onSearchResults) {
      onSearchResults(businesses);
    }
  }, [businesses, onSearchResults]);
  return (
    <section className="text-center mb-12">
      <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">
        Encuentra todo, cerca de ti.
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Explora los mejores negocios a tu alrededor. Comida, mercado, servicios y más, todo en un solo lugar.
      </p>
       <div className="mt-8 max-w-lg mx-auto">
          <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
              type="text"
              placeholder="Busca restaurantes, productos o servicios..."
              className="pl-12 h-14 text-base w-full rounded-full shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar negocios"
              />
              <Button 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Buscar"
                )}
              </Button>
          </div>
      </div>
    </section>
  );
}
