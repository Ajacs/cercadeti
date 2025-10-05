#!/usr/bin/env node

/**
 * Script para poblar Strapi usando la API de administración
 * Este script usa las credenciales de admin para crear datos
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class StrapiAdminPopulator {
  constructor() {
    this.strapiUrl = 'http://localhost:1337';
    this.adminToken = null;
    // Solo para desarrollo - NO usar en producción
    this.adminEmail = 'ajacs1104@gmail.com';
    this.adminPassword = '17dtv0027C';
    this.seedDataPath = path.join(__dirname, '../database/seed/seed-data.json');
  }

  /**
   * Obtiene token de administrador
   */
  async getAdminToken() {
    try {
      console.log('🔐 Obteniendo token de administrador...');
      
      const response = await axios.post(`${this.strapiUrl}/admin/login`, {
        email: this.adminEmail,
        password: this.adminPassword
      });
      
      this.adminToken = response.data.data.token;
      console.log('✅ Token de administrador obtenido');
      return true;
    } catch (error) {
      console.error('❌ Error obteniendo token de administrador:', error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Carga los datos de prueba
   */
  loadSeedData() {
    try {
      const seedData = JSON.parse(fs.readFileSync(this.seedDataPath, 'utf8'));
      console.log('📊 Datos de prueba cargados:');
      console.log(`   - Business Plans: ${seedData.business_plans.length}`);
      console.log(`   - Zones: ${seedData.zones.length}`);
      console.log(`   - Categories: ${seedData.categories.length}`);
      console.log(`   - Businesses: ${seedData.businesses.length}`);
      console.log(`   - Offers: ${seedData.offers.length}`);
      console.log(`   - Ads: ${seedData.ads.length}`);
      return seedData;
    } catch (error) {
      console.error('❌ Error cargando datos de prueba:', error.message);
      return null;
    }
  }

  /**
   * Poblar un content type usando la API de administración
   */
  async populateContentTypeWithAdmin(endpoint, data, name) {
    console.log(`\n📝 Poblando ${name} usando API de administración...`);
    
    let successCount = 0;
    let errorCount = 0;

    for (const item of data) {
      try {
        // Usar la API de Content Manager de Strapi
        const response = await axios.post(`${this.strapiUrl}/content-manager/collection-types/${endpoint}`, {
          ...item,
          publishedAt: new Date().toISOString()
        }, {
          headers: {
            'Authorization': `Bearer ${this.adminToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 200 || response.status === 201) {
          successCount++;
          console.log(`   ✅ ${item.name || item.title || 'Item'}`);
        }
      } catch (error) {
        errorCount++;
        console.log(`   ❌ Error creando ${item.name || item.title || 'item'}: ${error.response?.data?.error?.message || error.message}`);
      }
    }

    console.log(`📊 ${name}: ${successCount} creados, ${errorCount} errores`);
    return { successCount, errorCount };
  }

  /**
   * Ejecuta la población completa
   */
  async populate() {
    console.log('🚀 Iniciando población de Strapi usando API de administración...');
    
    // Obtener token de administrador
    const tokenObtained = await this.getAdminToken();
    if (!tokenObtained) {
      console.log('❌ No se puede continuar sin token de administrador');
      return;
    }

    // Cargar datos
    const seedData = this.loadSeedData();
    if (!seedData) {
      return;
    }

    console.log('\n🎉 Iniciando población con permisos de administrador...');

    // Poblar cada content type usando la API de administración
    const results = {
      'api::business-plan.business-plan': await this.populateContentTypeWithAdmin('api::business-plan.business-plan', seedData.business_plans, 'Business Plans'),
      'api::zone.zone': await this.populateContentTypeWithAdmin('api::zone.zone', seedData.zones, 'Zones'),
      'api::category.category': await this.populateContentTypeWithAdmin('api::category.category', seedData.categories, 'Categories'),
      'api::business.business': await this.populateContentTypeWithAdmin('api::business.business', seedData.businesses, 'Businesses'),
      'api::offer.offer': await this.populateContentTypeWithAdmin('api::offer.offer', seedData.offers, 'Offers'),
      'api::ad.ad': await this.populateContentTypeWithAdmin('api::ad.ad', seedData.ads, 'Ads')
    };

    // Resumen final
    console.log('\n📊 RESUMEN FINAL:');
    let totalSuccess = 0;
    let totalErrors = 0;
    
    Object.entries(results).forEach(([key, result]) => {
      totalSuccess += result.successCount;
      totalErrors += result.errorCount;
      console.log(`   ${key}: ${result.successCount} creados, ${result.errorCount} errores`);
    });

    console.log(`\n🎯 TOTAL: ${totalSuccess} registros creados, ${totalErrors} errores`);
    
    if (totalErrors === 0) {
      console.log('\n🎉 ¡Población completada exitosamente!');
      console.log('🌐 Ahora puedes ir al frontend y ver los datos cargados');
    } else {
      console.log('\n⚠️  Población completada con algunos errores');
    }

    // Verificar que los datos estén accesibles públicamente
    console.log('\n🧪 Verificando acceso público a los datos...');
    await this.verifyPublicAccess();
  }

  /**
   * Verifica que los datos estén accesibles públicamente
   */
  async verifyPublicAccess() {
    const endpoints = [
      '/api/business-plans',
      '/api/zones',
      '/api/categories', 
      '/api/businesses',
      '/api/offers',
      '/api/ads'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${this.strapiUrl}${endpoint}`);
        console.log(`✅ ${endpoint} - ${response.data.data?.length || 0} registros disponibles`);
      } catch (error) {
        console.log(`❌ ${endpoint} - Error: ${error.message}`);
      }
    }
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const populator = new StrapiAdminPopulator();
  populator.populate().catch(console.error);
}

module.exports = StrapiAdminPopulator;
