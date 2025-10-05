// Script para probar el adaptador de Strapi
const { strapiAdapter } = require('./src/lib/strapi-adapter.ts');

async function testAdapter() {
  console.log('🧪 Probando adaptador de Strapi...');
  
  try {
    // Probar categorías
    console.log('\n📂 Probando categorías...');
    const categories = await strapiAdapter.getCategories();
    console.log('✅ Categorías obtenidas:', categories.data.length);
    console.log('📊 Primeras categorías:', categories.data.slice(0, 3).map(c => c.name));
    
    // Probar zonas
    console.log('\n📍 Probando zonas...');
    const zones = await strapiAdapter.getZones();
    console.log('✅ Zonas obtenidas:', zones.data.length);
    console.log('📊 Primeras zonas:', zones.data.slice(0, 3).map(z => z.name));
    
    // Probar negocios
    console.log('\n🏢 Probando negocios...');
    const businesses = await strapiAdapter.getBusinesses();
    console.log('✅ Negocios obtenidos:', businesses.data.length);
    console.log('📊 Primeros negocios:', businesses.data.slice(0, 3).map(b => b.name));
    
    // Verificar disponibilidad
    console.log('\n🔍 Verificando disponibilidad...');
    const isAvailable = await strapiAdapter.checkAvailability();
    console.log('✅ Strapi disponible:', isAvailable);
    
  } catch (error) {
    console.error('❌ Error probando adaptador:', error.message);
  }
}

testAdapter();
