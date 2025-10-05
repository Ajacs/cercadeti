"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Users, Search } from "lucide-react";
import Link from "next/link";

interface HeroDynamicProps {
  businessCount?: number;
  onShowCategories?: () => void;
}

export function HeroDynamic({
  businessCount = 0,
  onShowCategories
}: HeroDynamicProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes del carousel
  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Persona usando teléfono para buscar servicios locales"
    },
    {
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Negocio local con clientes"
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Repartidor en moto entregando pedidos"
    }
  ];

  // Auto-advance carousel cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/3 to-orange-50 py-16 rounded-3xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="h-4 w-4" />
                Explorando El Pedregal
              </div>

              <h1 className="text-5xl lg:text-6xl font-headline font-bold tracking-tight text-primary leading-tight">
                Encuentra todo,
                <span className="block text-foreground">cerca de ti</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Descubre los mejores negocios locales. Comida, servicios, ofertas y más,
                todo en un solo lugar.
              </p>
            </div>

            {/* Call to Action */}
            <div className="max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/zona/pedregal">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all rounded-2xl w-full sm:w-auto"
                  >
                    Explorar Negocios
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onShowCategories}
                  className="h-14 px-8 text-base border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 bg-white/80 backdrop-blur-sm transition-all rounded-2xl text-primary hover:text-primary"
                >
                  Ver Categorías
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span><strong className="text-foreground">{businessCount}</strong> negocios</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Ofertas actualizadas</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Main Visual - Carousel de imágenes */}
              <div className="relative rounded-3xl overflow-hidden aspect-square">
                <div className="relative w-full h-full">
                  {heroImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                              className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-out ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                              style={{
                                transitionDuration: '5000ms'
                              }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-bold text-xl mb-2">Explora tu zona</h3>
                  <p className="text-white/90">Todo lo que necesitas cerca</p>
                </div>
              </div>

              {/* Floating Cards - Encima de la imagen */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-primary/10 animate-pulse z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Búsqueda rápida</p>
                    <p className="text-xs text-muted-foreground">Encuentra al instante</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-primary/10 animate-bounce z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">El Pedregal</p>
                    <p className="text-xs text-muted-foreground">Zona activa</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 right-6 bg-white rounded-2xl shadow-xl p-4 border border-primary/10 animate-pulse z-10" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Nuevas ofertas</p>
                    <p className="text-xs text-muted-foreground">Cada día</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
