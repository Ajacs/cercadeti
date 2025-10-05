const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';

async function debugPendingBusiness() {
  console.log('🔍 Debugging Pending Business Content Type...\n');

  try {
    // 1. Verificar la configuración del content type
    console.log('1. Verificando configuración del content type...');
    const configResponse = await fetch(`${STRAPI_URL}/content-manager/content-types/api::pending-business.pending-business/configuration`);
    const config = await configResponse.json();
    console.log('Configuración del content type:', JSON.stringify(config, null, 2));

    // 2. Verificar un negocio pendiente específico
    console.log('\n2. Verificando negocio pendiente...');
    const businessResponse = await fetch(`${STRAPI_URL}/api/pending-businesses?populate=*`);
    const businessData = await businessResponse.json();
    
    if (businessData.data && businessData.data.length > 0) {
      const business = businessData.data[0];
      console.log('Negocio encontrado:', {
        id: business.id,
        name: business.name,
        status: business.status,
        category: business.category ? business.category.name : 'Sin categoría',
        categoryId: business.category ? business.category.id : null
      });
    }

    // 3. Verificar las categorías disponibles
    console.log('\n3. Verificando categorías disponibles...');
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/categories`);
    const categoriesData = await categoriesResponse.json();
    console.log('Categorías disponibles:', categoriesData.data.map(c => ({ id: c.id, name: c.name, slug: c.slug })));

    // 4. Probar actualización de status
    console.log('\n4. Probando actualización de status...');
    const testBusinessId = 'jo6ezvgfij96pimyt5swye85';
    const updateResponse = await fetch(`${STRAPI_URL}/api/pending-businesses/${testBusinessId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: 'debug-script'
        }
      })
    });

    const updateResult = await updateResponse.json();
    console.log('Resultado de actualización:', updateResult.data ? '✅ Éxito' : '❌ Error');
    if (updateResult.error) {
      console.log('Error:', updateResult.error);
    }

  } catch (error) {
    console.error('❌ Error en debug:', error.message);
  }
}

debugPendingBusiness();
