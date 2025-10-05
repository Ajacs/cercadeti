/**
 * Adaptador para Strapi que funciona tanto con datos reales como con datos mock
 * Útil durante el desarrollo cuando Strapi no está disponible
 */

import { Business, Category, Zone, Offer, Ad } from '@/types';
import { StrapiAPI, StrapiUtils } from './strapi';

// Datos mock para desarrollo
const mockData = {
  categories: [
    { id: 1, name: 'Restaurantes', slug: 'restaurantes', color: '#FF6B6B', icon: 'utensils', is_active: true, sort_order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 2, name: 'Supermercados', slug: 'supermercados', color: '#4ECDC4', icon: 'shopping-cart', is_active: true, sort_order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 3, name: 'Servicios Hogar', slug: 'servicios-hogar', color: '#45B7D1', icon: 'home', is_active: true, sort_order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 4, name: 'Mascotas', slug: 'mascotas', color: '#96CEB4', icon: 'heart', is_active: true, sort_order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 5, name: 'Transporte', slug: 'transporte', color: '#FFEAA7', icon: 'car', is_active: true, sort_order: 5, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 6, name: 'Salud', slug: 'salud', color: '#DDA0DD', icon: 'cross', is_active: true, sort_order: 6, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ],
  
  zones: [
    { id: 1, name: 'Pedregal', slug: 'pedregal', description: 'Zona residencial de lujo', is_active: true, sort_order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 2, name: 'Condesa', slug: 'condesa', description: 'Colonia bohemia', is_active: true, sort_order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 3, name: 'Roma Norte', slug: 'roma-norte', description: 'Zona trendy', is_active: true, sort_order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 4, name: 'Polanco', slug: 'polanco', description: 'Distrito comercial', is_active: true, sort_order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ],

  businesses: [
    {
      id: 1,
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: { id: 1, name: 'Restaurantes', slug: 'restaurantes', color: '#FF6B6B' },
      zone: { id: 1, name: 'Pedregal', slug: 'pedregal' }
    },
    {
      id: 2,
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: { id: 1, name: 'Restaurantes', slug: 'restaurantes', color: '#FF6B6B' },
      zone: { id: 3, name: 'Roma Norte', slug: 'roma-norte' }
    },
    {
      id: 3,
      name: 'Mercado Express',
      description: 'Tus compras del súper en minutos. Frutas, verduras, carnes y más.',
      email: 'contacto@mercadoexpress.mx',
      phone: '+52 55 2345 6789',
      address: 'Calle Comercio 456, Col. Centro, CDMX',
      main_image_url: 'https://picsum.photos/id/1078/600/400',
      rating: 4.9,
      review_count: 234,
      featured: true,
      offer: true,
      offer_text: 'Descuento del 15% en tu primera compra',
      is_active: true,
      is_verified: true,
      supports_delivery: true,
      delivery_time: '15-20 min',
      delivery_fee: 30.00,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: { id: 2, name: 'Supermercados', slug: 'supermercados', color: '#4ECDC4' },
      zone: { id: 1, name: 'Pedregal', slug: 'pedregal' }
    },
    {
      id: 4,
      name: 'Plomería Veloz',
      description: 'Soluciones rápidas y eficientes para cualquier problema de plomería.',
      phone: '+52 55 4567 8901',
      rating: 4.7,
      review_count: 67,
      featured: false,
      offer: false,
      is_active: true,
      is_verified: true,
      supports_delivery: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: { id: 3, name: 'Servicios Hogar', slug: 'servicios-hogar', color: '#45B7D1' },
      zone: { id: 2, name: 'Condesa', slug: 'condesa' }
    },
    {
      id: 5,
      name: 'Pet Palace',
      description: 'Todo para tu mejor amigo. Alimento, juguetes y accesorios de la mejor calidad.',
      address: 'Av. Mascotas 789, Polanco',
      main_image_url: 'https://picsum.photos/id/257/600/400',
      rating: 4.8,
      review_count: 123,
      featured: false,
      offer: false,
      is_active: true,
      is_verified: true,
      supports_delivery: true,
      delivery_time: '30-45 min',
      delivery_fee: 20.00,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: { id: 4, name: 'Mascotas', slug: 'mascotas', color: '#96CEB4' },
      zone: { id: 4, name: 'Polanco', slug: 'polanco' }
    }
  ]
};

// Función para verificar si Strapi está disponible
async function isStrapiAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/businesses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Strapi está disponible si responde (incluso con 403 si no hay permisos)
    return response.status === 200 || response.status === 403;
  } catch (error) {
    return false;
  }
}

// Clase adaptadora que usa datos mock o Strapi según disponibilidad
export class StrapiAdapter {
  private useMockData: boolean;

  constructor() {
    // Solo usar datos mock si se especifica explícitamente
    this.useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
  }

