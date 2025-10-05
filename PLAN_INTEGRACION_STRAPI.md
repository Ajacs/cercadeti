# Plan de Integración Completa con Strapi

## Estado Actual

### Frontend ✅
- Next.js 15.5.4 corriendo en `http://localhost:3002`
- UI completamente implementada con todos los componentes
- Types TypeScript completos en `/src/types/index.ts`
- Cliente Strapi configurado en `/src/lib/strapi.ts`
- Adaptador con fallback a mocks en `/src/lib/strapi-adapter.ts`
- Hooks preparados para consumir datos
- Página de demo en `/demo` para validar conexión

### Backend ⚠️
- Strapi 5.25.0 corriendo en `http://localhost:1337`
- **PROBLEMA**: No tiene Content Types definidos
- **SÍNTOMA**: Todas las peticiones a `/api/businesses` retornan HTTP 400
- **CAUSA**: Falta crear la estructura de datos en Strapi

## Objetivo

Lograr **100% de conexión** entre frontend y Strapi, eliminando el uso de datos mock.

---

## FASE 1: Crear Content Types en Strapi Backend

### 1.1 Business Plans

**Archivo**: `/Users/adderlyjaureguicampos/code/cercadeti/backend/src/api/business-plan/content-types/business-plan/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "business_plans",
  "info": {
    "singularName": "business-plan",
    "pluralName": "business-plans",
    "displayName": "Business Plan",
    "description": "Planes de suscripción para negocios"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "price": {
      "type": "decimal",
      "required": true,
      "default": 0
    },
    "currency": {
      "type": "string",
      "default": "MXN"
    },
    "features": {
      "type": "json"
    },
    "duration_days": {
      "type": "integer",
      "required": true,
      "default": 30
    },
    "max_ads": {
      "type": "integer",
      "default": 0
    },
    "max_offers": {
      "type": "integer",
      "default": 0
    },
    "active": {
      "type": "boolean",
      "default": true
    },
    "sort_order": {
      "type": "integer",
      "default": 0
    },
    "businesses": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::business.business",
      "mappedBy": "plan"
    }
  }
}
```

### 1.2 Zones

**Archivo**: `/Users/adderlyjaureguicampos/code/cercadeti/backend/src/api/zone/content-types/zone/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "zones",
  "info": {
    "singularName": "zone",
    "pluralName": "zones",
    "displayName": "Zone",
    "description": "Zonas geográficas donde operan los negocios"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "is_active": {
      "type": "boolean",
      "default": true
    },
    "sort_order": {
      "type": "integer",
      "default": 0
    },
    "businesses": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::business.business",
      "mappedBy": "zone"
    }
  }
}
```

### 1.3 Categories

**Archivo**: `/Users/adderlyjaureguicampos/code/cercadeti/backend/src/api/category/content-types/category/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category",
    "description": "Categorías de negocios"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "icon": {
      "type": "string"
    },
    "color": {
      "type": "string",
      "required": true,
      "default": "#000000"
    },
    "is_active": {
      "type": "boolean",
      "default": true
    },
    "sort_order": {
      "type": "integer",
      "default": 0
    },
    "businesses": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::business.business",
      "mappedBy": "category"
    }
  }
}
```

### 1.4 Businesses

**Archivo**: `/Users/adderlyjaureguicampos/code/cercadeti/backend/src/api/business/content-types/business/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "businesses",
  "info": {
    "singularName": "business",
    "pluralName": "businesses",
    "displayName": "Business",
    "description": "Negocios registrados en la plataforma"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "email": {
      "type": "email"
    },
    "phone": {
      "type": "string"
    },
    "website": {
      "type": "string"
    },
    "address": {
      "type": "text"
    },
    "main_image_url": {
      "type": "string"
    },
    "gallery_urls": {
      "type": "json"
    },
    "hours": {
      "type": "json"
    },
    "rating": {
      "type": "decimal",
      "default": 0,
      "min": 0,
      "max": 5
    },
    "review_count": {
      "type": "integer",
      "default": 0
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "offer": {
      "type": "boolean",
      "default": false
    },
    "offer_text": {
      "type": "string"
    },
    "is_active": {
      "type": "boolean",
      "default": true
    },
    "is_verified": {
      "type": "boolean",
      "default": false
    },
    "supports_delivery": {
      "type": "boolean",
      "default": false
    },
    "delivery_time": {
      "type": "string"
    },
    "delivery_fee": {
      "type": "decimal",
      "default": 0
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "businesses"
    },
    "zone": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::zone.zone",
      "inversedBy": "businesses"
    },
    "plan": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::business-plan.business-plan",
      "inversedBy": "businesses"
    },
    "offers": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::offer.offer",
      "mappedBy": "business"
    },
    "ads": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::ad.ad",
      "mappedBy": "business"
    }
  }
}
```

