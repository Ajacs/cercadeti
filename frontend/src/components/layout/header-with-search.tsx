'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useNavbarSearch } from "@/hooks/use-navbar-search";
import { useZones } from "@/hooks/use-strapi-zones";
import { useZoneContext } from "@/contexts/zone-context";
import {
  MapPin,
  ChevronDown,
  Search,
  Menu,
  Star,
  ExternalLink,
  X
} from "lucide-react";

const navLinks: Array<{ href: string; label: string }> = [];

export function HeaderWithSearch() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Contexto de zona global
  const { selectedZone, setSelectedZone, loading: zoneContextLoading } = useZoneContext();

  // Hook de búsqueda en tiempo real (usa la zona seleccionada)
  const { businesses, loading, error } = useNavbarSearch(searchTerm, selectedZone?.slug || "");

  // Hook para cargar todas las zonas disponibles
  const { zones, loading: zonesLoading } = useZones();
  const activeZones = zones.filter(z => z.is_active);

  // Mostrar resultados cuando hay término de búsqueda
  useEffect(() => {
    setShowResults(searchTerm.trim().length > 0);
  }, [searchTerm]);

  // Cerrar resultados al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && selectedZone) {
      // Redirigir a la página de búsqueda con el término y la zona seleccionada
      window.location.href = `/search?q=${encodeURIComponent(searchTerm.trim())}&zone=${selectedZone.slug}`;
    }
  };

  const handleBusinessClick = () => {
    setShowResults(false);
    setSearchTerm("");
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* Barra de búsqueda (centro) con resultados en tiempo real */}
          <div className="flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Buscar negocios, servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-r-none border-r-0 h-10 flex-1"
                onFocus={() => searchTerm.trim().length > 0 && setShowResults(true)}
              />

              <Button
                type="submit"
                className="rounded-l-none h-10 px-4"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

          {/* Dropdown de resultados en tiempo real */}
          {showResults && (
            <Card className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto shadow-lg border">
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <Search className="h-4 w-4 animate-spin mx-auto mb-2" />
                    Buscando...
                  </div>
                ) : error ? (
                  <div className="p-4 text-center text-red-500">
                    Error en la búsqueda
                  </div>
                ) : businesses.length > 0 ? (
                  <>
                    <div className="p-3 border-b bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {businesses.length} resultado{businesses.length !== 1 ? 's' : ''} para "{searchTerm}"
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowResults(false)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {businesses.slice(0, 5).map((business) => (
                        <Link
                          key={business.id}
                          href={`/business/${business.documentId || business.id}`}
                          onClick={handleBusinessClick}
                          className="block p-3 hover:bg-muted/50 border-b last:border-b-0 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm truncate">
                                  {business.name}
                                </h4>
                                {business.is_featured && (
                                  <Badge variant="secondary" className="text-xs">
                                    Destacado
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {business.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                {business.category && (
                                  <span>{business.category.name}</span>
                                )}
                                {business.zone && (
                                  <span>• {business.zone.name}</span>
                                )}
                              </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          </div>
                        </Link>
                      ))}
                      {businesses.length > 5 && (
                        <div className="p-3 text-center border-t bg-muted/25">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSearch}
                            className="text-xs"
                          >
                            Ver todos los resultados ({businesses.length})
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                ) : searchTerm.trim().length > 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <Search className="h-4 w-4 mx-auto mb-2" />
                    No se encontraron resultados para "{searchTerm}"
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}
        </div>

          {/* Navegación derecha */}
          <div className="flex items-center gap-4">
            {/* Selector de Zona */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-bold text-primary transition-colors hover:text-primary hover:bg-transparent focus:text-primary focus:bg-transparent flex items-center gap-1"
                >
                  <MapPin className="h-4 w-4" />
                  {zoneContextLoading || zonesLoading ? 'Cargando...' : selectedZone ? selectedZone.name : 'Selecciona tu zona'}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {zonesLoading ? (
                  <DropdownMenuItem disabled className="text-muted-foreground">
                    Cargando zonas...
                  </DropdownMenuItem>
                ) : activeZones.length > 0 ? (
                  activeZones.map(zone => (
                    <DropdownMenuItem
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className={cn(
                        "cursor-pointer hover:bg-muted/50 hover:text-foreground focus:bg-muted/50 focus:text-foreground",
                        selectedZone?.id === zone.id && "font-semibold text-primary bg-muted/30"
                      )}
                    >
                      {zone.name}
                      {selectedZone?.id === zone.id && " ✓"}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled className="text-muted-foreground">
                    No hay zonas disponibles
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Botón Registra tu negocio - Naranja */}
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Link href="/registro-negocio">
                Registra tu negocio
              </Link>
            </Button>

            {/* Navegación principal - removida ya que no hay enlaces */}

            {/* Menú móvil */}
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