  // Métodos para categorías
  async getCategories(): Promise<{ data: Category[]; meta: any }> {
    if (this.useMockData) {
      return {
        data: mockData.categories,
        meta: { pagination: { total: mockData.categories.length } }
      };
    }

    try {
      const response = await StrapiAPI.categories.getActive();
      return StrapiUtils.transformStrapiCollection(response);
    } catch (error) {
      return {
        data: mockData.categories,
        meta: { pagination: { total: mockData.categories.length } }
      };
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (this.useMockData) {
      return mockData.categories.find(cat => cat.slug === slug) || null;
    }

    try {
      const response = await StrapiAPI.categories.getBySlug(slug);
      const transformed = StrapiUtils.transformStrapiCollection(response);
      return transformed.data[0] || null;
    } catch (error) {
      return mockData.categories.find(cat => cat.slug === slug) || null;
    }
  }

  // Métodos para zonas
  async getZones(): Promise<{ data: Zone[]; meta: any }> {
    if (this.useMockData) {
      return {
        data: mockData.zones,
        meta: { pagination: { total: mockData.zones.length } }
      };
    }

    try {
      const response = await StrapiAPI.zones.getActive();
      return StrapiUtils.transformStrapiCollection(response);
    } catch (error) {
      return {
        data: mockData.zones,
        meta: { pagination: { total: mockData.zones.length } }
      };
    }
  }

  async getZoneBySlug(slug: string): Promise<Zone | null> {
    if (this.useMockData) {
      return mockData.zones.find(zone => zone.slug === slug) || null;
    }

    try {
      const response = await StrapiAPI.zones.getBySlug(slug);
      const transformed = StrapiUtils.transformStrapiCollection(response);
      return transformed.data[0] || null;
    } catch (error) {
      return mockData.zones.find(zone => zone.slug === slug) || null;
    }
  }

  // Métodos para negocios
  async getBusinesses(params: any = {}): Promise<{ data: Business[]; meta: any }> {
    if (this.useMockData) {
      let filteredBusinesses = [...mockData.businesses];

      // Aplicar filtros básicos
      if (params.featured) {
        filteredBusinesses = filteredBusinesses.filter(b => b.featured);
      }

      if (params.category_slug) {
        filteredBusinesses = filteredBusinesses.filter(b => b.category?.slug === params.category_slug);
      }

      if (params.zone_slug) {
        filteredBusinesses = filteredBusinesses.filter(b => b.zone?.slug === params.zone_slug);
      }

      if (params.query) {
        const query = params.query.toLowerCase();
        filteredBusinesses = filteredBusinesses.filter(b => 
          b.name.toLowerCase().includes(query) || 
          b.description?.toLowerCase().includes(query)
        );
      }

      return {
        data: filteredBusinesses,
        meta: { pagination: { total: filteredBusinesses.length } }
      };
    }

    try {
      // Construir filtros para Strapi
      let strapiParams: any = {
        populate: '*'
      };

      // Construir filtros de manera más robusta
      const filters: any = {};

      // Si hay búsqueda por texto, usar filtro $or con $containsi
      if (params.query) {
        filters.$or = [
          { name: { $containsi: params.query } },
          { description: { $containsi: params.query } }
        ];
      }

      // Filtros adicionales
      if (params.zone_slug) {
        filters['zone.slug'] = { $eq: params.zone_slug };
      }

      if (params.category_slug) {
        filters['category.slug'] = { $eq: params.category_slug };
      }

      if (params.featured !== undefined) {
        filters.featured = { $eq: params.featured };
      }

      // Solo agregar filtros si hay alguno
      if (Object.keys(filters).length > 0) {
        strapiParams.filters = filters;
      }

      const response = await StrapiAPI.businesses.getAll(strapiParams);
      const transformed = StrapiUtils.transformStrapiCollection(response);
      return transformed;
    } catch (error) {
      // En lugar de recursión, usar datos mock directamente
      return {
        data: mockData.businesses,
        meta: { pagination: { total: mockData.businesses.length } }
      };
    }
  }

  async getBusinessById(id: number): Promise<Business | null> {
    if (this.useMockData) {
      return mockData.businesses.find(b => b.id === id) || null;
    }

    try {
      // En Strapi v5, necesitamos obtener el documentId primero
      // Obtenemos todos los negocios y filtramos por el ID numérico para encontrar el documentId
      const listResponse = await StrapiAPI.businesses.getAll({ 
        populate: '*',
        filters: { id: { $eq: id } }
      });


      if (listResponse.data && listResponse.data.length > 0) {
        const business = StrapiUtils.transformStrapiData(listResponse.data[0]);
        return business;
      } else {
        return null;
      }
    } catch (error) {
      return mockData.businesses.find(b => b.id === id) || null;
    }
  }

  async getBusinessByDocumentId(documentId: string): Promise<Business | null> {
    if (this.useMockData) {
      // En datos mock, no tenemos documentId, así que usamos el ID
      return mockData.businesses[0] || null;
    }

    try {
      // Usar el endpoint individual con documentId
      const response = await StrapiAPI.businesses.getById(documentId, { populate: '*' });

      if (response.data) {
        const business = StrapiUtils.transformStrapiData(response.data);
        return business;
      } else {
        return null;
      }
    } catch (error) {
      return mockData.businesses[0] || null;
    }
  }

  async getFeaturedBusinesses(): Promise<{ data: Business[]; meta: any }> {
    return this.getBusinesses({ featured: true });
  }

  async searchBusinesses(query: string): Promise<{ data: Business[]; meta: any }> {
    return this.getBusinesses({ query });
  }

  // Método para verificar disponibilidad
  async checkAvailability(): Promise<boolean> {
    return await isStrapiAvailable();
  }
}

// Instancia singleton
export const strapiAdapter = new StrapiAdapter();
