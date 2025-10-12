
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Business } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Truck, MapPin, Phone, Globe } from "lucide-react";
import { getBusinessImageUrl } from "@/lib/image-utils";

interface BusinessCardProps {
  business: Business;
  showOfferBadge?: boolean;
}

export function BusinessCard({ business, showOfferBadge = false }: BusinessCardProps) {
  const imageUrl = getBusinessImageUrl(business);

  return (
    <Link href={`/business/${business.documentId || business.id}`} className="block h-full">
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 group rounded-2xl cursor-pointer hover:scale-[1.02]">
        <CardHeader className="p-0 relative flex-shrink-0">
          <div className="overflow-hidden rounded-t-2xl">
            <Image
              src={imageUrl}
              alt={business.name}
              width={600}
              height={400}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {showOfferBadge && business.offers && business.offers.length > 0 && (
              <Badge className="bg-primary text-primary-foreground">Oferta</Badge>
            )}
            {business.supports_delivery && (
              <Badge className="bg-green-500 text-white">
                <Truck className="h-3 w-3 mr-1" />
                A domicilio
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="font-headline text-lg mb-2">{business.name}</CardTitle>
          <CardDescription className="text-sm text-foreground/80 line-clamp-2 mb-3">
            {business.description}
          </CardDescription>

          {/* Información de contacto y ubicación - altura mínima fija */}
          <div className="space-y-2 text-sm text-muted-foreground min-h-[120px]">
            {business.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">{business.address}</span>
              </div>
            )}
            {business.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{business.phone}</span>
              </div>
            )}
            {business.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span>Sitio web</span>
              </div>
            )}
            {business.supports_delivery && (
              <div className="flex items-center gap-2 text-green-600">
                <Truck className="h-4 w-4 flex-shrink-0" />
                <span>Delivery disponible</span>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer - siempre al fondo con flex */}
        <CardFooter className="px-4 py-3 border-t border-muted/50 bg-muted/20 mt-auto flex-shrink-0">
          <div className="flex items-center justify-center w-full">
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              {business.category?.name || 'Sin categoría'}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
