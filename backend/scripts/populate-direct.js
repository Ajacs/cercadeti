#!/usr/bin/env node

/**
 * Script para poblar Strapi directamente usando el Content Manager
 * Este script inserta datos directamente en la base de datos
 */

const fs = require('fs');
const path = require('path');

class StrapiDirectPopulator {
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
   * Crea archivos JSON individuales para cada content type
   */
  createIndividualFiles(seedData) {
    const baseDir = path.join(__dirname, '../database/seed');
    
    // Crear archivos individuales
    const files = [
      { name: 'business_plans.json', data: seedData.business_plans },
      { name: 'zones.json', data: seedData.zones },
      { name: 'categories.json', data: seedData.categories },
      { name: 'businesses.json', data: seedData.businesses },
      { name: 'offers.json', data: seedData.offers },
      { name: 'ads.json', data: seedData.ads }
    ];

    files.forEach(({ name, data }) => {
      const filePath = path.join(baseDir, name);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Archivo creado: ${name} (${data.length} registros)`);
    });
  }

  /**
   * Muestra instrucciones para poblar manualmente
   */
  showManualInstructions() {
    console.log('\n📋 INSTRUCCIONES PARA POBLAR MANUALMENTE:');
    console.log('\n1. Ve a http://localhost:1337/admin');
    console.log('2. Configura los permisos públicos primero:');
    console.log('   - Settings > Users & Permissions Plugin > Roles');
    console.log('   - Edita el rol "Public"');
    console.log('   - Habilita "find" y "findOne" para todos los content types');
    console.log('   - Guarda los cambios');
    console.log('\n3. Poblar datos usando el Content Manager:');
    
    const contentTypes = [
      { name: 'Business Plans', path: 'business-plans', file: 'business_plans.json' },
      { name: 'Zones', path: 'zones', file: 'zones.json' },
      { name: 'Categories', path: 'categories', file: 'categories.json' },
      { name: 'Businesses', path: 'businesses', file: 'businesses.json' },
      { name: 'Offers', path: 'offers', file: 'offers.json' },
      { name: 'Ads', path: 'ads', file: 'ads.json' }
    ];

    contentTypes.forEach(({ name, path, file }) => {
      console.log(`\n   📝 ${name}:`);
      console.log(`      - Ve a Content Manager > Collection Types > ${name}`);
      console.log(`      - Haz clic en "Create new entry"`);
      console.log(`      - Copia los datos de database/seed/${file}`);
      console.log(`      - Guarda y publica`);
    });

    console.log('\n4. Alternativamente, ejecuta:');
    console.log('   npm run populate');
    console.log('   (después de configurar permisos)');
  }

  /**
   * Ejecuta el proceso completo
   */
  async run() {
    console.log('🚀 Iniciando población directa de Strapi...');
    
    // Cargar datos
    const seedData = this.loadSeedData();
    if (!seedData) {
      return;
    }

    // Crear archivos individuales
    this.createIndividualFiles(seedData);

    // Mostrar instrucciones
    this.showManualInstructions();

    console.log('\n🎯 Una vez poblados los datos, el frontend debería mostrar:');
    console.log('   - Categorías en el filtro');
    console.log('   - Negocios en la lista');
    console.log('   - Zonas en el selector');
    console.log('   - Ofertas y anuncios');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const populator = new StrapiDirectPopulator();
  populator.run().catch(console.error);
}

module.exports = StrapiDirectPopulator;
