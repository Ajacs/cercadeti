const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';

const zones = [
  {
    name: "Pedregal",
    slug: "pedregal",
    description: "Zona residencial de alta calidad con amplios espacios verdes",
    is_active: true,
    sort_order: 1
  },
  {
    name: "Centro",
    slug: "centro",
    description: "Zona comercial y cultural del centro de la ciudad",
    is_active: true,
    sort_order: 2
  },
  {
    name: "Zona Norte",
    slug: "zona-norte",
    description: "Área de rápido crecimiento con nuevos desarrollos",
    is_active: true,
    sort_order: 3
  }
];

async function createZone(zone) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/zones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: zone }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Zona creada: ${zone.name} (ID: ${result.data.id})`);
    return result.data;
  } catch (error) {
    console.error(`❌ Error creando zona ${zone.name}:`, error.message);
    throw error;
  }
}

async function populateZones() {
  console.log('🌍 Creando zonas...\n');

  try {
    for (const zone of zones) {
      await createZone(zone);
    }

    console.log('\n🎉 ¡Todas las zonas creadas correctamente!');
    console.log('\n📋 Zonas disponibles:');
    zones.forEach(zone => {
      console.log(`   - ${zone.name} (${zone.slug})`);
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

populateZones();
