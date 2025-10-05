#!/usr/bin/env node

/**
 * Script para crear datos de prueba (seed data) para CercaDeTi
 * Este script crea datos de ejemplo para todas las entidades del sistema
 */

const fs = require('fs');
const path = require('path');

class SeedDataGenerator {
  constructor() {
    this.outputDir = path.join(__dirname);
  }

  /**
   * Genera datos de prueba para business_plans
   */
  generateBusinessPlans() {
    return [
      {
        name: 'Plan Básico',
        description: 'Plan perfecto para pequeños negocios que quieren comenzar',
        price: 99.00,
        currency: 'MXN',
        features: [
          '1 anuncio destacado',
          '1 oferta especial',
          'Perfil básico del negocio',
          'Soporte por email',
          'Estadísticas básicas'
        ],
        duration_days: 30,
        max_ads: 1,
        max_offers: 1,
        active: true,
        sort_order: 1
      },
      {
        name: 'Plan Premium',
        description: 'Ideal para negocios en crecimiento que buscan más visibilidad',
        price: 299.00,
        currency: 'MXN',
        features: [
          '5 anuncios destacados',
          '3 ofertas especiales',
          'Perfil completo del negocio',
          'Soporte prioritario',
          'Estadísticas avanzadas',
          'Badge "Verificado"',
          'Prioridad en búsquedas'
        ],
        duration_days: 30,
        max_ads: 5,
        max_offers: 3,
        active: true,
        sort_order: 2
      },
      {
        name: 'Plan Empresarial',
        description: 'Para grandes empresas que necesitan máxima exposición',
        price: 599.00,
        currency: 'MXN',
        features: [
          'Anuncios ilimitados',
          'Ofertas ilimitadas',
          'Perfil premium con galería',
          'Soporte 24/7',
          'Analytics completos',
          'Badge "Premium"',
          'Posición destacada garantizada',
          'Integración con redes sociales',
          'Reportes personalizados'
        ],
        duration_days: 30,
        max_ads: -1, // Ilimitado
        max_offers: -1, // Ilimitado
        active: true,
        sort_order: 3
      }
    ];
  }

  /**
   * Genera datos de prueba para zones
   */
  generateZones() {
    return [
      {
        name: 'Pedregal',
        slug: 'pedregal',
        description: 'Zona residencial de lujo con excelentes restaurantes y servicios',
        is_active: true,
        sort_order: 1
      },
      {
        name: 'Condesa',
        slug: 'condesa',
        description: 'Colonia bohemia con cafés, bares y vida nocturna',
        is_active: true,
        sort_order: 2
      },
      {
        name: 'Roma Norte',
        slug: 'roma-norte',
        description: 'Zona trendy con restaurantes gourmet y boutiques',
        is_active: true,
        sort_order: 3
      },
      {
        name: 'Polanco',
        slug: 'polanco',
        description: 'Distrito comercial y residencial de alta gama',
        is_active: true,
        sort_order: 4
      },
      {
        name: 'Centro Histórico',
        slug: 'centro-historico',
        description: 'Corazón histórico de la ciudad con tradición y modernidad',
        is_active: true,
        sort_order: 5
      },
      {
        name: 'Coyoacán',
        slug: 'coyoacan',
        description: 'Barrio mágico con cultura, arte y gastronomía tradicional',
        is_active: true,
        sort_order: 6
      },
      {
        name: 'Santa Fe',
        slug: 'santa-fe',
        description: 'Centro financiero moderno con oficinas y comercios',
        is_active: true,
        sort_order: 7
      }
    ];
  }