### 1.5 Offers

**Archivo**: `/Users/adderlyjaureguicampos/code/cercadeti/backend/src/api/offer/content-types/offer/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "offers",
  "info": {
    "singularName": "offer",
    "pluralName": "offers",
    "displayName": "Offer",
    "description": "Ofertas y promociones de negocios"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "discount_percentage": {
      "type": "integer",
      "min": 0,
      "max": 100
    },
    "discount_amount": {
      "type": "decimal"
    },
    "original_price": {
      "type": "decimal"
    },
    "offer_price": {
      "type": "decimal"
    },
    "currency": {
      "type": "string",
      "default": "MXN"
    },
    "image_url": {
      "type": "string"
    },
    "is_active": {
      "type": "boolean",
      "default": true
    },
    "valid_until": {
      "type": "datetime"
    },
    "terms_conditions": {
      "type": "text"
    },
    "business": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::business.business",
      "inversedBy": "offers"
    }
  }
}
```

### 1.6 Ads

**Archivo**: `/Users/adderlyjaureguicampos/code/cercadeti/backend/src/api/ad/content-types/ad/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "ads",
  "info": {
    "singularName": "ad",
    "pluralName": "ads",
    "displayName": "Ad",
    "description": "Anuncios publicitarios de negocios"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "image_url": {
      "type": "string"
    },
    "video_url": {
      "type": "string"
    },
    "link_url": {
      "type": "string"
    },
    "is_active": {
      "type": "boolean",
      "default": true
    },
    "valid_until": {
      "type": "datetime"
    },
    "priority": {
      "type": "integer",
      "default": 0
    },
    "click_count": {
      "type": "integer",
      "default": 0
    },
    "view_count": {
      "type": "integer",
      "default": 0
    },
    "business": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::business.business",
      "inversedBy": "ads"
    }
  }
}
```

---

## FASE 2: Configurar Permisos en Strapi

### 2.1 Permisos Públicos de Lectura

Para cada Content Type, configurar en el panel admin de Strapi:

**Ruta**: Settings → Users & Permissions plugin → Roles → Public

Habilitar las siguientes acciones para **Public**:

#### Business Plans
- ✅ find
- ✅ findOne

#### Zones
- ✅ find
- ✅ findOne

#### Categories
- ✅ find
- ✅ findOne

#### Businesses
- ✅ find
- ✅ findOne

#### Offers
- ✅ find
- ✅ findOne

#### Ads
- ✅ find
- ✅ findOne

### 2.2 Permisos Autenticados

Para usuarios autenticados, adicionalmente habilitar:
- ✅ create (para Businesses, Offers, Ads)
- ✅ update (solo sus propios registros)
- ✅ delete (solo sus propios registros)

---

## FASE 3: Poblar Datos de Prueba

### 3.1 Crear Categorías

```javascript
// Via Strapi Admin o API
[
  { name: 'Restaurantes', slug: 'restaurantes', color: '#FF6B6B', icon: 'utensils', is_active: true, sort_order: 1 },
  { name: 'Supermercados', slug: 'supermercados', color: '#4ECDC4', icon: 'shopping-cart', is_active: true, sort_order: 2 },
  { name: 'Servicios Hogar', slug: 'servicios-hogar', color: '#45B7D1', icon: 'home', is_active: true, sort_order: 3 },
  { name: 'Mascotas', slug: 'mascotas', color: '#96CEB4', icon: 'heart', is_active: true, sort_order: 4 },
  { name: 'Transporte', slug: 'transporte', color: '#FFEAA7', icon: 'car', is_active: true, sort_order: 5 },
  { name: 'Salud', slug: 'salud', color: '#DDA0DD', icon: 'cross', is_active: true, sort_order: 6 }
]
```

### 3.2 Crear Zonas

```javascript
[
  { name: 'Pedregal', slug: 'pedregal', description: 'Zona residencial de lujo', is_active: true, sort_order: 1 },
  { name: 'Condesa', slug: 'condesa', description: 'Colonia bohemia', is_active: true, sort_order: 2 },
  { name: 'Roma Norte', slug: 'roma-norte', description: 'Zona trendy', is_active: true, sort_order: 3 },
  { name: 'Polanco', slug: 'polanco', description: 'Distrito comercial', is_active: true, sort_order: 4 }
]
```

