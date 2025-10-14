const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';

const categories = [
  {
    name: "Restaurantes",
    slug: "restaurantes",
    description: "Restaurantes y establecimientos de comida",
    icon: "UtensilsCrossed",
    color: "#FF6B6B",
    is_active: true,
    sort_order: 1
  },
  {
    name: "Supermercados",
    slug: "supermercados",
    description: "Supermercados y tiendas de abarrotes",
    icon: "ShoppingCart",
    color: "#4ECDC4",
    is_active: true,
    sort_order: 2
  },
  {
    name: "Abarrotes",
    slug: "abarrotes",
    description: "Tiendas de abarrotes y productos básicos",
    icon: "Store",
    color: "#FFB74D",
    is_active: true,
    sort_order: 3
  },
  {
    name: "Servicios Hogar",
    slug: "servicios-hogar",
    description: "Servicios para el hogar y mantenimiento",
    icon: "Home",
    color: "#45B7D1",
    is_active: true,
    sort_order: 4
  },
  {
    name: "Mascotas",
    slug: "mascotas",
    description: "Servicios y productos para mascotas",
    icon: "Heart",
    color: "#96CEB4",
    is_active: true,
    sort_order: 5
  },
  {
    name: "Transporte",
    slug: "transporte",
    description: "Servicios de transporte y logística",
    icon: "Car",
    color: "#FFEAA7",
    is_active: true,
    sort_order: 6
  },
  {
    name: "Salud",
    slug: "salud",
    description: "Servicios médicos y de salud",
    icon: "Heart",
    color: "#DDA0DD",
    is_active: true,
    sort_order: 7
  },
  {
    name: "Belleza",
    slug: "belleza",
    description: "Salones de belleza y estética",
    icon: "Sparkles",
    color: "#FFB6C1",
    is_active: true,
    sort_order: 8
  },
  {
    name: "Deportes",
    slug: "deportes",
    description: "Gimnasios y actividades deportivas",
    icon: "Dumbbell",
    color: "#87CEEB",
    is_active: true,
    sort_order: 9
  },
  {
    name: "Educación",
    slug: "educacion",
    description: "Instituciones educativas y capacitación",
    icon: "GraduationCap",
    color: "#98D8C8",
    is_active: true,
    sort_order: 10
  },
  {
    name: "Entretenimiento",
    slug: "entretenimiento",
    description: "Cines, teatros y entretenimiento",
    icon: "Film",
    color: "#F7DC6F",
    is_active: true,
    sort_order: 11
  },
  {
    name: "Fotografía",
    slug: "fotografia",
    description: "Servicios fotográficos y eventos",
    icon: "Camera",
    color: "#BB8FCE",
    is_active: true,
    sort_order: 12
  },
  {
    name: "Moda",
    slug: "moda",
    description: "Tiendas de ropa y accesorios",
    icon: "Shirt",
    color: "#85C1E9",
    is_active: true,
    sort_order: 13
  }
];

async function createCategory(category) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: category }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Categoría creada: ${category.name} (ID: ${result.data.id})`);
    return result.data;
  } catch (error) {
    console.error(`❌ Error creando categoría ${category.name}:`, error.message);
    throw error;
  }
}

async function populateCategories() {
  console.log('📂 Creando categorías...\n');

  try {
    for (const category of categories) {
      await createCategory(category);
    }

    console.log('\n🎉 ¡Todas las categorías creadas correctamente!');
    console.log('\n📋 Categorías disponibles:');
    categories.forEach(category => {
      console.log(`   - ${category.name} (${category.slug}) - ${category.color}`);
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

populateCategories();
