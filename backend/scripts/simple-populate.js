#!/usr/bin/env node

/**
 * Script simple para poblar Strapi con datos de prueba
 * Usa la API REST directamente
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class SimpleStrapiPopulator {
  constructor() {
    this.strapiUrl = 'http://localhost:1337';
    this.seedDataPath = path.join(__dirname, '../database/seed/seed-data.json');
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
   * Verifica si las APIs están accesibles
   */
  async checkAPIAccess() {
    console.log('🧪 Verificando acceso a las APIs...');
    
    const endpoints = [
      '/api/business-plans',
      '/api/zones',
      '/api/categories', 
      '/api/businesses',
      '/api/offers',
      '/api/ads'
    ];

    let allAccessible = true;

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${this.strapiUrl}${endpoint}`);
        console.log(`✅ ${endpoint} - Accesible (${response.data.data?.length || 0} registros)`);
      } catch (error) {
        if (error.response?.status === 403) {
          console.log(`⚠️  ${endpoint} - Permisos restringidos (403)`);
          allAccessible = false;
        } else {
          console.log(`❌ ${endpoint} - Error: ${error.message}`);
          allAccessible = false;
        }
      }
    }

    return allAccessible;
  }

  /**
   * Poblar un content type específico
   */
  async populateContentType(endpoint, data, name) {
    console.log(`\n📝 Poblando ${name}...`);
    
    let successCount = 0;
    let errorCount = 0;

    for (const item of data) {
      try {
        const response = await axios.post(`${this.strapiUrl}${endpoint}`, {
          data: item
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
    console.log('🚀 Iniciando población de Strapi...');
    
    // Cargar datos
    const seedData = this.loadSeedData();
    if (!seedData) {
      return;
    }

    // Verificar acceso a APIs
    const apisAccessible = await this.checkAPIAccess();
    
    if (!apisAccessible) {
      console.log('\n❌ Las APIs no están accesibles. Necesitas configurar permisos primero:');
      console.log('1. Ve a http://localhost:1337/admin');
      console.log('2. Haz login con: ajacs1104@gmail.com / 17dtv0027C');
      console.log('3. Ve a Settings > Users & Permissions Plugin > Roles');
      console.log('4. Edita el rol "Public"');
      console.log('5. Habilita "find" y "findOne" para todos los content types');
      console.log('6. Guarda los cambios');
      console.log('7. Ejecuta este script nuevamente');
      return;
    }

    console.log('\n🎉 Las APIs están accesibles. Iniciando población...');

    // Poblar cada content type
    const results = {
      business_plans: await this.populateContentType('/api/business-plans', seedData.business_plans, 'Business Plans'),
      zones: await this.populateContentType('/api/zones', seedData.zones, 'Zones'),
      categories: await this.populateContentType('/api/categories', seedData.categories, 'Categories'),
      businesses: await this.populateContentType('/api/businesses', seedData.businesses, 'Businesses'),
      offers: await this.populateContentType('/api/offers', seedData.offers, 'Offers'),
      ads: await this.populateContentType('/api/ads', seedData.ads, 'Ads')
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
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const populator = new SimpleStrapiPopulator();
  populator.populate().catch(console.error);
}

module.exports = SimpleStrapiPopulator;
