/**
 * Cliente de Strapi para CercaDeTi
 * Configuración y utilidades para consumir la API de Strapi
 */

// Configuración de la API
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN; // Para operaciones admin

// Tipos de respuesta de Strapi
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem {
  id: number;
  attributes: Record<string, any>;
  meta?: Record<string, any>;
}

export interface StrapiCollection<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Clase principal para interactuar con Strapi
export class StrapiClient {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string = STRAPI_URL, token?: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  /**
   * Realiza una petición HTTP a la API de Strapi
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene una colección de elementos
   */
  async getCollection<T>(
    contentType: string,
    params: Record<string, any> = {}
  ): Promise<StrapiCollection<T>> {
    const searchParams = new URLSearchParams();

    // Función helper para serializar objetos anidados recursivamente
    const serializeParam = (parentKey: string, value: any) => {
      if (Array.isArray(value)) {
        // Para populate y sort, usar índices numéricos
        if (parentKey === 'populate' || parentKey === 'sort') {
          value.forEach((v, index) => searchParams.append(`${parentKey}[${index}]`, v));
        } else {
          // Para filtros, usar $in
          value.forEach(v => searchParams.append(`${parentKey}[$in]`, v));
        }
      } else if (typeof value === 'object' && value !== null) {
        // Para objetos anidados, procesar recursivamente
        Object.entries(value).forEach(([subKey, subValue]) => {
          const newKey = `${parentKey}[${subKey}]`;
          if (typeof subValue === 'object' && subValue !== null && !Array.isArray(subValue)) {
            // Recursión para niveles más profundos
            serializeParam(newKey, subValue);
          } else if (Array.isArray(subValue)) {
            // Arrays dentro de objetos
            subValue.forEach((v, index) => searchParams.append(`${newKey}[${index}]`, String(v)));
          } else {
            // Valor primitivo
            searchParams.append(newKey, String(subValue));
          }
        });
      } else {
        searchParams.append(parentKey, String(value));
      }
    };

    // Agregar parámetros de consulta
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        serializeParam(key, value);
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/${contentType}?${queryString}` : `/${contentType}`;

    return this.request<StrapiCollection<T>>(endpoint);
  }

  /**
   * Obtiene un elemento específico por ID
   */
  async getItem<T>(
    contentType: string,
    id: number | string,
    params: Record<string, any> = {}
  ): Promise<{ data: { id: number; attributes: T } }> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // Para populate y sort, usar índices numéricos
          if (key === 'populate' || key === 'sort') {
            value.forEach((v, index) => searchParams.append(`${key}[${index}]`, v));
          } else {
            // Para filtros, usar $in
            value.forEach(v => searchParams.append(`${key}[$in]`, v));
          }
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            searchParams.append(`${key}[${subKey}]`, subValue);
          });
        } else {
          searchParams.append(key, value);
        }
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/${contentType}/${id}?${queryString}` : `/${contentType}/${id}`;
    
    return this.request<{ data: { id: number; attributes: T } }>(endpoint);
  }

  /**
   * Crea un nuevo elemento
   */
  async create<T>(
    contentType: string,
    data: { data: Partial<T> }
  ): Promise<{ data: { id: number; attributes: T } }> {
    return this.request<{ data: { id: number; attributes: T } }>(
      `/${contentType}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  /**
   * Actualiza un elemento existente
   */
  async update<T>(
    contentType: string,
    id: number | string,
    data: { data: Partial<T> }
  ): Promise<{ data: { id: number; attributes: T } }> {
    return this.request<{ data: { id: number; attributes: T } }>(
      `/${contentType}/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
  }

  /**
   * Elimina un elemento
   */
  async delete(contentType: string, id: number | string): Promise<void> {
    await this.request(`/${contentType}/${id}`, {
      method: 'DELETE',
    });
  }
}

// Instancia por defecto del cliente
export const strapi = new StrapiClient();

// Utilidades específicas para CercaDeTi
export const StrapiUtils = {
  /**
   * Transforma relaciones anidadas de Strapi
   */
  transformRelation(relation: any): any {
    if (!relation) return null;

    // Si la relación tiene formato { data: { id, attributes } }
    if (relation.data) {
      if (Array.isArray(relation.data)) {
        return relation.data.map((item: any) => ({
          id: item.id,
          ...item.attributes
        }));
      } else {
        return {
          id: relation.data.id,
          ...relation.data.attributes
        };
      }
    }

    return relation;
  },

  /**
   * Convierte datos de Strapi al formato esperado por el frontend
   */
  transformStrapiData<T>(strapiItem: { id: number; documentId?: string; attributes?: any } | any): T & { id: number; documentId?: string } {
    // Manejar tanto la estructura nueva (datos directos) como la antigua (con attributes)
    let attributes;
    let id;
    let documentId;
    
    if (strapiItem.attributes !== undefined) {
      // Estructura antigua: { id, attributes }
      attributes = { ...strapiItem.attributes };
      id = strapiItem.id;
      documentId = strapiItem.documentId;
    } else {
      // Estructura nueva: datos directos con id
      attributes = { ...strapiItem };
      id = strapiItem.id;
      documentId = strapiItem.documentId;
    }

    // Transformar todas las relaciones que puedan existir
    Object.keys(attributes).forEach(key => {
      if (attributes[key] && typeof attributes[key] === 'object' && attributes[key].data !== undefined) {
        attributes[key] = this.transformRelation(attributes[key]);
      }
    });

    return {
      id,
      documentId,
      ...attributes,
    } as T & { id: number; documentId?: string };
  },

  /**
   * Convierte una colección de Strapi
   */
  transformStrapiCollection<T>(
    collection: StrapiCollection<T>
  ): { data: Array<T & { id: number }>; meta: any } {
    return {
      data: collection.data.map(item => this.transformStrapiData(item)),
      meta: collection.meta,
    };
  },

  /**
   * Construye parámetros de consulta para Strapi
   */
  buildQueryParams(options: {
    populate?: string | string[] | Record<string, any>;
    sort?: string | string[];
    filters?: Record<string, any>;
    pagination?: {
      page?: number;
      pageSize?: number;
    };
    fields?: string[];
  }): Record<string, any> {
    const params: Record<string, any> = {};

    if (options.populate) {
      if (typeof options.populate === 'string') {
        params.populate = options.populate;
      } else if (Array.isArray(options.populate)) {
        params.populate = options.populate;
      } else {
        params.populate = options.populate;
      }
    }

    if (options.sort) {
      params.sort = Array.isArray(options.sort) ? options.sort : [options.sort];
    }

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params[`filters[${key}]`] = value;
      });
    }

    if (options.pagination) {
      if (options.pagination.page) {
        params['pagination[page]'] = options.pagination.page;
      }
      if (options.pagination.pageSize) {
        params['pagination[pageSize]'] = options.pagination.pageSize;
      }
    }

    if (options.fields) {
      params.fields = options.fields;
    }

    return params;
  },
};

