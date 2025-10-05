const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';

async function getReferenceData() {
  console.log('📋 Obteniendo datos de referencia...\n');

  try {
    // Obtener zonas
    const zonesResponse = await fetch(`${STRAPI_URL}/api/zones?populate=*`);
    const zonesData = await zonesResponse.json();
    const zones = {};
    zonesData.data.forEach(zone => {
      zones[zone.slug] = zone.id;
    });

    // Obtener categorías
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/categories?populate=*`);
    const categoriesData = await categoriesResponse.json();
    const categories = {};
    categoriesData.data.forEach(category => {
      categories[category.slug] = category.id;
    });

    // Obtener planes
    const plansResponse = await fetch(`${STRAPI_URL}/api/business-plans?populate=*`);
    const plansData = await plansResponse.json();
    const plans = {};
    plansData.data.forEach(plan => {
      plans[plan.name.toLowerCase()] = plan.id;
    });

    console.log('✅ Datos de referencia obtenidos:');
    console.log(`   📍 Zonas: ${Object.keys(zones).length}`);
    console.log(`   📂 Categorías: ${Object.keys(categories).length}`);
    console.log(`   💼 Planes: ${Object.keys(plans).length}\n`);

    return { zones, categories, plans };
  } catch (error) {
    console.error('❌ Error obteniendo datos de referencia:', error.message);
    throw error;
  }
}

const businesses = [
  // Restaurantes en Pedregal
  {
    name: "Sushi Central",
    description: "Restaurante de sushi premium con ingredientes frescos importados de Japón",
    phone: "+52 555 123 4567",
    email: "info@sushicentral.com",
    website: "https://sushicentral.com",
    address: "Av. Pedregal 123, Pedregal",
    hours: {
      monday: { open: "11:00", close: "22:00" },
      tuesday: { open: "11:00", close: "22:00" },
      wednesday: { open: "11:00", close: "22:00" },
      thursday: { open: "11:00", close: "22:00" },
      friday: { open: "11:00", close: "23:00" },
      saturday: { open: "11:00", close: "23:00" },
      sunday: { open: "12:00", close: "21:00" }
    },
    rating: 4.8,
    review_count: 156,
    supports_delivery: true,
    featured: true,
    is_active: true,
    main_image_url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
    category_slug: "restaurantes",
    zone_slug: "pedregal",
    plan_name: "premium"
  },
  {
    name: "Pizza Corner",
    description: "Pizzería artesanal con horno de leña y ingredientes premium",
    phone: "+52 555 234 5678",
    email: "pedidos@pizzacorner.com",
    website: "https://pizzacorner.com",
    address: "Calle Pedregal 456, Pedregal",
    hours: {
      monday: { open: "16:00", close: "24:00" },
      tuesday: { open: "16:00", close: "24:00" },
      wednesday: { open: "16:00", close: "24:00" },
      thursday: { open: "16:00", close: "24:00" },
      friday: { open: "16:00", close: "01:00" },
      saturday: { open: "12:00", close: "01:00" },
      sunday: { open: "12:00", close: "22:00" }
    },
    rating: 4.5,
    review_count: 89,
    supports_delivery: true,
    featured: false,
    is_active: true,
    main_image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    category_slug: "restaurantes",
    zone_slug: "pedregal",
    plan_name: "básico"
  },
  
  // Supermercados en Pedregal
  {
    name: "Mercado Express",
    description: "Supermercado de conveniencia con productos frescos y horario extendido",
    phone: "+52 555 345 6789",
    email: "contacto@mercadoexpress.com",
    website: "https://mercadoexpress.com",
    address: "Plaza Pedregal, Local 12, Pedregal",
    hours: {
      monday: { open: "07:00", close: "22:00" },
      tuesday: { open: "07:00", close: "22:00" },
      wednesday: { open: "07:00", close: "22:00" },
      thursday: { open: "07:00", close: "22:00" },
      friday: { open: "07:00", close: "22:00" },
      saturday: { open: "08:00", close: "22:00" },
      sunday: { open: "08:00", close: "20:00" }
    },
    rating: 4.2,
    review_count: 234,
    supports_delivery: true,
    featured: false,
    is_active: true,
    main_image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    category_slug: "supermercados",
    zone_slug: "pedregal",
    plan_name: "básico"
  },

  // Restaurantes en Centro
  {
    name: "Café del Centro",
    description: "Cafetería tradicional con ambiente bohemio y pastelería artesanal",
    phone: "+52 555 456 7890",
    email: "hola@cafedelcentro.com",
    website: "https://cafedelcentro.com",
    address: "Plaza Principal 789, Centro",
    hours: {
      monday: { open: "07:00", close: "20:00" },
      tuesday: { open: "07:00", close: "20:00" },
      wednesday: { open: "07:00", close: "20:00" },
      thursday: { open: "07:00", close: "20:00" },
      friday: { open: "07:00", close: "21:00" },
      saturday: { open: "08:00", close: "21:00" },
      sunday: { open: "09:00", close: "18:00" }
    },
    rating: 4.6,
    review_count: 178,
    supports_delivery: false,
    featured: true,
    is_active: true,
    main_image_url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
    category_slug: "restaurantes",
    zone_slug: "centro",
    plan_name: "premium"
  },

  // Servicios Hogar en Centro
  {
    name: "Plomería Veloz",
    description: "Servicio de plomería 24/7 con técnicos certificados y garantía",
    phone: "+52 555 567 8901",
    email: "servicio@plomeriaveloz.com",
    website: "https://plomeriaveloz.com",
    address: "Calle Técnicos 321, Centro",
    hours: {
      monday: { open: "00:00", close: "23:59" },
      tuesday: { open: "00:00", close: "23:59" },
      wednesday: { open: "00:00", close: "23:59" },
      thursday: { open: "00:00", close: "23:59" },
      friday: { open: "00:00", close: "23:59" },
      saturday: { open: "00:00", close: "23:59" },
      sunday: { open: "00:00", close: "23:59" }
    },
    rating: 4.7,
    review_count: 312,
    supports_delivery: true,
    featured: false,
    is_active: true,
    main_image_url: "https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6d5?w=800",
    category_slug: "servicios-hogar",
    zone_slug: "centro",
    plan_name: "enterprise"
  }
];

async function createBusiness(business, references) {
  try {
    const { zones, categories, plans } = references;
    
    const businessData = {
      name: business.name,
      description: business.description,
      phone: business.phone,
      email: business.email,
      website: business.website,
      address: business.address,
      hours: business.hours,
      rating: business.rating,
      review_count: business.review_count,
      supports_delivery: business.supports_delivery,
      featured: business.featured,
      is_active: business.is_active,
      main_image_url: business.main_image_url,
      category: categories[business.category_slug],
      zone: zones[business.zone_slug],
      plan: plans[business.plan_name]
    };

    const response = await fetch(`${STRAPI_URL}/api/businesses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: businessData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Negocio creado: ${business.name} (ID: ${result.data.id}) - ${business.category_slug} en ${business.zone_slug}`);
    return result.data;
  } catch (error) {
    console.error(`❌ Error creando negocio ${business.name}:`, error.message);
    throw error;
  }
}

async function populateBusinesses() {
  console.log('🏢 Creando negocios...\n');

  try {
    // Obtener datos de referencia
    const references = await getReferenceData();

    // Crear negocios
    for (const business of businesses) {
      await createBusiness(business, references);
    }

    console.log('\n🎉 ¡Todos los negocios creados correctamente!');
    console.log('\n📊 Resumen:');
    const summary = businesses.reduce((acc, business) => {
      const key = `${business.category_slug}-${business.zone_slug}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    Object.entries(summary).forEach(([key, count]) => {
      const [category, zone] = key.split('-');
      console.log(`   📍 ${count} negocios de ${category} en ${zone}`);
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

populateBusinesses();