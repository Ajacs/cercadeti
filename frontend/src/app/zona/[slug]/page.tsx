"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useBusinessesByZone } from "@/hooks/use-strapi-businesses";
import { useCategories } from "@/hooks/use-strapi-categories";
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

// Mapeo de categorías a iconos, colores e imágenes (fallback)
const categoryConfig = {
  'Restaurantes': {
    icon: UtensilsCrossed,
    description: 'Deliciosos restaurantes y cafeterías'
  },
  'Supermercados': {
    icon: ShoppingCart,
    description: 'Supermercados y tiendas de conveniencia'
  },
  'Servicios Hogar': {
    icon: Wrench,
    description: 'Plomería, electricidad y reparaciones'
  },
  'Mascotas': {
    icon: Heart,
    description: 'Productos y servicios para mascotas'
  },
  'Transporte': {
    icon: Car,
    description: 'Taxi, Uber, transporte público y servicios de movilidad'
  },
  'Salud': {
    icon: Stethoscope,
    description: 'Clínicas, farmacias y servicios médicos'
  },
  'Belleza': {
    icon: Scissors,
    description: 'Salones de belleza, barberías y estéticas'
  },
  'Deportes': {
    icon: Dumbbell,
    description: 'Gimnasios, tiendas deportivas y actividades físicas'
  },
  'Educación': {
    icon: BookOpen,
    description: 'Escuelas, academias y centros de capacitación'
  },
  'Entretenimiento': {
    icon: Music,
    description: 'Cines, teatros, bares y lugares de diversión'
  },
  'Fotografía': {
    icon: Camera,
    description: 'Estudios fotográficos y servicios de imagen'
  },
  'Moda': {
    icon: Shirt,
    description: 'Boutiques, tiendas de ropa y accesorios'
  }
};

export default function ZonePage() {
  const params = useParams();
  const zoneName = params.slug as string;
  const { businesses, loading, error } = useBusinessesByZone(zoneName);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  // Convertir el parámetro de URL a formato normal (ej: "roma-norte" -> "Roma Norte")
  const normalizedZoneName = zoneName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

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

    // Usar categorías de la base de datos o fallback estático
    const allCategories = categories.length > 0 ? categories : [
      { id: 1, name: 'Restaurantes', slug: 'restaurantes', icon: 'UtensilsCrossed', color: '#FF6B6B', description: 'Deliciosos restaurantes y cafeterías', is_active: true, sort_order: 1, created_at: '', updated_at: '' },
      { id: 2, name: 'Supermercados', slug: 'supermercados', icon: 'ShoppingCart', color: '#4ECDC4', description: 'Supermercados y tiendas de conveniencia', is_active: true, sort_order: 2, created_at: '', updated_at: '' },
      { id: 3, name: 'Servicios Hogar', slug: 'servicios-hogar', icon: 'Wrench', color: '#45B7D1', description: 'Plomería, electricidad y reparaciones', is_active: true, sort_order: 3, created_at: '', updated_at: '' },
      { id: 4, name: 'Mascotas', slug: 'mascotas', icon: 'Heart', color: '#F39C12', description: 'Productos y servicios para mascotas', is_active: true, sort_order: 4, created_at: '', updated_at: '' },
      { id: 5, name: 'Transporte', slug: 'transporte', icon: 'Car', color: '#9B59B6', description: 'Taxi, Uber, transporte público y servicios de movilidad', is_active: true, sort_order: 5, created_at: '', updated_at: '' },
      { id: 6, name: 'Salud', slug: 'salud', icon: 'Stethoscope', color: '#E74C3C', description: 'Clínicas, farmacias y servicios médicos', is_active: true, sort_order: 6, created_at: '', updated_at: '' },
      { id: 7, name: 'Belleza', slug: 'belleza', icon: 'Scissors', color: '#E91E63', description: 'Salones de belleza, barberías y estéticas', is_active: true, sort_order: 7, created_at: '', updated_at: '' },
      { id: 8, name: 'Deportes', slug: 'deportes', icon: 'Dumbbell', color: '#FF9800', description: 'Gimnasios, tiendas deportivas y actividades físicas', is_active: true, sort_order: 8, created_at: '', updated_at: '' },
      { id: 9, name: 'Educación', slug: 'educacion', icon: 'BookOpen', color: '#2196F3', description: 'Escuelas, academias y centros de capacitación', is_active: true, sort_order: 9, created_at: '', updated_at: '' },
      { id: 10, name: 'Entretenimiento', slug: 'entretenimiento', icon: 'Music', color: '#9C27B0', description: 'Cines, teatros, bares y lugares de diversión', is_active: true, sort_order: 10, created_at: '', updated_at: '' },
      { id: 11, name: 'Fotografía', slug: 'fotografia', icon: 'Camera', color: '#607D8B', description: 'Estudios fotográficos y servicios de imagen', is_active: true, sort_order: 11, created_at: '', updated_at: '' },
      { id: 12, name: 'Moda', slug: 'moda', icon: 'Shirt', color: '#795548', description: 'Boutiques, tiendas de ropa y accesorios', is_active: true, sort_order: 12, created_at: '', updated_at: '' }
    ];

    // Contar negocios por categoría (incluyendo categorías sin negocios)
    const categoryCounts = allCategories.map(category => {
      const count = businesses.filter(business => business.category?.slug === category.slug).length;
      return {
        category: category.name,
        count,
        categoryData: category
      };
    });

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
          Negocios en {normalizedZoneName}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre los mejores negocios y servicios de tu zona
        </p>
      </div>


      {/* Sección "Categorías" - 8 cuadros en 2 filas de 4 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Categorías</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryCounts.map(({ category, count, categoryData }) => {
              const hasBusinesses = count > 0;
              const categoryColor = categoryData?.color || '#6B7280';
              const categoryIcon = categoryData?.icon || 'HelpCircle';
              const categoryDescription = categoryData?.description || 'Negocios en esta categoría';
              const categorySlug = categoryData?.slug || (category ? category.toLowerCase().replace(/\s+/g, '-') : 'unknown');

              return (
                <Link key={category} href={`/zona/${zoneName}/${categorySlug}`}>
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
            <p className="text-muted-foreground">No hay negocios disponibles en {normalizedZoneName}.</p>
          </Card>
        )}
      </section>
    </div>
  );
}