  /**
   * Genera datos de prueba para categories
   */
  generateCategories() {
    return [
      {
        name: 'Restaurantes',
        slug: 'restaurantes',
        description: 'Deliciosos restaurantes y cafeterías',
        icon: 'UtensilsCrossed',
        color: '#FF6B6B',
        is_active: true,
        sort_order: 1
      },
      {
        name: 'Supermercados',
        slug: 'supermercados',
        description: 'Supermercados y tiendas de conveniencia',
        icon: 'ShoppingCart',
        color: '#4ECDC4',
        is_active: true,
        sort_order: 2
      },
      {
        name: 'Servicios Hogar',
        slug: 'servicios-hogar',
        description: 'Plomería, electricidad y reparaciones',
        icon: 'Wrench',
        color: '#45B7D1',
        is_active: true,
        sort_order: 3
      },
      {
        name: 'Mascotas',
        slug: 'mascotas',
        description: 'Productos y servicios para mascotas',
        icon: 'Heart',
        color: '#F39C12',
        is_active: true,
        sort_order: 4
      },
      {
        name: 'Transporte',
        slug: 'transporte',
        description: 'Taxi, Uber, transporte público y servicios de movilidad',
        icon: 'Car',
        color: '#9B59B6',
        is_active: true,
        sort_order: 5
      },
      {
        name: 'Salud',
        slug: 'salud',
        description: 'Clínicas, farmacias y servicios médicos',
        icon: 'Stethoscope',
        color: '#E74C3C',
        is_active: true,
        sort_order: 6
      },
      {
        name: 'Belleza',
        slug: 'belleza',
        description: 'Salones de belleza, barberías y estéticas',
        icon: 'Scissors',
        color: '#E91E63',
        is_active: true,
        sort_order: 7
      },
      {
        name: 'Deportes',
        slug: 'deportes',
        description: 'Gimnasios, tiendas deportivas y actividades físicas',
        icon: 'Dumbbell',
        color: '#FF9800',
        is_active: true,
        sort_order: 8
      },
      {
        name: 'Educación',
        slug: 'educacion',
        description: 'Escuelas, academias y centros de capacitación',
        icon: 'BookOpen',
        color: '#2196F3',
        is_active: true,
        sort_order: 9
      },
      {
        name: 'Entretenimiento',
        slug: 'entretenimiento',
        description: 'Cines, teatros, bares y lugares de diversión',
        icon: 'Music',
        color: '#9C27B0',
        is_active: true,
        sort_order: 10
      },
      {
        name: 'Fotografía',
        slug: 'fotografia',
        description: 'Estudios fotográficos y servicios de imagen',
        icon: 'Camera',
        color: '#607D8B',
        is_active: true,
        sort_order: 11
      },
      {
        name: 'Moda',
        slug: 'moda',
        description: 'Boutiques, tiendas de ropa y accesorios',
        icon: 'Shirt',
        color: '#795548',
        is_active: true,
        sort_order: 12
      }
    ];
  }

