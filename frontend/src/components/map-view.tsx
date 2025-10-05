import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function MapView() {
  return (
    <Card className="sticky top-40 h-[calc(100vh-12rem)] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">Vista de Mapa</CardTitle>
            <MapPin className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="h-full p-0 relative">
            <Image 
                src="https://picsum.photos/800/1000"
                alt="Map view of properties"
                fill
                className="object-cover"
                data-ai-hint="city map"
            />
            <div className="absolute inset-0 bg-white/20 flex items-center justify-center p-4">
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg text-center shadow-lg border">
                    <h3 className="font-headline text-lg font-semibold">Función de mapa próximamente</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                        La visualización de mapa interactivo estará disponible en una futura actualización.
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
