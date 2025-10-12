"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBusinessByDocumentId } from "@/hooks/use-strapi-businesses";
import { useZoneContext } from "@/contexts/zone-context";
import type { Business } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBusinessImageUrlLarge } from "@/lib/image-utils";
import {
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  ArrowLeft,
  DollarSign
} from "lucide-react";

export default function BusinessDetailPage() {
  const params = useParams();
  const documentId = params.documentId as string;
  const [mounted, setMounted] = useState(false);

  const { business, loading, error } = useBusinessByDocumentId(documentId);
  const { selectedZone } = useZoneContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Cargando información del negocio...</p>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error ? `Error: ${error}` : 'Negocio no encontrado'}
          </h1>
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatHours = (hours: any) => {
    if (!hours || typeof hours !== 'object') return null;

    const days = [
      { key: 'monday', label: 'Lunes' },
      { key: 'tuesday', label: 'Martes' },
      { key: 'wednesday', label: 'Miércoles' },
      { key: 'thursday', label: 'Jueves' },
      { key: 'friday', label: 'Viernes' },
      { key: 'saturday', label: 'Sábado' },
      { key: 'sunday', label: 'Domingo' },
    ];

    return days.map(day => {
      const dayHours = hours[day.key];
      if (dayHours && typeof dayHours === 'object' && dayHours.open && dayHours.close) {
        return {
          day: day.label,
          hours: `${dayHours.open} - ${dayHours.close}`
        };
      }
      return {
        day: day.label,
        hours: 'Cerrado'
      };
    });
  };

  const hoursFormatted = formatHours(business.hours);
  const imageUrl = getBusinessImageUrlLarge(business);

  // URL para volver a las categorías de la zona seleccionada
  const backUrl = selectedZone ? `/zona/${selectedZone.slug}` : '/';
  const backText = selectedZone ? `Volver a ${selectedZone.name}` : 'Volver al inicio';

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Botón de regreso */}
      <Link href={backUrl} className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        {backText}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Imagen principal y información básica */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={imageUrl}
                  alt={business.name}
                  width={800}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                {business.offer && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Oferta
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold mb-2">{business.name}</h1>
                  {business.category && (
                    <Badge variant="secondary" className="mb-2">{business.category.name}</Badge>
                  )}
                  {business.zone && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{business.zone.name}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {business.plan && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{business.plan.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-4">{business.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Información de contacto y horarios */}
        <div className="space-y-6">
          {/* Información de contacto */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Información de contacto</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {business.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <a href={`tel:${business.phone}`} className="text-primary hover:underline">
                      {business.phone}
                    </a>
                  </div>
                </div>
              )}

              {business.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${business.email}`} className="text-primary hover:underline">
                      {business.email}
                    </a>
                  </div>
                </div>
              )}

              {business.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-muted-foreground">{business.address}</p>
                  </div>
                </div>
              )}

              {business.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Sitio web</p>
                    <a
                      href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {business.website}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Horarios */}
          {hoursFormatted && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Horarios de atención
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hoursFormatted.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium">{item.day}</span>
                      <span className="text-muted-foreground">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
