#!/usr/bin/env node

/**
 * Script para actualizar los iconos de las categorías existentes
 */

const STRAPI_URL = 'http://localhost:1337';

const categoryUpdates = {
  'restaurantes': { icon: 'UtensilsCrossed', color: '#FF6B6B', description: 'Deliciosos restaurantes y cafeterías' },
  'supermercados': { icon: 'ShoppingCart', color: '#4ECDC4', description: 'Supermercados y tiendas de conveniencia' },
  'servicios-hogar': { icon: 'Wrench', color: '#45B7D1', description: 'Plomería, electricidad y reparaciones' },
  'mascotas': { icon: 'Heart', color: '#F39C12', description: 'Productos y servicios para mascotas' },
  'transporte': { icon: 'Car', color: '#9B59B6', description: 'Taxi, Uber, transporte público y servicios de movilidad' },
  'salud': { icon: 'Stethoscope', color: '#E74C3C', description: 'Clínicas, farmacias y servicios médicos' },
  'belleza': { icon: 'Scissors', color: '#E91E63', description: 'Salones de belleza, barberías y estéticas' },
  'deportes': { icon: 'Dumbbell', color: '#FF9800', description: 'Gimnasios, tiendas deportivas y actividades físicas' },
  'educacion': { icon: 'BookOpen', color: '#2196F3', description: 'Escuelas, academias y centros de capacitación' },
  'entretenimiento': { icon: 'Music', color: '#9C27B0', description: 'Cines, teatros, bares y lugares de diversión' },
  'fotografia': { icon: 'Camera', color: '#607D8B', description: 'Estudios fotográficos y servicios de imagen' },
  'moda': { icon: 'Shirt', color: '#795548', description: 'Boutiques, tiendas de ropa y accesorios' }
};

async function updateCategories() {
  try {
    console.log('🔍 Obteniendo categorías existentes...');

    // Obtener todas las categorías
    const response = await fetch(`${STRAPI_URL}/api/categories?pagination[pageSize]=100`);
    const data = await response.json();

    if (!data.data) {
      console.error('❌ No se pudieron obtener las categorías');
      return;
    }

    console.log(`📋 Encontradas ${data.data.length} categorías`);

    // Actualizar cada categoría
    for (const category of data.data) {
      const slug = category.slug;
      const update = categoryUpdates[slug];

      if (!update) {
        console.log(`⚠️  No hay actualización para: ${category.name} (${slug})`);
        continue;
      }

      console.log(`🔄 Actualizando: ${category.name}...`);

      try {
        const updateResponse = await fetch(`${STRAPI_URL}/api/categories/${category.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: update
          })
        });

        if (updateResponse.ok) {
          console.log(`✅ ${category.name} actualizado con ícono ${update.icon}`);
        } else {
          const error = await updateResponse.json();
          console.error(`❌ Error actualizando ${category.name}:`, error);
        }
      } catch (error) {
        console.error(`❌ Error en ${category.name}:`, error.message);
      }
    }

    console.log('\n🎉 ¡Actualización completada!');

  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar
updateCategories();
