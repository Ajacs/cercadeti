"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useBusinessesSimple } from "@/hooks/use-businesses-simple";
import { useCategory } from "@/hooks/use-strapi-categories";
import { useZones } from "@/hooks/use-strapi-zones";
import type { Business } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBusinessImageUrl } from "@/lib/image-utils";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  Mail,
  Truck,
  Users,
  Filter,
  Search
} from "lucide-react";
import * as LucideIcons from "lucide-react";

// Función para obtener el ícono de Lucide por nombre
function getLucideIcon(iconName: string) {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    return <IconComponent className="h-6 w-6" />;
  }
  return <LucideIcons.HelpCircle className="h-6 w-6" />;
}

export default function CategoryDetailPage() {
  const params = useParams();
  const zoneSlug = params.slug as string;
  const categorySlug = params.categoria as string;

  // Obtener datos
  const { category, loading: categoryLoading, error: categoryError } = useCategory(categorySlug);
  const { zones, loading: zonesLoading } = useZones();
  
  const searchParams = {
    zone_slug: zoneSlug,
    category_slug: categorySlug
  };

  const { businesses, loading: businessesLoading, error: businessesError } = useBusinessesSimple(searchParams);

  // Encontrar la zona actual
  const currentZone = zones.find(zone => zone.slug === zoneSlug);

  // Loading states
  if (categoryLoading || zonesLoading || businessesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error states
  if (categoryError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{categoryError}</p>
            <Link href={`/zona/${zoneSlug}`}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a {currentZone?.name || zoneSlug}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Categoría no encontrada</h1>
            <p className="text-gray-600 mb-6">La categoría "{categorySlug}" no existe.</p>
            <Link href={`/zona/${zoneSlug}`}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a {currentZone?.name || zoneSlug}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/zona/${zoneSlug}`}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a {currentZone?.name || zoneSlug}
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="p-4 rounded-2xl shadow-lg"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <div
                className="text-4xl"
                style={{ color: category.color }}
              >
                {getLucideIcon(category.icon)}
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {category.name} en {currentZone?.name || zoneSlug}
              </h1>
              <p className="text-lg text-gray-600">
                {businesses.length} {businesses.length === 1 ? 'negocio' : 'negocios'} disponible{businesses.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {category.description && (
            <p className="text-gray-600 text-lg max-w-3xl">
              {category.description}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <div style={{ color: category.color }}>
                    {getLucideIcon(category.icon)}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {businesses.length}
                  </h3>
                  <p className="text-gray-600">
                    {businesses.length === 1 ? 'Negocio' : 'Negocios'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {businesses.filter(b => b.supports_delivery).length}
                  </h3>
                  <p className="text-gray-600">Con delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Businesses Grid */}
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => {
              const imageUrl = getBusinessImageUrl(business);
              const hasImage = imageUrl !== '/placeholder-business.jpg';

              return (
              <Card key={business.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg flex flex-col h-full">
                <div className="relative overflow-hidden rounded-t-2xl flex-shrink-0">
                  {hasImage ? (
                    <Image
                      src={imageUrl}
                      alt={business.name}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div
                        className="text-4xl opacity-50"
                        style={{ color: category.color }}
                      >
                        {getLucideIcon(category.icon)}
                      </div>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {business.featured && (
                      <Badge className="bg-orange-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Destacado
                      </Badge>
                    )}
                    {business.offer && business.offer_text && (
                      <Badge className="bg-green-500 text-white">
                        Oferta
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                </div>

                <CardHeader className="pb-3 flex-shrink-0">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {business.name}
                  </CardTitle>
                  {business.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {business.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="pt-0 flex-grow flex flex-col">
                  <div className="space-y-3 flex-grow">
                    {/* Address */}
                    {business.address && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{business.address}</span>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {business.phone && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{business.phone}</span>
                        </div>
                      )}
                      {business.website && (
                        <div className="flex items-center gap-1 text-primary hover:underline">
                          <Globe className="h-4 w-4" />
                          <a href={business.website} target="_blank" rel="noopener noreferrer">
                            Sitio web
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Delivery Info - Altura mínima para mantener alineación */}
                    <div className="min-h-[24px]">
                      {business.supports_delivery && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Truck className="h-4 w-4" />
                          <span>Delivery disponible</span>
                          {business.delivery_time && (
                            <span className="text-gray-500">
                              • {business.delivery_time}
                            </span>
                          )}
                          {business.delivery_fee && business.delivery_fee > 0 && (
                            <span className="text-gray-500">
                              • ${business.delivery_fee}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Offer */}
                    {business.offer_text && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm font-medium text-green-800">
                          {business.offer_text}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Button - siempre al fondo */}
                  <div className="pt-4 mt-auto">
                    <Link href={`/business/${business.documentId || business.id}`}>
                      <Button className="w-full">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <div
                  className="text-2xl"
                  style={{ color: category.color }}
                >
                  {getLucideIcon(category.icon)}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay negocios disponibles
              </h3>
              <p className="text-gray-600 mb-6">
                No encontramos negocios de {category.name} en {currentZone?.name || zoneSlug} en este momento.
              </p>
              <Link href={`/zona/${zoneSlug}`}>
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Ver otras categorías
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
