const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';

async function testAdminUpdate() {
  console.log('🔍 Testing Admin Update Simulation...\n');

  try {
    // 1. Obtener un negocio pendiente
    const businessResponse = await fetch(`${STRAPI_URL}/api/pending-businesses?populate=*`);
    const businessData = await businessResponse.json();
    
    if (!businessData.data || businessData.data.length === 0) {
      console.log('❌ No hay negocios pendientes');
      return;
    }

    const business = businessData.data[0];
    console.log('Negocio seleccionado:', {
      id: business.id,
      documentId: business.documentId,
      name: business.name,
      status: business.status
    });

    // 2. Simular diferentes formas de actualización que podría usar el admin
    const testCases = [
      {
        name: 'Actualización simple con status',
        data: { status: 'approved' }
      },
      {
        name: 'Actualización con campos adicionales',
        data: {
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: 'admin'
        }
      },
      {
        name: 'Actualización con status como string explícito',
        data: { status: 'pending' }
      },
      {
        name: 'Actualización con enum completo',
        data: {
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: 'admin',
          rejection_reason: null
        }
      }
    ];

    for (const testCase of testCases) {
      console.log(`\n🧪 Probando: ${testCase.name}`);
      
      try {
        const response = await fetch(`${STRAPI_URL}/api/pending-businesses/${business.documentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: testCase.data })
        });

        const result = await response.json();
        
        if (response.ok && result.data) {
          console.log(`✅ Éxito - Status: ${result.data.status}`);
        } else {
          console.log(`❌ Error - ${response.status}: ${JSON.stringify(result)}`);
        }
      } catch (error) {
        console.log(`❌ Error de red: ${error.message}`);
      }
    }

    // 3. Verificar el estado final
    console.log('\n📊 Estado final del negocio:');
    const finalResponse = await fetch(`${STRAPI_URL}/api/pending-businesses/${business.documentId}?populate=*`);
    const finalData = await finalResponse.json();
    console.log({
      id: finalData.data.id,
      name: finalData.data.name,
      status: finalData.data.status,
      reviewed_at: finalData.data.reviewed_at,
      reviewed_by: finalData.data.reviewed_by
    });

  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

testAdminUpdate();
