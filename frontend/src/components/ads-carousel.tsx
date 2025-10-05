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
  TrendingUp
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  logo: string;
  brand: string;
  category: string;
  discount?: string;
  validUntil?: string;
  link: string;
  featured?: boolean;
  zone?: string;
  type: 'banner' | 'card' | 'spotlight';
}

interface AdsCarouselProps {
  ads: Ad[];
  zone?: string;
  title?: string;
  showTitle?: boolean;
}

export function AdsCarousel({ 
  ads, 
  zone, 
  title = "Anuncios Destacados",
  showTitle = true 
}: AdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtrar anuncios por zona si se especifica
  const filteredAds = zone ? ads.filter(ad => !ad.zone || ad.zone === zone) : ads;

  const handleAdClick = (ad: Ad) => {
    // Aquí podrías agregar analytics
    window.open(ad.link, '_blank', 'noopener,noreferrer');
  };

  const renderAdCard = (ad: Ad) => (
    <Card 
      key={ad.id}
      className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
      onClick={() => handleAdClick(ad)}
    >
      <div className="relative">
        {/* Imagen principal */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={ad.image} 
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges superpuestos */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {ad.featured && (
              <Badge className="bg-primary text-white border-0 shadow-lg">
                <Star className="h-3 w-3 mr-1" />
                Destacado
              </Badge>
            )}
            {ad.discount && (
              <Badge className="bg-green-500 text-white border-0 shadow-lg">
                <TrendingUp className="h-3 w-3 mr-1" />
                {ad.discount}
              </Badge>
            )}
          </div>

          {/* Logo de la marca */}
          <div className="absolute top-3 right-3">
            <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
              <img 
                src={ad.logo} 
                alt={ad.brand}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Información en la parte inferior */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
              {ad.title}
            </h3>
            <p className="text-white/90 text-sm line-clamp-2">
              {ad.description}
            </p>
          </div>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {ad.category}
            </Badge>
            {ad.zone && (
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {ad.zone}
              </div>
            )}
          </div>

          {ad.validUntil && (
            <div className="flex items-center text-xs text-orange-600 mb-3">
              <Clock className="h-3 w-3 mr-1" />
              Válido hasta {ad.validUntil}
            </div>
          )}

          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            size="sm"
          >
            Ver Oferta
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderBannerAd = (ad: Ad) => (
    <div 
      key={ad.id}
      className="relative h-64 bg-gradient-to-r from-primary/10 to-orange-600/10 rounded-xl overflow-hidden cursor-pointer group"
      onClick={() => handleAdClick(ad)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-600/20" />
      
      <div className="relative h-full flex items-center p-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={ad.logo} 
              alt={ad.brand}
              className="w-12 h-12 object-contain"
            />
            <Badge className="bg-primary text-white">
              {ad.brand}
            </Badge>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {ad.title}
          </h2>
          <p className="text-gray-600 mb-4 max-w-md">
            {ad.description}
          </p>
          
          {ad.discount && (
            <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              {ad.discount}
            </div>
          )}
          
          <Button className="bg-primary hover:bg-primary/90 text-white group-hover:scale-105 transition-transform">
            Descubrir Oferta
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="hidden md:block">
          <img 
            src={ad.image} 
            alt={ad.title}
            className="w-48 h-48 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );

  if (filteredAds.length === 0) return null;

  return (
    <div className="w-full">
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {title}
          </h2>
          {zone && (
            <p className="text-gray-600">
              Ofertas especiales en <span className="text-primary font-semibold">{zone}</span>
            </p>
          )}
        </div>
      )}

      {/* Carousel para anuncios tipo card */}
      <div className="mb-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom',
          }}
          autoplay={{
            delay: 5000,
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
          className="ads-swiper"
        >
          {filteredAds.filter(ad => ad.type === 'card').map((ad) => (
            <SwiperSlide key={ad.id}>
              {renderAdCard(ad)}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones de navegación personalizados */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="swiper-button-prev-custom bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="swiper-button-next-custom bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Banners destacados */}
      {filteredAds.filter(ad => ad.type === 'banner').length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 text-center">
            Ofertas Destacadas
          </h3>
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            className="banner-swiper"
          >
            {filteredAds.filter(ad => ad.type === 'banner').map((ad) => (
              <SwiperSlide key={ad.id}>
                {renderBannerAd(ad)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}


