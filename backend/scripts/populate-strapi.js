#!/usr/bin/env node

/**
 * Script para poblar Strapi con datos de prueba
 * Este script toma los datos generados por seed-data.js y los inserta en Strapi
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

class StrapiPopulator {
  constructor() {
    this.strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    this.apiToken = process.env.STRAPI_TOKEN || '';
    this.seedDataPath = path.join(__dirname, '../database/seed/seed-data.json');
  }

  /**
   * Carga los datos de prueba
   */
  loadSeedData() {
    try {
      const data = fs.readFileSync(this.seedDataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error cargando datos de prueba:', error.message);
      throw error;
    }
  }

  /**
   * Realiza una petición HTTP a Strapi
   */
  async strapiRequest(method, endpoint, data = null) {
    const url = `${this.strapiUrl}/api${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.apiToken) {
      headers.Authorization = `Bearer ${this.apiToken}`;
    }

    try {
      const response = await axios({
        method,
        url,
        headers,
        data,
      });
      return response.data;
    } catch (error) {
      console.error(`Error en ${method} ${endpoint}:`, error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Poblar business plans
   */
  async populateBusinessPlans(businessPlans) {
    console.log('📋 Poblando business plans...');
    
    for (const plan of businessPlans) {
      try {
        await this.strapiRequest('POST', '/business-plans', {
          data: plan
        });
        console.log(`✅ Business plan creado: ${plan.name}`);
      } catch (error) {
        console.error(`❌ Error creando business plan ${plan.name}:`, error.message);
      }
    }
  }

  /**
   * Poblar zonas
   */
  async populateZones(zones) {
    console.log('🗺️ Poblando zonas...');
    
    for (const zone of zones) {
      try {
        await this.strapiRequest('POST', '/zones', {
          data: zone
        });
        console.log(`✅ Zona creada: ${zone.name}`);
      } catch (error) {
        console.error(`❌ Error creando zona ${zone.name}:`, error.message);
      }
    }
  }

  /**
   * Poblar categorías
   */
  async populateCategories(categories) {
    console.log('🏷️ Poblando categorías...');
    
    for (const category of categories) {
      try {
        await this.strapiRequest('POST', '/categories', {
          data: category
        });
        console.log(`✅ Categoría creada: ${category.name}`);
      } catch (error) {
        console.error(`❌ Error creando categoría ${category.name}:`, error.message);
      }
    }
  }

  /**
   * Poblar negocios
   */
  async populateBusinesses(businesses) {
    console.log('🏢 Poblando negocios...');
    
    for (const business of businesses) {
      try {
        await this.strapiRequest('POST', '/businesses', {
          data: business
        });
        console.log(`✅ Negocio creado: ${business.name}`);
      } catch (error) {
        console.error(`❌ Error creando negocio ${business.name}:`, error.message);
      }
    }
  }

  /**
   * Poblar ofertas
   */
  async populateOffers(offers) {
    console.log('🎯 Poblando ofertas...');
    
    for (const offer of offers) {
      try {
        await this.strapiRequest('POST', '/offers', {
          data: offer
        });
        console.log(`✅ Oferta creada: ${offer.name}`);
      } catch (error) {
        console.error(`❌ Error creando oferta ${offer.name}:`, error.message);
      }
    }
  }

  /**
   * Poblar anuncios
   */
  async populateAds(ads) {
    console.log('📢 Poblando anuncios...');
    
    for (const ad of ads) {
      try {
        await this.strapiRequest('POST', '/ads', {
          data: ad
        });
        console.log(`✅ Anuncio creado: ${ad.name}`);
      } catch (error) {
        console.error(`❌ Error creando anuncio ${ad.name}:`, error.message);
      }
    }
  }

  /**
   * Verificar conexión con Strapi
   */
  async checkStrapiConnection() {
    try {
      console.log('🔍 Verificando conexión con Strapi...');
      await this.strapiRequest('GET', '/business-plans');
      console.log('✅ Conexión con Strapi establecida');
      return true;
    } catch (error) {
      console.error('❌ No se puede conectar con Strapi:', error.message);
      console.log('💡 Asegúrate de que Strapi esté ejecutándose en', this.strapiUrl);
      return false;
    }
  }

  /**
   * Ejecutar el proceso completo de población
   */
  async populate() {
    console.log('🚀 Iniciando proceso de población de Strapi...');
    
    // Verificar conexión
    const isConnected = await this.checkStrapiConnection();
    if (!isConnected) {
      process.exit(1);
    }

    // Cargar datos
    const seedData = this.loadSeedData();
    console.log(`📊 Datos cargados: ${Object.keys(seedData).length} tipos de contenido`);

    try {
      // Poblar en orden de dependencias
      await this.populateBusinessPlans(seedData.business_plans);
      await this.populateZones(seedData.zones);
      await this.populateCategories(seedData.categories);
      await this.populateBusinesses(seedData.businesses);
      await this.populateOffers(seedData.offers);
      await this.populateAds(seedData.ads);

      console.log('\n🎉 ¡Población completada exitosamente!');
      console.log('📈 Resumen:');
      console.log(`   - Business Plans: ${seedData.business_plans.length}`);
      console.log(`   - Zonas: ${seedData.zones.length}`);
      console.log(`   - Categorías: ${seedData.categories.length}`);
      console.log(`   - Negocios: ${seedData.businesses.length}`);
      console.log(`   - Ofertas: ${seedData.offers.length}`);
      console.log(`   - Anuncios: ${seedData.ads.length}`);

    } catch (error) {
      console.error('❌ Error durante la población:', error.message);
      process.exit(1);
    }
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const populator = new StrapiPopulator();
  populator.populate().catch(console.error);
}

module.exports = StrapiPopulator;