### 3.3 Crear Planes

```javascript
[
  {
    name: 'Básico',
    description: 'Plan básico para empezar',
    price: 0,
    currency: 'MXN',
    features: ['Perfil básico', 'Información de contacto'],
    duration_days: 365,
    max_ads: 0,
    max_offers: 1,
    active: true,
    sort_order: 1
  },
  {
    name: 'Premium',
    description: 'Plan premium con todas las funciones',
    price: 299,
    currency: 'MXN',
    features: ['Perfil destacado', 'Hasta 5 ofertas', 'Hasta 3 anuncios', 'Soporte prioritario'],
    duration_days: 30,
    max_ads: 3,
    max_offers: 5,
    active: true,
    sort_order: 2
  }
]
```

### 3.4 Crear Negocios de Ejemplo

```javascript
[
  {
    name: 'Sushi Central',
    description: 'El mejor sushi de la ciudad, con ingredientes frescos importados directamente de Japón.',
    email: 'info@sushicentral.com',
    phone: '+52 55 1234 5678',
    website: 'www.sushicentral.com',
    address: 'Av. Reforma 123, Col. Juárez, CDMX',
    main_image_url: 'https://picsum.photos/id/1060/600/400',
    rating: 4.8,
    review_count: 156,
    featured: true,
    offer: false,
    is_active: true,
    is_verified: true,
    supports_delivery: true,
    delivery_time: '25-35 min',
    delivery_fee: 25.00,
    category: 1, // ID de Restaurantes
    zone: 1 // ID de Pedregal
  },
  {
    name: 'Tacos "El Campeón"',
    description: 'Los tacos al pastor que te harán volver. Sabor auténtico y tradicional.',
    phone: '+52 55 3456 7890',
    address: 'Esquina Insurgentes y Viaducto, CDMX',
    main_image_url: 'https://picsum.photos/id/20/600/400',
    rating: 4.9,
    review_count: 89,
    featured: true,
    offer: true,
    offer_text: '2x1 en tacos al pastor los martes',
    is_active: true,
    is_verified: true,
    supports_delivery: true,
    delivery_time: '20-30 min',
    delivery_fee: 15.00,
    category: 1,
    zone: 3
  }
]
```

---

## FASE 4: Actualizar Hooks del Frontend

### 4.1 use-strapi-businesses.ts

Crear hook nuevo que use el adaptador:

```typescript
import { useState, useEffect } from 'react';
import { strapiAdapter } from '@/lib/strapi-adapter';
import { Business } from '@/types';

export function useBusinesses(params?: Record<string, any>) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);
        const response = await strapiAdapter.getBusinesses(params);
        setBusinesses(response.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching businesses:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, [JSON.stringify(params)]);

  return { businesses, loading, error };
}

export function useFeaturedBusinesses() {
  return useBusinesses({ featured: true });
}
```

### 4.2 use-strapi-categories.ts

```typescript
import { useState, useEffect } from 'react';
import { strapiAdapter } from '@/lib/strapi-adapter';
import { Category } from '@/types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await strapiAdapter.getCategories();
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
```

### 4.3 use-strapi-zones.ts

```typescript
import { useState, useEffect } from 'react';
import { strapiAdapter } from '@/lib/strapi-adapter';
import { Zone } from '@/types';

export function useZones() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchZones() {
      try {
        setLoading(true);
        const response = await strapiAdapter.getZones();
        setZones(response.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchZones();
  }, []);

  return { zones, loading, error };
}
```

---

## FASE 5: Eliminar Dependencia de Mocks

### 5.1 Actualizar .env.local

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### 5.2 Remover Código Mock de page.tsx

Cambiar imports de hooks mock a hooks de Strapi:

```typescript
// Antes
import { useBusinesses } from "@/hooks/use-businesses";

// Después
import { useBusinesses } from "@/hooks/use-strapi-businesses";
```

---

## FASE 6: Verificación y Testing

### 6.1 Checklist de Validación

- [ ] Strapi responde 200 OK en `/api/businesses`
- [ ] Frontend carga categorías desde Strapi
- [ ] Frontend carga zonas desde Strapi
- [ ] Frontend carga negocios desde Strapi
- [ ] Filtros funcionan correctamente
- [ ] Búsqueda funciona correctamente
- [ ] Página /demo muestra "Strapi conectado"
- [ ] No hay console.warnings de "usando datos mock"
- [ ] Build de producción exitoso
- [ ] No hay errores 400 en logs de Strapi

