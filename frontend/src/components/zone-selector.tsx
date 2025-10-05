"use client";

import { useState } from "react";
import { MapPin, ChevronDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Zone {
  id: string;
  name: string;
  slug: string;
  isAvailable: boolean;
}

interface ZoneSelectorProps {
  selectedZone: string;
  onZoneChange: (zone: string) => void;
}

// Zonas disponibles (por ahora solo El Pedregal)
const zones: Zone[] = [
  { id: "pedregal", name: "El Pedregal", slug: "pedregal", isAvailable: true },
  { id: "condesa", name: "La Condesa", slug: "condesa", isAvailable: false },
  { id: "roma", name: "La Roma", slug: "roma", isAvailable: false },
  { id: "polanco", name: "Polanco", slug: "polanco", isAvailable: false },
  { id: "coyoacan", name: "Coyoacán", slug: "coyoacan", isAvailable: false },
  { id: "santa_fe", name: "Santa Fe", slug: "santa-fe", isAvailable: false },
];

interface ZoneSelectorProps {
  selectedZone: string;
  onZoneChange: (zone: string) => void;
  variant?: "default" | "compact";
}

export function ZoneSelector({ selectedZone, onZoneChange, variant = "default" }: ZoneSelectorProps) {
  const currentZone = zones.find(zone => zone.slug === selectedZone);

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 px-2 text-xs bg-white border-primary/20 hover:bg-primary/5 rounded-full"
          >
            <MapPin className="h-3 w-3 mr-1 text-primary" />
            {currentZone?.name || "El Pedregal"}
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {zones.map(zone => (
            <DropdownMenuItem 
              key={zone.id}
              onClick={() => zone.isAvailable && onZoneChange(zone.slug)}
              disabled={!zone.isAvailable}
              className="flex items-center justify-between"
            >
              <span className={zone.isAvailable ? "text-foreground" : "text-muted-foreground"}>
                {zone.name}
              </span>
              {zone.isAvailable ? (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  Disponible
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Próximamente
                </Badge>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border">
        <MapPin className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">Explorando:</span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-auto p-0 font-semibold text-primary hover:text-primary/80 hover:bg-transparent"
            >
              {currentZone?.name || "El Pedregal"}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            {zones.map(zone => (
              <DropdownMenuItem 
                key={zone.id}
                onClick={() => zone.isAvailable && onZoneChange(zone.slug)}
                disabled={!zone.isAvailable}
                className="flex items-center justify-between"
              >
                <span className={zone.isAvailable ? "text-foreground" : "text-muted-foreground"}>
                  {zone.name}
                </span>
                {zone.isAvailable ? (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    Disponible
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Próximamente
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
