const fetch = require('node-fetch');

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_EMAIL = 'ajacs1104@gmail.com';
const ADMIN_PASSWORD = '17dtv0027C';

async function checkPermissions() {
  try {
    console.log('🔍 Verificando permisos de Strapi...\n');

    // 1. Verificar endpoint de lista (debería funcionar)
    console.log('1. Probando endpoint de lista:');
    const listResponse = await fetch(`${STRAPI_URL}/api/businesses?populate=*`);
    console.log(`   Status: ${listResponse.status}`);
    
    if (listResponse.ok) {
      const listData = await listResponse.json();
      console.log(`   ✅ Lista funciona: ${listData.data.length} negocios encontrados`);
      
      if (listData.data.length > 0) {
        const firstBusiness = listData.data[0];
        console.log(`   📋 Primer negocio: ID ${firstBusiness.id} - ${firstBusiness.name}`);
        
        // 2. Verificar endpoint individual
        console.log('\n2. Probando endpoint individual:');
        const individualResponse = await fetch(`${STRAPI_URL}/api/businesses/${firstBusiness.id}?populate=*`);
        console.log(`   Status: ${individualResponse.status}`);
        
        if (individualResponse.ok) {
          const individualData = await individualResponse.json();
          console.log(`   ✅ Endpoint individual funciona: ${individualData.data.name}`);
        } else {
          const errorData = await individualResponse.json();
          console.log(`   ❌ Endpoint individual falla: ${errorData.error.message}`);
          console.log(`   🔧 Necesitas habilitar el permiso 'findOne' para 'businesses'`);
        }
      }
    } else {
      console.log(`   ❌ Lista falla: ${listResponse.status}`);
    }

    // 3. Verificar filtrado por categoría
    console.log('\n3. Probando filtrado por categoría:');
    const filterResponse = await fetch(`${STRAPI_URL}/api/businesses?populate=*&filters[category][slug][$eq]=supermercados`);
    console.log(`   Status: ${filterResponse.status}`);
    
    if (filterResponse.ok) {
      const filterData = await filterResponse.json();
      console.log(`   ✅ Filtrado funciona: ${filterData.data.length} negocios en supermercados`);
      filterData.data.forEach(business => {
        console.log(`   📋 - ${business.name} (${business.category?.name})`);
      });
    } else {
      console.log(`   ❌ Filtrado falla: ${filterResponse.status}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkPermissions();
