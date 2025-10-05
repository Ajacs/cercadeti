"use client";

import { useState } from 'react';
import { StrapiBusinessList, FeaturedBusinesses } from '@/components/strapi-business-list';
import { BusinessCard } from '@/components/business-card';
import { useBusinesses, useFeaturedBusinesses } from '@/hooks/use-strapi-businesses';
import { useCategories } from '@/hooks/use-strapi-categories';
import { useZones } from '@/hooks/use-strapi-zones';
import { strapiAdapter } from '@/lib/strapi-adapter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, Database, Wifi, WifiOff } from 'lucide-react';

export default function DemoPage() {
  const [strapiStatus, setStrapiStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [selectedDemo, setSelectedDemo] = useState('full-list');

  // Hooks para datos
  const { businesses, loading: businessesLoading, error: businessesError } = useBusinesses();
  const { businesses: featuredBusinesses, loading: featuredLoading } = useFeaturedBusinesses();
  const { categories, loading: categoriesLoading } = useCategories();
  const { zones, loading: zonesLoading } = useZones();

  // Verificar estado de Strapi
  const checkStrapiStatus = async () => {
    setStrapiStatus('checking');
    const isAvailable = await strapiAdapter.checkAvailability();
    setStrapiStatus(isAvailable ? 'available' : 'unavailable');
  };

  // Verificar estado al cargar
  useState(() => {
    checkStrapiStatus();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🚀 Demo de Integración Strapi</h1>
          <p className="text-lg text-gray-600 mb-6">
            Demostración completa de la integración entre el backend (Strapi) y el frontend (Next.js)
          </p>
          
          {/* Estado de Strapi */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Database className="h-5 w-5" />
                Estado de la Conexión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                {strapiStatus === 'checking' && (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Verificando conexión...</span>
                  </>
                )}
                {strapiStatus === 'available' && (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600">Strapi conectado - Usando datos reales</span>
                  </>
                )}
                {strapiStatus === 'unavailable' && (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-600">Strapi no disponible - Usando datos mock</span>
                  </>
                )}
                <Button onClick={checkStrapiStatus} variant="outline" size="sm">
                  Verificar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas informativas */}
        {strapiStatus === 'unavailable' && (
          <Alert className="mb-6">
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              <strong>Modo de desarrollo:</strong> Strapi no está disponible, por lo que se están usando datos mock para la demostración.
              Para usar datos reales, asegúrate de que Strapi esté ejecutándose en <code>http://localhost:1337</code>.
            </AlertDescription>
          </Alert>
        )}

        {strapiStatus === 'available' && (
          <Alert className="mb-6">
            <Wifi className="h-4 w-4" />
            <AlertDescription>
              <strong>Conexión exitosa:</strong> Strapi está disponible y se están cargando datos reales desde la API.
            </AlertDescription>
          </Alert>
        )}

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Negocios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businesses.length}</div>
              <p className="text-xs text-muted-foreground">
                {businessesLoading ? 'Cargando...' : 'Total disponibles'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Destacados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredBusinesses.length}</div>
              <p className="text-xs text-muted-foreground">
                {featuredLoading ? 'Cargando...' : 'Negocios destacados'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">
                {categoriesLoading ? 'Cargando...' : 'Categorías activas'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Zonas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{zones.length}</div>
              <p className="text-xs text-muted-foreground">
                {zonesLoading ? 'Cargando...' : 'Zonas disponibles'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de demostración */}
        <Tabs value={selectedDemo} onValueChange={setSelectedDemo} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="full-list">Lista Completa</TabsTrigger>
            <TabsTrigger value="featured">Destacados</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="zones">Zonas</TabsTrigger>
          </TabsList>

          <TabsContent value="full-list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista Completa de Negocios</CardTitle>
                <CardDescription>
                  Componente completo con filtros, búsqueda y paginación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StrapiBusinessList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Negocios Destacados</CardTitle>
                <CardDescription>
                  Solo negocios marcados como destacados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FeaturedBusinesses />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Categorías Disponibles</CardTitle>
                <CardDescription>
                  Todas las categorías de negocios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.slug}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Zonas Geográficas</CardTitle>
                <CardDescription>
                  Todas las zonas donde operan los negocios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {zones.map((zone) => (
                    <div
                      key={zone.id}
                      className="p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="font-medium text-lg">{zone.name}</div>
                      <div className="text-sm text-gray-500 mb-2">{zone.slug}</div>
                      {zone.description && (
                        <div className="text-sm text-gray-600">{zone.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Información técnica */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Información Técnica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Características Implementadas</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>✅ Cliente Strapi con fallback a datos mock</li>
                  <li>✅ Hooks personalizados para cada tipo de contenido</li>
                  <li>✅ Componentes reutilizables</li>
                  <li>✅ Sistema de filtros y búsqueda</li>
                  <li>✅ Manejo de estados de carga y error</li>
                  <li>✅ Tipos TypeScript completos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Próximos Pasos</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>🔄 Formularios de registro de negocios</li>
                  <li>🔄 Sistema de autenticación</li>
                  <li>🔄 Panel de administración</li>
                  <li>🔄 Sistema de pagos</li>
                  <li>🔄 Notificaciones push</li>
                  <li>🔄 Analytics y métricas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
