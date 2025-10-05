'use client';

import { useState, useRef, useEffect } from 'react';
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
  MapPin
} from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';

interface GacetaPage {
  id: number;
  content: string;
  image?: string;
  title?: string;
  description?: string;
}

interface GacetaFlipbookProps {
  zone: string;
  pages: GacetaPage[];
  title?: string;
  date?: string;
  description?: string;
}

export function GacetaFlipbook({ 
  zone, 
  pages, 
  title = "Gaceta Publicitaria",
  date = new Date().toLocaleDateString('es-ES'),
  description = "Descubre las mejores ofertas y promociones de tu zona"
}: GacetaFlipbookProps) {
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
        
        <div className="flex-1 text-gray-600 text-sm leading-relaxed">
          {page.content}
        </div>
        
        {page.description && (
          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <p className="text-orange-700 text-sm font-medium">
              {page.description}
            </p>
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
                <p className="text-sm opacity-75">{description}</p>
                <div className="mt-6 p-3 bg-white/20 rounded-lg">
                  <p className="text-sm">{date}</p>
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
                <p className="text-sm opacity-75">
                  Visita nuestros negocios locales y descubre las mejores ofertas
                </p>
              </div>
            </div>
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}