  /**
   * Genera datos de prueba para businesses
   */
  generateBusinesses() {
    const businesses = [];
    const categories = this.generateCategories();
    const zones = this.generateZones();
    const plans = this.generateBusinessPlans();

    // Restaurantes
    businesses.push(
      {
        name: 'Sushi Central',
        description: 'El mejor sushi de la ciudad, con ingredientes frescos importados directamente de Japón y recetas innovadoras que combinan tradición y modernidad.',
        email: 'info@sushicentral.com',
        phone: '+52 55 1234 5678',
        website: 'www.sushicentral.com',
        address: 'Av. Reforma 123, Col. Juárez, CDMX',
        main_image_url: 'https://picsum.photos/id/1060/600/400',
        gallery_urls: [
          'https://picsum.photos/id/1060/600/400',
          'https://picsum.photos/id/1061/600/400',
          'https://picsum.photos/id/1062/600/400'
        ],
        hours: {
          monday: { open: '12:00', close: '22:00' },
          tuesday: { open: '12:00', close: '22:00' },
          wednesday: { open: '12:00', close: '22:00' },
          thursday: { open: '12:00', close: '22:00' },
          friday: { open: '12:00', close: '23:00' },
          saturday: { open: '12:00', close: '23:00' },
          sunday: { open: '12:00', close: '21:00' }
        },
        rating: 4.8,
        review_count: 156,
        featured: true,
        offer: false,
        is_active: true,
        is_verified: true,
        supports_delivery: true,
        delivery_time: '25-35 min',
        delivery_fee: 25.00,
        category_id: 1, // Restaurantes
        zone_id: 1, // Pedregal
        plan_id: 2 // Premium
      },
      {
        name: 'Tacos "El Campeón"',
        description: 'Los tacos al pastor que te harán volver. Sabor auténtico y tradicional con más de 30 años de experiencia.',
        phone: '+52 55 3456 7890',
        address: 'Esquina Insurgentes y Viaducto, CDMX',
        main_image_url: 'https://picsum.photos/id/20/600/400',
        hours: {
          monday: { open: '18:00', close: '02:00' },
          tuesday: { open: '18:00', close: '02:00' },
          wednesday: { open: '18:00', close: '02:00' },
          thursday: { open: '18:00', close: '02:00' },
          friday: { open: '18:00', close: '03:00' },
          saturday: { open: '18:00', close: '03:00' },
          sunday: { open: '00:00', close: '00:00', closed: true }
        },
        rating: 4.9,
        review_count: 89,
        featured: true,
        offer: true,
        offer_text: '2x1 en tacos al pastor los martes',
        is_active: true,
        is_verified: true,
        supports_delivery: true,
        delivery_time: '20-30 min',
        delivery_fee: 15.00,
        category_id: 1, // Restaurantes
        zone_id: 3, // Roma Norte
        plan_id: 1 // Básico
      }
    );

    // Supermercados
    businesses.push({
      name: 'Mercado Express',
      description: 'Tus compras del súper en minutos. Frutas, verduras, carnes y más productos frescos directo a tu puerta.',
      email: 'contacto@mercadoexpress.mx',
      phone: '+52 55 2345 6789',
      address: 'Calle Comercio 456, Col. Centro, CDMX',
      main_image_url: 'https://picsum.photos/id/1078/600/400',
      hours: {
        monday: { open: '07:00', close: '23:00' },
        tuesday: { open: '07:00', close: '23:00' },
        wednesday: { open: '07:00', close: '23:00' },
        thursday: { open: '07:00', close: '23:00' },
        friday: { open: '07:00', close: '23:00' },
        saturday: { open: '07:00', close: '23:00' },
        sunday: { open: '08:00', close: '22:00' }
      },
      rating: 4.9,
      review_count: 234,
      featured: true,
      offer: true,
      offer_text: 'Descuento del 15% en tu primera compra',
      is_active: true,
      is_verified: true,
      supports_delivery: true,
      delivery_time: '15-20 min',
      delivery_fee: 30.00,
      category_id: 2, // Supermercados
      zone_id: 1, // Pedregal
      plan_id: 2 // Premium
    });

    // Servicios Hogar
    businesses.push(
      {
        name: 'Plomería Veloz',
        description: 'Soluciones rápidas y eficientes para cualquier problema de plomería en tu hogar. Servicio 24/7.',
        phone: '+52 55 4567 8901',
        rating: 4.7,
        review_count: 67,
        featured: false,
        offer: false,
        is_active: true,
        is_verified: true,
        supports_delivery: false,
        category_id: 3, // Servicios Hogar
        zone_id: 2, // Condesa
        plan_id: 1 // Básico
      },
      {
        name: 'ReparaTodo',
        description: 'Electricidad, pintura y reparaciones generales. Profesionales de confianza con más de 10 años de experiencia.',
        phone: '+52 55 5678 9012',
        rating: 4.8,
        review_count: 45,
        featured: false,
        offer: false,
        is_active: true,
        is_verified: true,
        supports_delivery: false,
        category_id: 3, // Servicios Hogar
        zone_id: 2, // Condesa
        plan_id: 1 // Básico
      }
    );

    // Mascotas
    businesses.push({
      name: 'Pet Palace',
      description: 'Todo para tu mejor amigo. Alimento, juguetes y accesorios de la mejor calidad para mascotas.',
      address: 'Av. Mascotas 789, Polanco',
      main_image_url: 'https://picsum.photos/id/257/600/400',
      rating: 4.8,
      review_count: 123,
      featured: false,
      offer: false,
      is_active: true,
      is_verified: true,
      supports_delivery: true,
      delivery_time: '30-45 min',
      delivery_fee: 20.00,
      category_id: 4, // Mascotas
      zone_id: 4, // Polanco
      plan_id: 1 // Básico
    });

    // Transporte
    businesses.push({
      name: 'Taxi Express Pedregal',
      description: 'Servicio de taxi confiable y puntual en la zona del Pedregal. Vehículos cómodos y conductores certificados.',
      phone: '+52 55 6789 0123',
      address: 'Av. Pedregal 789, Pedregal',
      hours: {
        monday: { open: '00:00', close: '23:59' },
        tuesday: { open: '00:00', close: '23:59' },
        wednesday: { open: '00:00', close: '23:59' },
        thursday: { open: '00:00', close: '23:59' },
        friday: { open: '00:00', close: '23:59' },
        saturday: { open: '00:00', close: '23:59' },
        sunday: { open: '00:00', close: '23:59' }
      },
      rating: 4.7,
      review_count: 89,
      featured: false,
      offer: false,
      is_active: true,
      is_verified: true,
      supports_delivery: false,
      delivery_time: '5-10 min',
      category_id: 5, // Transporte
      zone_id: 1, // Pedregal
      plan_id: 1 // Básico
    });

    // Salud
    businesses.push({
      name: 'Clínica Dental Sonrisa',
      description: 'Atención dental integral con tecnología de vanguardia. Especialistas certificados y equipos modernos.',
      email: 'contacto@sonrisa.com',
      phone: '+52 55 7890 1234',
      address: 'Calle Salud 321, Roma Norte',
      website: 'www.sonrisa.com',
      main_image_url: 'https://picsum.photos/id/161/600/400',
      hours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '16:00' },
        saturday: { open: '09:00', close: '14:00' },
        sunday: { open: '00:00', close: '00:00', closed: true }
      },
      rating: 4.9,
      review_count: 78,
      featured: true,
      offer: false,
      is_active: true,
      is_verified: true,
      supports_delivery: false,
      category_id: 6, // Salud
      zone_id: 3, // Roma Norte
      plan_id: 2 // Premium
    });

    return businesses;
  }

  /**
   * Genera datos de prueba para offers
   */
  generateOffers() {
    return [
      {
        name: 'Descuento en Tacos al Pastor',
        description: '2x1 en tacos al pastor todos los martes',
        discount_percentage: 50.00,
        original_price: 60.00,
        offer_price: 30.00,
        currency: 'MXN',
        image_url: 'https://picsum.photos/id/20/400/300',
        is_active: true,
        valid_until: '2024-12-31T23:59:59Z',
        terms_conditions: 'Válido solo los martes. No acumulable con otras promociones.',
        business_id: 2 // Tacos "El Campeón"
      },
      {
        name: 'Primera Compra con Descuento',
        description: 'Descuento del 15% en tu primera compra',
        discount_percentage: 15.00,
        original_price: 1000.00,
        offer_price: 850.00,
        currency: 'MXN',
        image_url: 'https://picsum.photos/id/1078/400/300',
        is_active: true,
        valid_until: '2024-12-31T23:59:59Z',
        terms_conditions: 'Solo para nuevos clientes. Código: PRIMERA15',
        business_id: 3 // Mercado Express
      }
    ];
  }

  /**
   * Genera datos de prueba para ads
   */
  generateAds() {
    return [
      {
        name: 'Sushi Central - Promoción Especial',
        description: 'Disfruta del mejor sushi con 20% de descuento en pedidos mayores a $500',
        image_url: 'https://picsum.photos/id/1060/600/400',
        link_url: 'https://sushicentral.com/promocion',
        is_active: true,
        valid_until: '2024-12-31T23:59:59Z',
        priority: 10,
        click_count: 45,
        view_count: 1234,
        business_id: 1 // Sushi Central
      },
      {
        name: 'Mercado Express - Delivery Gratis',
        description: 'Delivery gratis en pedidos mayores a $300. ¡Ordena ya!',
        image_url: 'https://picsum.photos/id/1078/600/400',
        link_url: 'https://mercadoexpress.mx/delivery-gratis',
        is_active: true,
        valid_until: '2024-12-31T23:59:59Z',
        priority: 8,
        click_count: 67,
        view_count: 2156,
        business_id: 3 // Mercado Express
      },
      {
        name: 'Clínica Dental Sonrisa - Limpieza Gratis',
        description: 'Consulta y limpieza dental gratuita. ¡Agenda tu cita!',
        image_url: 'https://picsum.photos/id/161/600/400',
        link_url: 'https://sonrisa.com/consulta-gratis',
        is_active: true,
        valid_until: '2024-11-30T23:59:59Z',
        priority: 12,
        click_count: 23,
        view_count: 789,
        business_id: 6 // Clínica Dental Sonrisa
      }
    ];
  }

  /**
   * Genera todos los datos de prueba
   */
  generateAllSeedData() {
    return {
      business_plans: this.generateBusinessPlans(),
      zones: this.generateZones(),
      categories: this.generateCategories(),
      businesses: this.generateBusinesses(),
      offers: this.generateOffers(),
      ads: this.generateAds()
    };
  }

  /**
   * Guarda los datos de prueba en archivos JSON
   */
  saveSeedData() {
    const data = this.generateAllSeedData();
    
    // Crear directorio si no existe
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Guardar cada conjunto de datos
    Object.keys(data).forEach(key => {
      const filename = path.join(this.outputDir, `${key}.json`);
      fs.writeFileSync(filename, JSON.stringify(data[key], null, 2));
      console.log(`✅ Datos de ${key} guardados en: ${filename}`);
    });

    // Guardar archivo consolidado
    const consolidatedFile = path.join(this.outputDir, 'seed-data.json');
    fs.writeFileSync(consolidatedFile, JSON.stringify(data, null, 2));
    console.log(`✅ Datos consolidados guardados en: ${consolidatedFile}`);

    // Generar resumen
    const summary = Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key].length;
      return acc;
    }, {});

    console.log('\n📊 Resumen de datos generados:');
    console.log('=' .repeat(40));
    Object.entries(summary).forEach(([key, count]) => {
      console.log(`${key.padEnd(20)} ${count} registros`);
    });
    console.log('=' .repeat(40));
    console.log(`Total de registros: ${Object.values(summary).reduce((a, b) => a + b, 0)}`);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const generator = new SeedDataGenerator();
  generator.saveSeedData();
}

module.exports = SeedDataGenerator;
