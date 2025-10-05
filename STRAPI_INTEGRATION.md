# 🚀 Integración de Strapi con CercaDeTi

Esta guía te explica cómo configurar y usar la integración completa de Strapi con el frontend de CercaDeTi.

## 📋 Tabla de Contenidos

- [Configuración Inicial](#configuración-inicial)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Datos de Prueba](#datos-de-prueba)
- [Integración Frontend](#integración-frontend)
- [Hooks Personalizados](#hooks-personalizados)
- [Componentes](#componentes)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

## 🛠️ Configuración Inicial

### 1. Configurar Variables de Entorno

Crea un archivo `.env.local` en el directorio `frontend`:

```bash
# Configuración de Strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_token_here

# Configuración de la aplicación
NEXT_PUBLIC_APP_NAME=CercaDeTi
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Instalar Dependencias

```bash
# En el directorio backend
cd backend
npm install

# En el directorio frontend
cd frontend
npm install axios  # Si no está instalado
```

### 3. Ejecutar Migraciones

```bash
cd backend
npm run migrate
```

### 4. Generar Datos de Prueba

```bash
cd backend
npm run seed
```

### 5. Iniciar Strapi

```bash
cd backend
npm run develop
```

Strapi estará disponible en `http://localhost:1337`

## 🗄️ Estructura de la Base de Datos

### Entidades Principales

1. **Business Plans** - Planes de suscripción
2. **Zones** - Zonas geográficas
3. **Categories** - Categorías de negocios
4. **Businesses** - Negocios registrados
5. **Offers** - Ofertas especiales
6. **Ads** - Anuncios publicitarios

### Relaciones

```
business_plans (1) ←→ (N) businesses
zones (1) ←→ (N) businesses
categories (1) ←→ (N) businesses
businesses (1) ←→ (N) offers
businesses (1) ←→ (N) ads
```

## 📊 Datos de Prueba

### Generar Datos

```bash
cd backend
npm run seed
```

Esto crea archivos JSON con datos de prueba en `backend/database/seed/`

### Poblar Strapi

```bash
cd backend
npm run populate
```

Este comando toma los datos generados y los inserta en Strapi.

## 🔌 Integración Frontend

### Cliente Strapi

El cliente principal está en `frontend/src/lib/strapi.ts`:

```typescript
import { StrapiAPI } from '@/lib/strapi';

// Obtener todos los negocios
const businesses = await StrapiAPI.businesses.getAll();

// Obtener negocios destacados
const featured = await StrapiAPI.businesses.getFeatured();

// Buscar negocios
const searchResults = await StrapiAPI.businesses.search('sushi');
```

### Hooks Personalizados

#### useBusinesses

```typescript
import { useBusinesses } from '@/hooks/use-strapi-businesses';

function BusinessList() {
  const { businesses, loading, error, search } = useBusinesses();

  const handleSearch = (query: string) => {
    search({ query });
  };

  return (
    <div>
      {loading && <div>Cargando...</div>}
      {error && <div>Error: {error}</div>}
      {businesses.map(business => (
        <div key={business.id}>{business.name}</div>
      ))}
    </div>
  );
}
```

#### useCategories

```typescript
import { useCategories } from '@/hooks/use-strapi-categories';

function CategoryFilter() {
  const { categories, loading } = useCategories();

  return (
    <div>
      {categories.map(category => (
        <button key={category.id}>{category.name}</button>
      ))}
    </div>
  );
}
```

#### useZones

```typescript
import { useZones } from '@/hooks/use-strapi-zones';

function ZoneSelector() {
  const { zones, loading } = useZones();

  return (
    <select>
      {zones.map(zone => (
        <option key={zone.id} value={zone.slug}>
          {zone.name}
        </option>
      ))}
    </select>
  );
}
```

## 🧩 Componentes

### StrapiBusinessList

Componente completo para mostrar negocios con filtros:

```typescript
import { StrapiBusinessList } from '@/components/strapi-business-list';

function HomePage() {
  return (
    <div>
      <h1>Negocios CercaDeTi</h1>
      <StrapiBusinessList />
    </div>
  );
}
```

### Variantes del Componente

```typescript
// Solo negocios destacados
<FeaturedBusinesses />

// Por categoría
<BusinessesByCategory categorySlug="restaurantes" />

// Por zona
<BusinessesByZone zoneSlug="pedregal" />
```

### BusinessCard Actualizado

El componente `BusinessCard` ya está actualizado para usar los nuevos tipos de Strapi:

```typescript
import { BusinessCard } from '@/components/business-card';
import type { Business } from '@/types';

function BusinessGrid({ businesses }: { businesses: Business[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {businesses.map(business => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}
```

## 📚 API Reference

### StrapiAPI.businesses

```typescript
// Obtener todos los negocios
getAll(params?: Record<string, any>)

// Obtener por ID
getById(id: number)

// Obtener por categoría
getByCategory(categoryId: number)

// Obtener por zona
getByZone(zoneId: number)

// Obtener destacados
getFeatured()

// Obtener activos
getActive()

// Buscar
search(query: string)
```

### StrapiAPI.categories

```typescript
// Obtener todas
getAll()

// Obtener por ID
getById(id: number)

// Obtener por slug
getBySlug(slug: string)

// Obtener activas
getActive()
```

### StrapiAPI.zones

```typescript
// Obtener todas
getAll()

// Obtener por ID
getById(id: number)

// Obtener por slug
getBySlug(slug: string)

// Obtener activas
getActive()
```

### StrapiAPI.offers

```typescript
// Obtener todas
getAll()

// Obtener por ID
getById(id: number)

// Obtener activas
getActive()

// Obtener por negocio
getByBusiness(businessId: number)
```

### StrapiAPI.ads

```typescript
// Obtener todos
getAll()

// Obtener por ID
getById(id: number)

// Obtener activos
getActive()

// Obtener por negocio
getByBusiness(businessId: number)
```

## 🔧 Troubleshooting

### Error de Conexión

Si tienes problemas de conexión con Strapi:

1. Verifica que Strapi esté ejecutándose:
   ```bash
   curl http://localhost:1337/api/businesses
   ```

2. Revisa las variables de entorno:
   ```bash
   echo $NEXT_PUBLIC_STRAPI_URL
   ```

3. Verifica los permisos de la API en el panel de Strapi

### Error de Tipos

Si hay errores de TypeScript:

1. Verifica que los tipos estén actualizados:
   ```bash
   npm run type-check
   ```

2. Reinicia el servidor de TypeScript en tu editor

### Datos No Aparecen

Si los datos no aparecen:

1. Verifica que las migraciones se ejecutaron:
   ```bash
   npm run migrate:status
   ```

2. Verifica que los datos se poblaron:
   ```bash
   npm run populate
   ```

3. Revisa la consola del navegador para errores de red

## 🚀 Próximos Pasos

1. **Autenticación**: Implementar login/registro de usuarios
2. **Formularios**: Crear formularios para que los negocios se registren
3. **Dashboard**: Panel de administración para negocios
4. **Pagos**: Integración con sistemas de pago
5. **Notificaciones**: Sistema de notificaciones push
6. **Analytics**: Métricas y estadísticas de uso

## 📞 Soporte

Si tienes problemas con la integración:

1. Revisa los logs de Strapi en la consola
2. Verifica la documentación de Strapi
3. Consulta los issues en el repositorio
4. Contacta al equipo de desarrollo

---

¡La integración está lista! Ahora puedes empezar a desarrollar funcionalidades específicas usando los datos de Strapi. 🎉
