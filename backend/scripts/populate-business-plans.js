const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';

const businessPlans = [
  {
    name: "Básico",
    description: "Plan básico para negocios pequeños",
    price: 99.00,
    features: ["Listado básico", "Información de contacto", "1 foto"],
    active: true,
    duration_days: 30,
    max_ads: 1,
    max_offers: 1,
    sort_order: 1
  },
  {
    name: "Premium",
    description: "Plan premium con más características",
    price: 199.00,
    features: ["Listado destacado", "Múltiples fotos", "Ofertas especiales", "Estadísticas"],
    active: true,
    duration_days: 30,
    max_ads: 5,
    max_offers: 3,
    sort_order: 2
  },
  {
    name: "Enterprise",
    description: "Plan empresarial para grandes negocios",
    price: 399.00,
    features: ["Listado VIP", "Fotos ilimitadas", "Anuncios premium", "Soporte prioritario", "Analytics avanzados"],
    active: true,
    duration_days: 30,
    max_ads: -1, // ilimitado
    max_offers: -1, // ilimitado
    sort_order: 3
  }
];

async function createBusinessPlan(plan) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/business-plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: plan }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Plan creado: ${plan.name} (ID: ${result.data.id}) - $${plan.price}`);
    return result.data;
  } catch (error) {
    console.error(`❌ Error creando plan ${plan.name}:`, error.message);
    throw error;
  }
}

async function populateBusinessPlans() {
  console.log('💼 Creando planes de negocio...\n');

  try {
    for (const plan of businessPlans) {
      await createBusinessPlan(plan);
    }

    console.log('\n🎉 ¡Todos los planes creados correctamente!');
    console.log('\n📋 Planes disponibles:');
    businessPlans.forEach(plan => {
      console.log(`   - ${plan.name}: $${plan.price} - ${plan.description}`);
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

populateBusinessPlans();
