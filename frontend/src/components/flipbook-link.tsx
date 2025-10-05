"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ExternalLink, Star } from "lucide-react";

interface FlipbookLinkProps {
  className?: string;
  variant?: "card" | "button" | "banner";
}

export function FlipbookLink({ className = "", variant = "card" }: FlipbookLinkProps) {
  const handleFlipbookClick = () => {
    // Aquí puedes agregar la URL del flipbook cuando esté disponible
    const flipbookUrl = "https://example.com/flipbook"; // Reemplazar con la URL real
    window.open(flipbookUrl, '_blank', 'noopener,noreferrer');
  };

  if (variant === "button") {
    return (
      <Button 
        onClick={handleFlipbookClick}
        className={`bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${className}`}
      >
        <BookOpen className="h-4 w-4 mr-2" />
        Ver Revista Digital
        <ExternalLink className="h-4 w-4 ml-2" />
      </Button>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200/60 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden ${className}`} onClick={handleFlipbookClick}>
        {/* Patrón sutil de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #64748b 2px, transparent 2px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-slate-800">Revista Digital</h3>
                <div className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                  Exclusiva
                </div>
              </div>
              <p className="text-slate-600 text-base leading-relaxed">
                Explora nuestra revista digital con las mejores ofertas y contenido exclusivo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            </div>
            <div className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-200">
              <ExternalLink className="h-5 w-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
        
        {/* Efecto de brillo sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    );
  }

  // Variant "card" (por defecto)
  return (
    <Card className={`hover:shadow-xl transition-all duration-300 cursor-pointer group border border-slate-200/60 bg-gradient-to-br from-slate-50/50 to-white ${className}`} onClick={handleFlipbookClick}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl text-white shadow-lg">
            <BookOpen className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-1">Revista Digital</h3>
            <p className="text-slate-600 mb-3 leading-relaxed">Descubre ofertas exclusivas y contenido especial en nuestra revista digital interactiva</p>
            <div className="flex items-center gap-2 text-slate-700 font-semibold group-hover:gap-3 transition-all">
              <span>Ver revista</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
