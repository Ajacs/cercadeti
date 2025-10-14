"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useBusinessesByZone } from "@/hooks/use-strapi-businesses";
import { useCategories } from "@/hooks/use-strapi-categories";
import { useZone } from "@/hooks/use-strapi-zones";
import type { Business } from "@/types";
import { BusinessCard } from "@/components/business-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  ArrowLeft,
  UtensilsCrossed,
  ShoppingCart,
  Wrench,
  Heart,
  Building2,
  Car,
  Stethoscope,
  Scissors,
  Dumbbell,
  BookOpen,
  Music,
  Camera,
  Shirt,
  Star
} from "lucide-react";
import * as LucideIcons from "lucide-react";

// Función para obtener el ícono de Lucide por nombre
function getLucideIcon(iconName: string) {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    return <IconComponent className="h-8 w-8" />;
  }
  return <LucideIcons.HelpCircle className="h-8 w-8" />;
}

export default function ZonePage() {
  const params = useParams();
  const zoneSlug = params.slug as string;
  const { zone, loading: zoneLoading, error: zoneError } = useZone(zoneSlug);
  const { businesses, loading: businessesLoading, error: businessesError } = useBusinessesByZone(zoneSlug);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const loading = zoneLoading || businessesLoading;
  const error = zoneError || businessesError;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Cargando información de la zona...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
          <Link href="/">
            <Button className="mt-4">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

    // Usar solo categorías de la base de datos
    const allCategories = categories;

    // Contar negocios por categoría y filtrar solo las que tienen negocios en esta zona
    const categoryCounts = allCategories
      .map(category => {
        const count = businesses.filter(business => business.category?.slug === category.slug).length;
        return {
          category: category.name,
          count,
          categoryData: category
        };
      })
      .filter(categoryCount => categoryCount.count > 0); // Solo mostrar categorías con negocios

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Botón de regreso */}
      <div className="flex justify-start mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>

      {/* Header simplificado - la información principal ahora está en el navbar */}
      <div className="mb-8 text-center py-16 bg-gradient-to-br from-primary/5 via-primary/3 to-orange-50 rounded-3xl">
        <h1 className="text-4xl lg:text-5xl font-headline font-bold text-primary mb-4">
          Negocios en {zone?.name || 'Cargando...'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {zone?.description || 'Descubre los mejores negocios y servicios de tu zona'}
        </p>
      </div>


      {/* Sección "Categorías" - 8 cuadros en 2 filas de 4 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Categorías</h2>

        {categoryCounts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryCounts.map(({ category, count, categoryData }) => {
              const hasBusinesses = count > 0;
              const categoryColor = categoryData?.color || '#6B7280';
              const categoryIcon = categoryData?.icon || 'HelpCircle';
              const categoryDescription = categoryData?.description || 'Negocios en esta categoría';
              const categorySlug = categoryData?.slug || (category ? category.toLowerCase().replace(/\s+/g, '-') : 'unknown');

              return (
                <Link key={category} href={`/zona/${zoneSlug}/${categorySlug}`}>
                  <div className={`flex flex-col items-center justify-center p-6 bg-card hover:bg-muted rounded-2xl transition-all duration-300 h-full shadow-sm hover:shadow-lg border cursor-pointer group ${!hasBusinesses ? 'opacity-75' : ''}`}>
                    {/* Icono de la categoría con color dinámico */}
                    <div
                      className={`p-4 rounded-full mb-4 transition-colors ${hasBusinesses ? 'shadow-sm border' : 'bg-muted text-muted-foreground'}`}
                      style={{
                        backgroundColor: hasBusinesses ? `${categoryColor}12` : undefined,
                        borderColor: hasBusinesses ? `${categoryColor}25` : undefined,
                        color: hasBusinesses ? categoryColor : undefined
                      }}
                    >
                      {getLucideIcon(categoryIcon)}
                    </div>

                    {/* Título de la categoría */}
                    <span className={`font-semibold font-headline text-center mb-2 transition-colors ${hasBusinesses ? 'text-foreground group-hover:text-primary' : 'text-muted-foreground'}`}>
                      {category}
                    </span>

                    {/* Contador de negocios */}
                    <Badge
                      variant={hasBusinesses ? "secondary" : "outline"}
                      className={`mb-3 transition-colors ${
                        hasBusinesses
                          ? 'border'
                          : 'bg-muted/50 text-muted-foreground border-muted'
                      }`}
                      style={{
                        backgroundColor: hasBusinesses ? `${categoryColor}10` : undefined,
                        borderColor: hasBusinesses ? `${categoryColor}20` : undefined,
                        color: hasBusinesses ? categoryColor : undefined
                      }}
                    >
                      {count} {count === 1 ? 'negocio' : 'negocios'}
                    </Badge>

                    {/* Descripción */}
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      {categoryDescription}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-headline text-xl mb-2">Sin categorías disponibles</h3>
            <p className="text-muted-foreground">
              No existen categorías con negocios registrados en {zone?.name || 'esta zona'} por el momento.
            </p>
          </Card>
        )}
      </section>

      {/* Sección "Explora tu alrededor" - 4 cuadros en una fila */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Explora tu alrededor</h2>

        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {businesses.map(business => (
              <BusinessCard 
                key={business.id} 
                business={business}
                showOfferBadge={true}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-headline text-xl mb-2">Sin negocios</h3>
            <p className="text-muted-foreground">No hay negocios disponibles en {zone?.name || 'esta zona'}.</p>
          </Card>
        )}
      </section>
    </div>
  );
}
