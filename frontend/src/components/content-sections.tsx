"use client";

import React, { useState, useEffect } from "react";
import { BusinessList } from "@/components/business-list";
import { PremiumAdsSection } from "@/components/premium-ads-section";
import { FlipbookLink } from "@/components/flipbook-link";
import { BusinessCard } from "@/components/business-card";
import { Star, Tag, Zap, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessWithDetails } from "@/types";

interface ContentSectionsProps {
  businesses: BusinessWithDetails[];
  premiumAds: any[];
  adsLoading: boolean;
  adsError: any;
}

// Componente para el carousel de anuncios premium
        function PremiumAdsCarousel({ ads }: { ads: any[] }) {
          const [currentIndex, setCurrentIndex] = useState(0);

          // Auto-advance carousel
          useEffect(() => {
            const interval = setInterval(() => {
              setCurrentIndex((prevIndex) =>
                prevIndex === ads.length - 1 ? 0 : prevIndex + 1
              );
            }, 5000); // Cambia cada 5 segundos

            return () => clearInterval(interval);
          }, [ads.length]);

          const goToPrevious = () => {
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? ads.length - 1 : prevIndex - 1
            );
          };

          const goToNext = () => {
            setCurrentIndex((prevIndex) =>
              prevIndex === ads.length - 1 ? 0 : prevIndex + 1
            );
          };

          return (
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
              <div className="overflow-hidden h-full">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {ads.map((ad) => (
                    <div key={ad.id} className="w-full flex-shrink-0 h-full">
                      <div className="p-4 md:p-6 lg:p-8 h-full">
                        <PremiumAdsSection
                          ads={[ad]}
                          showTitle={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {ads.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/90 shadow-lg hover:bg-white"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/90 shadow-lg hover:bg-white"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </>
              )}

              {/* Dots Indicator */}
              {ads.length > 1 && (
                <div className="flex justify-center gap-1 md:gap-2 pb-2 md:pb-4">
                  {ads.map((_, index) => (
                    <button
                      key={index}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-primary w-4 md:w-6'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        }

// Componente para el carousel de ofertas
function OfferCarousel({ businesses }: { businesses: BusinessWithDetails[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === businesses.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [businesses.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? businesses.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === businesses.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Tag className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold">Ofertas Especiales</h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl bg-white border border-primary/10 shadow-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {businesses.map((business) => (
              <div key={business.id} className="w-full flex-shrink-0">
                <div className="p-6">
                  <BusinessCard business={business} showOfferBadge={true} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {businesses.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 shadow-lg hover:bg-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 shadow-lg hover:bg-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {businesses.length > 1 && (
        <div className="flex justify-center gap-2">
          {businesses.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ContentSections({ businesses, premiumAds, adsLoading, adsError }: ContentSectionsProps) {
  const featuredBusinesses = businesses.filter(b => b.featured).slice(0, 4);
  const offerBusinesses = businesses.filter(b => b.offer || (b.offers && b.offers.length > 0)).slice(0, 4);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-16 pb-16">
        {/* Revista Digital Hero Section - Contenida */}
        <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 relative overflow-hidden rounded-3xl border border-slate-600/30">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-slate-400 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-slate-300 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Lado Izquierdo - Contenido */}
              <div className="text-white space-y-8">
                {/* Badge nuevo */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Nueva Edición Disponible</span>
                </div>

                {/* Título principal */}
                <div className="space-y-4">
                  <h2 className="text-5xl lg:text-6xl font-black leading-tight">
                    Revista Digital
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-300">
                      Interactiva
                    </span>
                  </h2>
                  <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                    Descubre ofertas exclusivas, promociones especiales y contenido premium
                    de los mejores negocios en El Pedregal.
                  </p>
                </div>

                {/* Estadísticas en vivo */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-200 mb-1">24</div>
                    <div className="text-sm text-white/70 uppercase tracking-wide">Páginas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-200 mb-1">45+</div>
                    <div className="text-sm text-white/70 uppercase tracking-wide">Ofertas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-200 mb-1">120</div>
                    <div className="text-sm text-white/70 uppercase tracking-wide">Lectores Hoy</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open("https://example.com/flipbook", '_blank')}
                    className="group bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <BookOpen className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    Leer Ahora
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3">
                    <Star className="h-5 w-5 group-hover:text-slate-200 transition-colors" />
                    Preview Gratis
                  </button>
                </div>

                {/* Social proof */}
                {isClient && (
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div className="text-white/80">
                      <span className="font-semibold">+120 lectores</span>
                      <span className="text-sm block">leyendo ahora</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Lado Derecho - Revista 3D Interactiva */}
              <div className="relative flex justify-center">
                {/* Revista principal con efecto 3D */}
                <div className="relative group cursor-pointer">
                  {/* Sombra y resplandor */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 blur-xl group-hover:blur-2xl transition-all duration-500 rounded-2xl"></div>

                  {/* Revista */}
                  <div className="relative bg-white rounded-2xl shadow-2xl transform perspective-1000 group-hover:rotate-y-12 transition-all duration-500 w-80 h-96 overflow-hidden">
                    {/* Cover de la revista */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-orange-500 to-orange-600 p-8 text-white">
                      <div className="h-full flex flex-col justify-between">
                        {/* Header */}
                        <div>
                          <div className="text-sm font-medium opacity-90 mb-2">EDICIÓN ESPECIAL</div>
                          <h3 className="text-3xl font-black leading-tight mb-4">
                            GACETA<br/>
                            <span className="text-yellow-300">EL PEDREGAL</span>
                          </h3>
                          <div className="w-16 h-1 bg-yellow-300 rounded-full"></div>
                        </div>

                        {/* Featured content preview */}
                        <div className="space-y-3">
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                            <div className="text-sm font-semibold mb-1">⚡ Oferta Flash</div>
                            <div className="text-xs opacity-90">Hasta 50% OFF en restaurantes</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                            <div className="text-sm font-semibold mb-1">🏪 Nuevos Negocios</div>
                            <div className="text-xs opacity-90">15 establecimientos recién inaugurados</div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-end">
                          <div className="text-xs opacity-75">
                            Enero 2025
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">GRATIS</div>
                            <div className="text-xs opacity-75">Edición Digital</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Páginas internas (efecto de profundidad) */}
                    <div className="absolute top-1 right-1 w-full h-full bg-white rounded-2xl -z-10 shadow-lg"></div>
                    <div className="absolute top-2 right-2 w-full h-full bg-gray-50 rounded-2xl -z-20 shadow-md"></div>
                  </div>

                  {/* Indicador de interacción */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/30 group-hover:bg-white/30 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Click para abrir
                    </div>
                  </div>
                </div>

                {/* Elementos flotantes decorativos - Solo en cliente */}
                {isClient && (
                  <>
                    <div className="absolute top-10 -right-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>

                    {/* Badge flotante de "Nuevo" */}
                    <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
                      ¡NUEVO!
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm">Explorar más</span>
              <ChevronRight className="h-5 w-5 rotate-90" />
            </div>
          </div>
        </section>

        {/* Resto del contenido */}
        <div className="space-y-12">
          

          {/* Anuncios Premium + Ofertas - Layout Responsive */}
          {(!adsLoading && !adsError && Array.isArray(premiumAds) && premiumAds.length > 0) || offerBusinesses.length > 0 ? (
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-50 rounded-3xl -m-4" />
              <div className="relative p-4 md:p-8">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="p-2 md:p-3 bg-primary/10 rounded-xl">
                    <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Anuncios Destacados</h2>
                </div>

                {/* Layout Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  
                  {/* Lado Izquierdo - Carousel de Anuncios Grandes */}
                  <div className="order-2 lg:order-1">
                    {!adsLoading && !adsError && Array.isArray(premiumAds) && premiumAds.length > 0 && (
                      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/50 border border-primary/10 shadow-lg w-full">
                        <PremiumAdsCarousel ads={premiumAds} />
                      </div>
                    )}
                  </div>

                  {/* Lado Derecho - Ofertas Especiales */}
                  <div className="order-1 lg:order-2 flex flex-col gap-4">
                    {/* Header de Ofertas */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Tag className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold">Ofertas Especiales</h3>
                      </div>
                      <button
                        className="text-primary hover:text-primary/80 text-xs md:text-sm font-semibold transition-colors group"
                        onClick={() => window.location.href = '/zona/pedregal/ofertas'}
                      >
                        Ver todas
                        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 inline ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Container de Ofertas - Responsive */}
                    <div className="flex-1">
                      {(!adsLoading && !adsError && Array.isArray(premiumAds) && premiumAds.length > 0) ? (
                        <div className="space-y-3 md:space-y-4">
                          {premiumAds.slice(0, 3).map((ad, index) => (
                            <div key={ad.id || index} className="bg-white/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
                              <div className="flex items-start gap-3 md:gap-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <img
                                    src={ad.logo_url || ad.image_url}
                                    alt={ad.brand || ad.title}
                                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-base md:text-lg text-foreground line-clamp-1 mb-1 md:mb-2">{ad.title}</h4>
                                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2 md:mb-3">{ad.description}</p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs bg-primary/10 text-primary px-2 md:px-3 py-1 rounded-full">
                                      {ad.brand || ad.category}
                                    </span>
                                    {ad.discount_text && (
                                      <span className="text-xs bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full">
                                        {ad.discount_text}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Placeholder si no hay anuncios
                        <div className="space-y-3 md:space-y-4">
                          {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-primary/10 shadow-lg animate-pulse">
                              <div className="flex items-start gap-3 md:gap-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-xl"></div>
                                <div className="flex-1 space-y-2 md:space-y-3">
                                  <div className="h-4 md:h-5 bg-gray-200 rounded w-3/4"></div>
                                  <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
                                  <div className="h-3 md:h-4 bg-gray-200 rounded w-2/3"></div>
                                  <div className="h-5 md:h-6 bg-gray-200 rounded w-1/3"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {/* Negocios Destacados */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl -m-4" />
            <div className="relative p-8">
              <BusinessList
                title="Negocios Destacados"
                icon={<Star className="h-6 w-6 text-primary" />}
                businesses={featuredBusinesses}
                viewAllHref="#"
              />
            </div>
          </section>
        </div>
    </div>
  );
}

// Componente para el Slider Vertical de Ofertas con Controles Manuales
function VerticalOfferSlider({ offers }: { offers: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate ofertas cada 6 segundos (más tiempo para leer)
  useEffect(() => {
    if (isPaused || isHovered || isAnimating) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [offers.length, isAnimating, isPaused, isHovered]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const visibleOffers = [
    offers[currentIndex],
    offers[(currentIndex + 1) % offers.length],
    offers[(currentIndex + 2) % offers.length]
  ];

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Controles Verticales - Siempre visibles a la derecha */}
      <div className="absolute -right-14 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {/* Botón Arriba */}
        <button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="w-10 h-10 bg-white/90 hover:bg-white border border-gray-300/60 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed group backdrop-blur-sm"
          title="Oferta anterior"
        >
          <ChevronLeft className="h-5 w-5 text-gray-500 rotate-90 group-hover:text-primary group-disabled:text-gray-300" />
        </button>

        {/* Botón Play/Pause */}
        <button
          onClick={togglePause}
          className="w-10 h-10 bg-white/90 hover:bg-white border border-gray-300/60 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 group backdrop-blur-sm"
          title={isPaused ? "Reproducir automático" : "Pausar automático"}
        >
          {isPaused ? (
            <div className="w-0 h-0 border-l-[7px] border-l-gray-500 border-y-[5px] border-y-transparent ml-0.5 group-hover:border-l-primary" />
          ) : (
            <div className="flex gap-0.5">
              <div className="w-1.5 h-4 bg-gray-500 group-hover:bg-primary rounded-sm"></div>
              <div className="w-1.5 h-4 bg-gray-500 group-hover:bg-primary rounded-sm"></div>
            </div>
          )}
        </button>

        {/* Botón Abajo */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="w-10 h-10 bg-white/90 hover:bg-white border border-gray-300/60 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed group backdrop-blur-sm"
          title="Siguiente oferta"
        >
          <ChevronRight className="h-5 w-5 text-gray-500 rotate-90 group-hover:text-primary group-disabled:text-gray-300" />
        </button>
      </div>

      {/* Stack de Ofertas */}
      <div className="space-y-4 h-full">
        {visibleOffers.map((ad, index) => (
          <div
            key={`${ad.id}-${currentIndex}-${index}`}
            className={`bg-white/50 rounded-2xl p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer ${
              index === 0 ? 'scale-100 opacity-100' :
              index === 1 ? 'scale-95 opacity-80' :
              'scale-90 opacity-60'
            } ${isAnimating ? 'transform-gpu' : ''}`}
            style={{
              transform: `translateY(${index * 4}px) scale(${1 - index * 0.05})`,
              zIndex: 3 - index
            }}
            onClick={() => {
              if (index === 0) {
                // Click en la oferta principal - abrir enlace
                if (ad.link_url) {
                  window.open(ad.link_url, '_blank', 'noopener,noreferrer');
                }
              } else {
                // Click en ofertas secundarias - llevarlas al frente
                const targetIndex = (currentIndex + index) % offers.length;
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(targetIndex);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }
            }}
          >
            <div className="flex items-start gap-4 h-full">
              <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src={ad.logo_url || ad.image_url}
                  alt={ad.brand || ad.title}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className="font-semibold text-lg text-foreground line-clamp-1 mb-2">{ad.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{ad.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {ad.brand || ad.category}
                  </span>
                  {ad.discount_text && (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {ad.discount_text}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Indicador de oferta principal */}
            {index === 0 && (
              <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Destacada
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Estado de pausa visual */}
      {(isPaused || isHovered) && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          {isPaused ? 'Pausado' : 'Pausa automática'}
        </div>
      )}
    </div>
  );
}
