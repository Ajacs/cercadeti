'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Users, TrendingUp } from 'lucide-react';

interface ZoneHeroProps {
  zoneName: string;
  businessCount: number;
  featuredBusinesses: any[];
  zoneStats?: {
    totalBusinesses: number;
    averageRating: number;
    popularCategories: string[];
    lastUpdated: string;
  };
}

export function ZoneHero({ 
  zoneName, 
  businessCount, 
  featuredBusinesses,
  zoneStats 
}: ZoneHeroProps) {
  return (
    <div className="relative">
      {/* Banner principal de la zona */}
      <div className="bg-gradient-to-r from-primary via-orange-500 to-orange-600 text-white p-8 rounded-2xl mb-8 relative overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-6 left-12 w-12 h-12 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 right-16 w-8 h-8 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <MapPin className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{zoneName}</h1>
              <p className="text-xl opacity-90">
                {businessCount} {businessCount === 1 ? 'negocio disponible' : 'negocios disponibles'}
              </p>
            </div>
          </div>
          
          {zoneStats && (
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">{zoneStats.averageRating.toFixed(1)}</span>
                <span className="opacity-75">calificación promedio</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">{zoneStats.totalBusinesses}</span>
                <span className="opacity-75">negocios activos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Actualizado</span>
                <span className="opacity-75">{zoneStats.lastUpdated}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 font-semibold"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Ver Negocios Destacados
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Explorar Categorías
            </Button>
          </div>
        </div>
      </div>

      {/* Negocios destacados de la zona */}
      {featuredBusinesses.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Negocios Destacados en {zoneName}
            </h2>
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.slice(0, 3).map((business) => (
              <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Destacado
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{business.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {business.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{business.category.name}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
