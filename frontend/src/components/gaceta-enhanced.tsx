'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut,
  BookOpen,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';

interface Advertiser {
  id: string;
  name: string;
  logo: string;
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  offer?: string;
  validUntil?: string;
  category: string;
  image: string;
  featured?: boolean;
}

interface GacetaPage {
  id: number;
  content: string;
  image?: string;
  title?: string;
  description?: string;
  advertisers?: Advertiser[];
}

interface GacetaEnhancedProps {
  zone: string;
  pages: GacetaPage[];
  title?: string;
  date?: string;
  description?: string;
}

export function GacetaEnhanced({ 
  zone, 
  pages, 
  title = "Gaceta Publicitaria",
  date = new Date().toLocaleDateString('es-ES'),
  description = "Descubre las mejores ofertas y promociones de tu zona"
}: GacetaEnhancedProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const flipBook = useRef<any>(null);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handlePrev = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipNext();
    }
  };

  // Renderizar anunciante
  const renderAdvertiser = (advertiser: Advertiser) => (
    <div key={advertiser.id} className="bg-white rounded-lg p-4 shadow-md border border-gray-100 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <img 
            src={advertiser.logo} 
            alt={advertiser.name}
            className="w-8 h-8 object-contain"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-800 text-sm truncate">
              {advertiser.name}
            </h4>
            {advertiser.featured && (
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
            )}
          </div>
          
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {advertiser.description}
          </p>
          
          {advertiser.offer && (
            <Badge className="bg-green-500 text-white text-xs mb-2">
              {advertiser.offer}
            </Badge>
          )}
          
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {advertiser.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{advertiser.phone}</span>
              </div>
            )}
            {advertiser.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span className="truncate">{advertiser.email}</span>
              </div>
            )}
            {advertiser.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span className="truncate">{advertiser.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar página individual
  const renderPage = (page: GacetaPage, isLeft: boolean = false) => (
    <div className="w-full h-full bg-white border border-gray-200 shadow-lg">
      <div className="p-6 h-full flex flex-col">
        {page.image && (
          <div className="mb-4">
            <img 
              src={page.image} 
              alt={page.title || `Página ${page.id}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
        
        {page.title && (
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {page.title}
          </h3>
        )}
        
        <div className="flex-1 text-gray-600 text-sm leading-relaxed mb-4">
          {page.content}
        </div>
        
        {page.description && (
          <div className="mb-4 p-3 bg-orange-50 rounded-lg">
            <p className="text-orange-700 text-sm font-medium">
              {page.description}
            </p>
          </div>
        )}

        {/* Anunciantes en esta página */}
        {page.advertisers && page.advertisers.length > 0 && (
          <div className="mt-auto">
            <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Anunciantes Destacados
            </h5>
            <div className="max-h-32 overflow-y-auto">
              {page.advertisers.map(renderAdvertiser)}
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <Badge variant="secondary" className="text-xs">
            {zone}
          </Badge>
          <span className="text-xs text-gray-400">
            {isLeft ? `${page.id - 1}` : page.id}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'w-full'}`}>
      {/* Header de la gaceta */}
      <div className="bg-gradient-to-r from-primary to-orange-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {zone}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {date}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="text-white hover:bg-white/20"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="text-white hover:bg-white/20"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="bg-gray-50 p-3 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        
        <div className="text-sm text-gray-600">
          Página <span className="font-medium">1</span> de <span className="font-medium">{pages.length}</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Flip Book */}
      <div className="flex justify-center p-4 bg-gray-100">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
          <HTMLFlipBook
            ref={flipBook}
            width={400}
            height={600}
            size="stretch"
            minWidth={300}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="shadow-2xl"
            style={{ margin: '0 auto' }}
          >
            {/* Página de portada */}
            <div className="w-full h-full bg-gradient-to-br from-primary to-orange-600 text-white flex flex-col items-center justify-center">
              <div className="text-center p-8">
                <BookOpen className="h-16 w-16 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="text-lg opacity-90 mb-4">{zone}</p>
                <p className="text-sm opacity-75 mb-6">{description}</p>
                <div className="p-3 bg-white/20 rounded-lg">
                  <p className="text-sm">{date}</p>
                </div>
                <div className="mt-4 text-xs opacity-75">
                  <p>Anuncios y promociones locales</p>
                </div>
              </div>
            </div>

            {/* Páginas del contenido */}
            {pages.map((page, index) => (
              <div key={page.id} className="flip-book-page">
                {renderPage(page, index % 2 === 0)}
              </div>
            ))}

            {/* Página final */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-2">¡Gracias por leer!</h2>
                <p className="text-lg opacity-90 mb-4">Explora más en {zone}</p>
                <p className="text-sm opacity-75 mb-4">
                  Visita nuestros negocios locales y descubre las mejores ofertas
                </p>
                <div className="flex items-center justify-center gap-2 text-xs opacity-75">
                  <ExternalLink className="h-4 w-4" />
                  <span>www.cercadeti.com</span>
                </div>
              </div>
            </div>
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}


