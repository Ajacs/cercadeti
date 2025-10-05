import { GacetaPage } from '@/components/gaceta-enhanced';

export const getGacetaByZone = (zone: string) => {
  const gacetas: Record<string, GacetaPage[]> = {
    'Pedregal': [
      {
        id: 1,
        title: 'Bienvenidos a Pedregal',
        content: 'En esta edición especial de la Gaceta Pedregal, te presentamos las mejores ofertas y servicios de nuestra querida zona. Desde restaurantes familiares hasta servicios profesionales, encuentra todo lo que necesitas cerca de casa.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        description: 'Tu guía completa de negocios locales'
      },
      {
        id: 2,
        title: 'Restaurante La Familia',
        content: 'Disfruta de la mejor comida casera en Restaurante La Familia. Nuestro menú incluye platos tradicionales preparados con ingredientes frescos y recetas familiares que han pasado de generación en generación. ¡Ven y prueba nuestro pollo asado especial!',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
        description: 'Comida casera con sabor tradicional',
        advertisers: [
          {
            id: 'rf1',
            name: 'Restaurante La Familia',
            logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
            description: 'Comida casera tradicional con ingredientes frescos',
            phone: '555-0123',
            email: 'info@lafamilia.com',
            website: 'www.lafamilia.com',
            offer: '20% descuento en almuerzos',
            validUntil: '31 de enero',
            category: 'Restaurantes',
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
            featured: true
          }
        ]
      },
      {
        id: 3,
        title: 'Supermercado El Ahorro',
        content: 'En Supermercado El Ahorro encuentras los mejores precios en productos frescos y de calidad. Esta semana tenemos ofertas especiales en frutas, verduras y productos de la canasta básica. ¡Ahorra más, vive mejor!',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop',
        description: 'Los mejores precios en productos frescos',
        advertisers: [
          {
            id: 'sa1',
            name: 'Supermercado El Ahorro',
            logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop',
            description: 'Productos frescos y de calidad al mejor precio',
            phone: '555-0456',
            email: 'pedidos@elahorro.com',
            website: 'www.elahorro.com',
            offer: '15% descuento en frutas y verduras',
            validUntil: '15 de febrero',
            category: 'Supermercados',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
            featured: true
          },
          {
            id: 'f1',
            name: 'Farmacia Pedregal',
            logo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop',
            description: 'Medicinas y productos de salud',
            phone: '555-0789',
            email: 'ventas@farmaciapedregal.com',
            offer: '10% descuento en medicinas',
            validUntil: '28 de febrero',
            category: 'Salud',
            image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
            featured: false
          }
        ]
      },
      {
        id: 4,
        title: 'Servicios Profesionales',
        content: 'En Pedregal contamos con profesionales certificados en plomería, electricidad y reparaciones del hogar. Servicio rápido, confiable y con garantía. ¡No busques más lejos, tenemos todo lo que necesitas!',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
        description: 'Profesionales de confianza a tu servicio'
      },
      {
        id: 5,
        title: 'Ofertas Especiales',
        content: 'Esta semana tenemos ofertas increíbles en diferentes negocios de la zona. Desde descuentos en restaurantes hasta promociones en servicios. ¡No te pierdas estas oportunidades únicas!',
        image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop',
        description: 'Aprovecha estas ofertas por tiempo limitado'
      }
    ],
    'Centro': [
      {
        id: 1,
        title: 'Centro Comercial y Cultural',
        content: 'El corazón de nuestra ciudad te ofrece una experiencia única. En esta gaceta descubrirás los mejores restaurantes, tiendas y servicios del centro histórico. ¡Conoce todo lo que el centro tiene para ofrecerte!',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        description: 'El alma de la ciudad'
      },
      {
        id: 2,
        title: 'Restaurante El Centro',
        content: 'Ubicado en el corazón del centro histórico, Restaurante El Centro ofrece una experiencia culinaria única. Nuestro chef especialista en comida local e internacional te sorprenderá con sabores auténticos y presentaciones excepcionales.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
        description: 'Sabores que definen nuestra ciudad'
      },
      {
        id: 3,
        title: 'Gym Fitness Center',
        content: 'El gimnasio más completo del centro te espera. Con equipos de última generación, clases grupales y entrenadores certificados. ¡Transforma tu vida con nosotros! Horario extendido y membresías flexibles.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
        description: 'Tu transformación comienza aquí'
      },
      {
        id: 4,
        title: 'Servicios Médicos',
        content: 'El centro cuenta con clínicas especializadas y farmacias de servicio 24 horas. Atención médica de calidad con profesionales altamente capacitados. Tu salud es nuestra prioridad.',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=400&fit=crop',
        description: 'Cuidado médico de excelencia'
      },
      {
        id: 5,
        title: 'Eventos y Cultura',
        content: 'El centro es sede de eventos culturales, ferias artesanales y celebraciones tradicionales. Mantente al día con nuestra agenda cultural y no te pierdas las actividades que hacen única a nuestra ciudad.',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop',
        description: 'Cultura y tradición en cada esquina'
      }
    ],
    'Zona Rosa': [
      {
        id: 1,
        title: 'Zona Rosa - Elegancia y Estilo',
        content: 'La Zona Rosa es el epicentro de la moda, la belleza y el entretenimiento. En esta gaceta exclusiva descubrirás las mejores boutiques, spas, restaurantes gourmet y lugares de entretenimiento que hacen de esta zona un destino único.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
        description: 'Donde la elegancia se encuentra'
      },
      {
        id: 2,
        title: 'Boutique Rosa',
        content: 'Descubre la nueva colección de primavera en Boutique Rosa. Vestidos elegantes, accesorios exclusivos y calzado de diseñador. Nuestras asesoras de imagen te ayudarán a encontrar el look perfecto para cada ocasión.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
        description: 'Moda que define tu estilo'
      },
      {
        id: 3,
        title: 'Spa Relax',
        content: 'Escápate del estrés en Spa Relax. Ofrecemos tratamientos faciales, masajes terapéuticos, manicure y pedicure de lujo. Nuestro ambiente tranquilo y profesional te garantiza una experiencia de relajación única.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=400&fit=crop',
        description: 'Relajación y bienestar total'
      },
      {
        id: 4,
        title: 'Restaurante Gourmet',
        content: 'Disfruta de una experiencia culinaria excepcional en nuestro restaurante gourmet. Menú de temporada con ingredientes frescos, vinos selectos y un ambiente sofisticado. Perfecto para ocasiones especiales.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
        description: 'Sabores que elevan tu paladar'
      },
      {
        id: 5,
        title: 'Entretenimiento Nocturno',
        content: 'La Zona Rosa cobra vida cuando cae la noche. Bares elegantes, música en vivo, y eventos exclusivos te esperan. Descubre la vida nocturna más sofisticada de la ciudad.',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop',
        description: 'Noches inolvidables te esperan'
      }
    ]
  };

  return gacetas[zone] || [];
};
