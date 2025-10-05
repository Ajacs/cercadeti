'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  Award,
  Sparkles,
  Target,
  Users,
  Zap
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import type { PremiumAd } from '@/lib/supabase';

interface PremiumAdsSectionProps {
  ads: PremiumAd[];
  zone?: string;
  title?: string;
  showTitle?: boolean;
}

export function PremiumAdsSection({ 
  ads, 
  zone, 
  title = "",
  showTitle = true 
}: PremiumAdsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Validar que ads sea un array válido
  if (!Array.isArray(ads)) {
    return null;
  }

  // Filtrar anuncios por zona si se especifica
  const filteredAds = zone ? ads.filter(ad => !ad.zone || ad.zone?.slug === zone) : ads;

  const handleAdClick = (ad: PremiumAd) => {
    // Aquí podrías agregar analytics
    window.open(ad.link_url, '_blank', 'noopener,noreferrer');
  };

  const renderHeroAd = (ad: PremiumAd) => (
    <div 
      key={ad.id}
      className="relative h-80 md:h-96 bg-gradient-to-br from-primary via-primary/90 to-orange-600 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
      onClick={() => handleAdClick(ad)}
    >
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Gradiente overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
      
      <div className="relative h-full flex flex-col md:flex-row items-center p-8 md:p-12">
        <div className="flex-1 text-white">
          {/* Header con logo y badge */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center p-3">
              <img 
                src={ad.logo_url} 
                alt={ad.brand}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Award className="h-3 w-3 mr-1" />
                {ad.brand}
              </Badge>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="h-4 w-4 text-yellow-300" />
              </div>
            </div>
          </div>
          
          {/* Contenido principal */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {ad.title}
          </h2>
          <p className="text-white/90 mb-6 text-lg max-w-lg leading-relaxed">
            {ad.description}
          </p>
          
          {/* Highlights */}
          {ad.highlights && (
            <div className="flex flex-wrap gap-2 mb-6">
              {ad.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Target className="h-3 w-3 mr-1" />
                  {highlight}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Stats */}
          {(ad.stats_views > 0 || ad.stats_clicks > 0) && (
            <div className="flex gap-6 mb-6">
              {ad.stats_views > 0 && (
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{ad.stats_views.toLocaleString()} vistas</span>
                </div>
              )}
              {ad.stats_clicks > 0 && (
                <div className="flex items-center gap-2 text-white/80">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">{ad.stats_clicks.toLocaleString()} clicks</span>
                </div>
              )}
            </div>
          )}
          
          {/* CTA Button */}
          <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3 rounded-xl font-semibold shadow-xl group-hover:scale-105 transition-all duration-300">
            Descubrir Oferta
            <ExternalLink className="h-5 w-5 ml-2" />
          </Button>
        </div>
        
        {/* Imagen del lado derecho */}
        <div className="hidden md:block ml-8">
          <div className="relative">
            <img 
              src={ad.image_url} 
              alt={ad.title}
              className="w-64 h-64 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
            {/* Badge de descuento flotante */}
            {ad.discount_text && (
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {ad.discount_text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPremiumCard = (ad: PremiumAd) => (
    <Card 
      key={ad.id}
      className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white rounded-2xl"
      onClick={() => handleAdClick(ad)}
    >
      <div className="relative">
        {/* Imagen principal */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={ad.image} 
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Badges superpuestos */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {ad.is_featured && (
              <Badge className="bg-primary text-white border-0 shadow-lg backdrop-blur-sm">
                <Star className="h-3 w-3 mr-1" />
                Destacado
              </Badge>
            )}
            {ad.discount_text && (
              <Badge className="bg-green-500 text-white border-0 shadow-lg backdrop-blur-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                {ad.discount_text}
              </Badge>
            )}
          </div>

          {/* Logo de la marca */}
          <div className="absolute top-4 right-4">
            <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center p-3">
              <img 
                src={ad.logo_url} 
                alt={ad.brand}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Información en la parte inferior */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-xl mb-2 line-clamp-1">
              {ad.title}
            </h3>
            <p className="text-white/90 text-sm line-clamp-2">
              {ad.description}
            </p>
          </div>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-xs font-medium">
              {ad.category}
            </Badge>
            {ad.zone && typeof ad.zone === 'object' && ad.zone.name && (
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {ad.zone.name}
              </div>
            )}
          </div>

          {/* Highlights */}
          {ad.highlights && (
            <div className="flex flex-wrap gap-2 mb-4">
              {ad.highlights.slice(0, 2).map((highlight, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          )}

          {ad.validUntil && (
            <div className="flex items-center text-xs text-orange-600 mb-4">
              <Clock className="h-3 w-3 mr-1" />
              Válido hasta {ad.validUntil}
            </div>
          )}

          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            Ver Oferta
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );

  if (filteredAds.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {zone && (
            <p className="text-gray-600 text-lg">
              Ofertas exclusivas en <span className="text-primary font-semibold">{zone}</span>
            </p>
          )}
        </div>
      )}

      {/* Hero Banner */}
      {(() => {
        const heroAds = filteredAds.filter(ad => ad.ad_type === 'hero');
        return heroAds.length > 0;
      })() && (
        <div className="mb-12">
          <Swiper
            modules={[EffectFade, Autoplay, Navigation]}
            effect="fade"
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.hero-next',
              prevEl: '.hero-prev',
            }}
            className="hero-swiper rounded-2xl"
          >
            {(() => {
              const heroAds = filteredAds.filter(ad => ad.ad_type === 'hero');
              return heroAds;
            })().map((ad) => (
              <SwiperSlide key={ad.id}>
                {renderHeroAd(ad)}
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Botones de navegación del hero */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="hero-prev bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="hero-next bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Premium Cards */}
      {(() => {
        const premiumAds = filteredAds.filter(ad => ad.ad_type === 'premium');
        return premiumAds.length > 0;
      })() && (
        <div className="mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.premium-next',
              prevEl: '.premium-prev',
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-premium',
              bulletActiveClass: 'swiper-pagination-bullet-active-premium',
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="premium-swiper"
          >
            {(() => {
              const premiumAds = filteredAds.filter(ad => ad.ad_type === 'premium');
              return premiumAds;
            })().map((ad) => (
              <SwiperSlide key={ad.id}>
                {renderPremiumCard(ad)}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación de premium cards */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="premium-prev bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="premium-next bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Spotlight Ads */}
      {(() => {
        const spotlightAds = filteredAds.filter(ad => ad.ad_type === 'spotlight');
        return spotlightAds.length > 0;
      })() && (
        <div className="mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.spotlight-next',
              prevEl: '.spotlight-prev',
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-spotlight',
              bulletActiveClass: 'swiper-pagination-bullet-active-spotlight',
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="spotlight-swiper"
          >
            {filteredAds.filter(ad => ad.ad_type === 'spotlight').map((ad) => (
              <SwiperSlide key={ad.id}>
                {renderPremiumCard(ad)}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación de spotlight ads */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="spotlight-prev bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="spotlight-next bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