### 6.2 Comandos de Verificación

```bash
# Verificar que Strapi responde
curl http://localhost:1337/api/businesses?populate=*

# Verificar categorías
curl http://localhost:1337/api/categories

# Verificar zonas
curl http://localhost:1337/api/zones

# Verificar que frontend carga
curl http://localhost:3002
curl http://localhost:3002/demo
```

---

## FASE 7: Optimizaciones Post-Integración

### 7.1 Caching

Implementar caché en cliente con SWR o React Query:

```typescript
// Ejemplo con SWR
import useSWR from 'swr';

export function useBusinesses() {
  const { data, error, isLoading } = useSWR(
    '/api/businesses',
    () => strapiAdapter.getBusinesses()
  );

  return {
    businesses: data?.data ?? [],
    loading: isLoading,
    error
  };
}
```

### 7.2 Paginación

Implementar lazy loading en listas largas:

```typescript
export function useBusinesses(page = 1, pageSize = 10) {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize
  };

  return strapiAdapter.getBusinesses(params);
}
```

### 7.3 Optimistic Updates

Para operaciones de escritura (crear/editar negocios):

```typescript
async function updateBusiness(id: number, data: Partial<Business>) {
  // Actualizar UI inmediatamente
  setBusinesses(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));

  try {
    // Enviar a Strapi
    await StrapiAPI.businesses.update(id, { data });
  } catch (error) {
    // Revertir si falla
    fetchBusinesses();
  }
}
```

---

## Resumen de Archivos a Crear/Modificar

### Backend (Strapi)
1. `/backend/src/api/business-plan/content-types/business-plan/schema.json`
2. `/backend/src/api/zone/content-types/zone/schema.json`
3. `/backend/src/api/category/content-types/category/schema.json`
4. `/backend/src/api/business/content-types/business/schema.json`
5. `/backend/src/api/offer/content-types/offer/schema.json`
6. `/backend/src/api/ad/content-types/ad/schema.json`

### Frontend
1. `/frontend/src/hooks/use-strapi-businesses.ts` (nuevo)
2. `/frontend/src/hooks/use-strapi-categories.ts` (nuevo)
3. `/frontend/src/hooks/use-strapi-zones.ts` (nuevo)
4. `/frontend/src/app/page.tsx` (modificar imports)
5. `/frontend/.env.local` (modificar flag NEXT_PUBLIC_USE_MOCK_DATA)

---

## Comandos de Ejecución

```bash
# Terminal 1 - Backend
cd /Users/adderlyjaureguicampos/code/cercadeti/backend
npm run develop

# Terminal 2 - Frontend
cd /Users/adderlyjaureguicampos/code/cercadeti/frontend
npm run dev

# Abrir navegador
# http://localhost:3002 - Sitio principal
# http://localhost:3002/demo - Página de validación
# http://localhost:1337/admin - Panel admin de Strapi
```

---

## Próximos Pasos (Post-Integración)

1. **Autenticación**: Implementar registro/login de usuarios
2. **Panel de Administración**: Crear dashboard para negocios
3. **Sistema de Pagos**: Integrar Stripe/PayPal para planes premium
4. **Notificaciones**: Push notifications para ofertas nuevas
5. **Analytics**: Tracking de views y clicks en anuncios
6. **SEO**: Meta tags dinámicas para cada negocio
7. **PWA**: Service worker para funcionalidad offline
8. **Testing**: Unit tests y E2E tests con Jest y Playwright
9. **CI/CD**: Pipeline de deployment automático
10. **Monitoring**: Sentry para error tracking

---

## Notas Importantes

- **No usar populate=* en producción**: Especificar solo las relaciones necesarias para mejor performance
- **Validar datos**: Implementar validaciones tanto en frontend como backend
- **Rate Limiting**: Configurar límites de requests para prevenir abuso
- **Backup**: Configurar backups automáticos de la base de datos SQLite
- **CORS**: Verificar configuración de CORS en producción
- **HTTPS**: Usar HTTPS en producción (requerido para PWA)
- **Compresión**: Habilitar gzip/brotli en servidor de producción
- **CDN**: Considerar CDN para imágenes (Cloudinary, Uploadcare)

---

**Última actualización**: 2025-10-04
**Versión**: 1.0
**Autor**: Claude Code - Anthropic
