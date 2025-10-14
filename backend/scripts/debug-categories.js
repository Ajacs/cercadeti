const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Cambiar esta URL según tu entorno
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

async function debugCategories() {
  console.log('🔍 Diagnóstico de Categorías y Negocios\n');
  console.log(`📍 Conectando a: ${STRAPI_URL}\n`);

  try {
    // 1. Obtener todas las categorías
    console.log('📂 Categorías registradas:');
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/categories?sort=sort_order:asc`);
    const categoriesData = await categoriesResponse.json();

    if (categoriesData.data && categoriesData.data.length > 0) {
      categoriesData.data.forEach(cat => {
        const isActive = cat.is_active || cat.attributes?.is_active;
        const name = cat.name || cat.attributes?.name;
        const slug = cat.slug || cat.attributes?.slug;
        console.log(`   ${isActive ? '✅' : '❌'} ${name} (slug: "${slug}") - ID: ${cat.id}`);
      });
    } else {
      console.log('   ⚠️  No hay categorías registradas');
    }

    // 2. Obtener todos los negocios con sus categorías
    console.log('\n📦 Negocios y sus categorías:');
    const businessesResponse = await fetch(`${STRAPI_URL}/api/businesses?populate=category,zone`);
    const businessesData = await businessesResponse.json();

    if (businessesData.data && businessesData.data.length > 0) {
      const businessesByCategory = {};

      businessesData.data.forEach(business => {
        const businessName = business.name || business.attributes?.name;
        const categoryData = business.category || business.attributes?.category;

        let categoryName = 'Sin categoría';
        let categorySlug = 'sin-categoria';

        if (categoryData) {
          if (categoryData.data) {
            // Formato nuevo de Strapi
            categoryName = categoryData.data.attributes?.name || categoryData.data.name || 'Sin nombre';
            categorySlug = categoryData.data.attributes?.slug || categoryData.data.slug || 'sin-slug';
          } else if (categoryData.name) {
            // Formato directo
            categoryName = categoryData.name;
            categorySlug = categoryData.slug || 'sin-slug';
          }
        }

        if (!businessesByCategory[categorySlug]) {
          businessesByCategory[categorySlug] = {
            name: categoryName,
            slug: categorySlug,
            businesses: []
          };
        }

        businessesByCategory[categorySlug].businesses.push(businessName);
      });

      // Mostrar agrupado por categoría
      Object.values(businessesByCategory).forEach(cat => {
        console.log(`\n   📁 ${cat.name} (slug: "${cat.slug}") - ${cat.businesses.length} negocio(s):`);
        cat.businesses.forEach(biz => {
          console.log(`      • ${biz}`);
        });
      });

      console.log(`\n📊 Total de negocios: ${businessesData.data.length}`);
    } else {
      console.log('   ⚠️  No hay negocios registrados');
    }

    // 3. Buscar específicamente la categoría "Abarrotes"
    console.log('\n\n🔎 Buscando categoría "Abarrotes" específicamente:');
    const abarrotesResponse = await fetch(`${STRAPI_URL}/api/categories?filters[slug][$eq]=abarrotes`);
    const abarrotesData = await abarrotesResponse.json();

    if (abarrotesData.data && abarrotesData.data.length > 0) {
      const abarrotes = abarrotesData.data[0];
      const name = abarrotes.name || abarrotes.attributes?.name;
      const slug = abarrotes.slug || abarrotes.attributes?.slug;
      const isActive = abarrotes.is_active || abarrotes.attributes?.is_active;

      console.log(`   ✅ Encontrada: "${name}"`);
      console.log(`   📝 Slug: "${slug}"`);
      console.log(`   🔄 Activa: ${isActive ? 'Sí' : 'No'}`);
      console.log(`   🆔 ID: ${abarrotes.id}`);

      // Buscar negocios con esta categoría
      console.log('\n   🏪 Negocios con esta categoría:');
      const abarrotesBusinessResponse = await fetch(
        `${STRAPI_URL}/api/businesses?filters[category][slug][$eq]=abarrotes&populate=category`
      );
      const abarrotesBusinessData = await abarrotesBusinessResponse.json();

      if (abarrotesBusinessData.data && abarrotesBusinessData.data.length > 0) {
        abarrotesBusinessData.data.forEach(biz => {
          const bizName = biz.name || biz.attributes?.name;
          console.log(`      ✓ ${bizName}`);
        });
      } else {
        console.log('      ⚠️  NO HAY NEGOCIOS con esta categoría');
        console.log('      💡 Esto explica por qué no aparece en el frontend');
      }
    } else {
      console.log('   ❌ NO encontrada - La categoría "Abarrotes" no existe en la base de datos');
      console.log('   💡 Necesitas crearla primero o usar una categoría existente');
    }

    console.log('\n✅ Diagnóstico completado\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

debugCategories();
