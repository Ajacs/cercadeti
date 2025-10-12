/**
 * Adaptador para Strapi que funciona tanto con datos reales como con datos mock
 * Útil durante el desarrollo cuando Strapi no está disponible
 */

import { Business, Category, Zone, Offer, Ad } from '@/types';
import { StrapiAPI, StrapiUtils } from './strapi';

// Clase adaptadora para Strapi
export class StrapiAdapter {
  constructor() {
    // Siempre usar datos reales de Strapi
  }

  // Métodos para categorías
  async getCategories(): Promise<{ data: Category[]; meta: any }> {
    try {
      const response = await StrapiAPI.categories.getActive();
      return StrapiUtils.transformStrapiCollection(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const response = await StrapiAPI.categories.getBySlug(slug);
      const transformed = StrapiUtils.transformStrapiCollection(response);
      return transformed.data[0] || null;
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      throw error;
    }
  }

  // Métodos para zonas
  async getZones(): Promise<{ data: Zone[]; meta: any }> {
    try {
      const response = await StrapiAPI.zones.getActive();
      return StrapiUtils.transformStrapiCollection(response);
    } catch (error) {
      console.error('Error fetching zones:', error);
      throw error;
    }
  }

  async getZoneBySlug(slug: string): Promise<Zone | null> {
    try {
      const response = await StrapiAPI.zones.getBySlug(slug);
      const transformed = StrapiUtils.transformStrapiCollection(response);
      return transformed.data[0] || null;
    } catch (error) {
      console.error('Error fetching zone by slug:', error);
      throw error;
    }
  }

  // Métodos para negocios
  async getBusinesses(params: any = {}): Promise<{ data: Business[]; meta: any }> {
    try {
      // Construir filtros para Strapi
      // En Strapi v5, populate: '*' no popula media fields, hay que especificarlos
      let strapiParams: any = {
        populate: ['category', 'zone', 'plan', 'offers', 'ads', 'main_image']
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

      // Filtros adicionales usando el formato correcto para relaciones en Strapi v5
      if (params.zone_slug) {
        filters.zone = {
          slug: { $eq: params.zone_slug }
        };
      }

      if (params.category_slug) {
        filters.category = {
          slug: { $eq: params.category_slug }
        };
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
      console.error('Error fetching businesses:', error);
      throw error;
    }
  }

  async getBusinessById(id: number): Promise<Business | null> {
    try {
      // En Strapi v5, necesitamos obtener el documentId primero
      // Obtenemos todos los negocios y filtramos por el ID numérico para encontrar el documentId
      const listResponse = await StrapiAPI.businesses.getAll({
        populate: ['category', 'zone', 'plan', 'offers', 'ads', 'main_image'],
        filters: { id: { $eq: id } }
      });

      if (listResponse.data && listResponse.data.length > 0) {
        const business = StrapiUtils.transformStrapiData(listResponse.data[0]);
        return business;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching business by id:', error);
      throw error;
    }
  }

  async getBusinessByDocumentId(documentId: string): Promise<Business | null> {
    try {
      // Usar el endpoint individual con documentId
      const response = await StrapiAPI.businesses.getById(documentId);

      if (response.data) {
        const business = StrapiUtils.transformStrapiData(response.data);
        return business;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching business by documentId:', error);
      throw error;
    }
  }

  async getFeaturedBusinesses(): Promise<{ data: Business[]; meta: any }> {
    return this.getBusinesses({ featured: true });
  }

  async searchBusinesses(query: string): Promise<{ data: Business[]; meta: any }> {
    return this.getBusinesses({ query });
  }
}

// Instancia singleton
export const strapiAdapter = new StrapiAdapter();