// Funciones específicas para cada tipo de contenido
export const StrapiAPI = {
  // Business Plans
  businessPlans: {
    getAll: () => strapi.getCollection('business-plans'),
    getById: (id: number) => strapi.getItem('business-plans', id),
    getActive: () => strapi.getCollection('business-plans', {
      filters: { active: true },
      sort: ['sort_order:asc']
    }),
  },

  // Zones
  zones: {
    getAll: () => strapi.getCollection('zones'),
    getById: (id: number) => strapi.getItem('zones', id),
    getBySlug: (slug: string) => strapi.getCollection('zones', {
      filters: { slug }
    }),
    getActive: () => strapi.getCollection('zones', {
      filters: { is_active: true },
      sort: ['sort_order:asc']
    }),
  },

  // Categories
  categories: {
    getAll: () => strapi.getCollection('categories'),
    getById: (id: number) => strapi.getItem('categories', id),
    getBySlug: (slug: string) => strapi.getCollection('categories', {
      filters: { slug }
    }),
    getActive: () => strapi.getCollection('categories', {
      filters: { is_active: true },
      sort: ['sort_order:asc']
    }),
  },

  // Businesses
  businesses: {
    getAll: (params?: Record<string, any>) => strapi.getCollection('businesses', {
      populate: ['category', 'zone', 'plan', 'offers', 'ads', 'main_image'],
      ...params
    }),
    getById: (id: number | string) => strapi.getItem('businesses', id, {
      populate: ['category', 'zone', 'plan', 'offers', 'ads', 'main_image']
    }),
    getByCategory: (categoryId: number) => strapi.getCollection('businesses', {
      filters: { category: categoryId },
      populate: ['category', 'zone', 'plan', 'main_image']
    }),
    getByZone: (zoneId: number) => strapi.getCollection('businesses', {
      filters: { zone: zoneId },
      populate: ['category', 'zone', 'plan', 'main_image']
    }),
    getFeatured: () => strapi.getCollection('businesses', {
      filters: { featured: true, is_active: true },
      populate: ['category', 'zone', 'plan', 'main_image'],
      sort: ['rating:desc']
    }),
    getActive: () => strapi.getCollection('businesses', {
      filters: { is_active: true },
      populate: ['category', 'zone', 'plan', 'main_image'],
      sort: ['rating:desc']
    }),
    search: (query: string) => strapi.getCollection('businesses', {
      filters: {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } }
        ],
        is_active: true
      },
      populate: ['category', 'zone', 'plan', 'main_image']
    }),
  },

  // Offers
  offers: {
    getAll: () => strapi.getCollection('offers', {
      populate: ['business']
    }),
    getById: (id: number) => strapi.getItem('offers', id, {
      populate: ['business']
    }),
    getActive: () => strapi.getCollection('offers', {
      filters: { is_active: true },
      populate: ['business'],
      sort: ['createdAt:desc']
    }),
    getByBusiness: (businessId: number) => strapi.getCollection('offers', {
      filters: { business: businessId, is_active: true },
      populate: ['business']
    }),
  },

  // Ads
  ads: {
    getAll: () => strapi.getCollection('ads', {
      populate: ['business']
    }),
    getById: (id: number) => strapi.getItem('ads', id, {
      populate: ['business']
    }),
    getActive: () => strapi.getCollection('ads', {
      filters: { is_active: true },
      populate: ['business'],
      sort: ['priority:desc', 'createdAt:desc']
    }),
    getByBusiness: (businessId: number) => strapi.getCollection('ads', {
      filters: { business: businessId, is_active: true },
      populate: ['business']
    }),
  },
};

export default strapi;
