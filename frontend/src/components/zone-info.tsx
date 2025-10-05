"use client";

import { MapPin, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ZoneInfoProps {
  zoneName: string;
  businessCount?: number;
  featuredCount?: number;
}

export function ZoneInfo({ zoneName, businessCount = 0, featuredCount = 0 }: ZoneInfoProps) {
  return (
    <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary mb-1">
              Explorando {zoneName}
            </h3>
            <p className="text-muted-foreground">
              Descubre los mejores negocios y servicios en tu zona
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{businessCount} negocios</span>
            </div>
            {featuredCount > 0 && (
              <div className="flex items-center gap-1 text-primary">
                <Star className="h-4 w-4" />
                <span>{featuredCount} destacados</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
