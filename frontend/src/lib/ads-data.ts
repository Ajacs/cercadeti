import { Ad } from '@/components/ads-carousel';

export const mockAds: Ad[] = [
  // Anuncios para la landing page (grandes marcas)
  {
    id: '1',
    title: 'McDonald\'s - Big Mac Special',
    description: 'Disfruta de nuestro Big Mac clásico con papas y bebida por solo $8.99. ¡Oferta válida por tiempo limitado!',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png',
    brand: 'McDonald\'s',
    category: 'Restaurantes',
    discount: '30% OFF',
    validUntil: '31 de diciembre',
    link: 'https://mcdonalds.com',
    featured: true,
    type: 'banner'
  },
  {
    id: '2',
    title: 'Walmart - Descuentos del Mes',
    description: 'Encuentra los mejores precios en productos para el hogar. ¡Ahorra hasta un 50% en artículos seleccionados!',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Walmart-Logo.png',
    brand: 'Walmart',
    category: 'Supermercados',
    discount: '50% OFF',
    validUntil: '15 de enero',
    link: 'https://walmart.com',
    featured: true,
    type: 'card'
  },
  {
    id: '3',
    title: 'Starbucks - Café Premium',
    description: 'Descubre nuestros nuevos sabores de temporada. ¡Prueba el Pumpkin Spice Latte por tiempo limitado!',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
    logo: 'https://logos-world.net/wp-content/uploads/2017/06/Starbucks-Logo.png',
    brand: 'Starbucks',
    category: 'Restaurantes',
    discount: '20% OFF',
    validUntil: '28 de febrero',
    link: 'https://starbucks.com',
    featured: false,
    type: 'card'
  },
  {
    id: '4',
    title: 'Nike - Nueva Colección',
    description: 'Lanza tu estilo con la nueva colección de Nike. Zapatos deportivos con tecnología de vanguardia.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png',
    brand: 'Nike',
    category: 'Deportes',
    discount: '25% OFF',
    validUntil: '20 de enero',
    link: 'https://nike.com',
    featured: true,
    type: 'banner'
  },
  {
    id: '5',
    title: 'Apple - iPhone 15',
    description: 'Descubre el iPhone 15 con las mejores funciones. ¡Financiamiento disponible hasta 24 meses sin intereses!',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png',
    brand: 'Apple',
    category: 'Tecnología',
    discount: 'Financiamiento 0%',
    validUntil: '31 de marzo',
    link: 'https://apple.com',
    featured: true,
    type: 'card'
  },
  {
    id: '6',
    title: 'Amazon Prime - Envío Gratis',
    description: 'Únete a Amazon Prime y disfruta de envío gratis en millones de productos. ¡Prueba gratis por 30 días!',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png',
    brand: 'Amazon',
    category: 'Tecnología',
    discount: '30 días gratis',
    validUntil: 'Siempre disponible',
    link: 'https://amazon.com',
    featured: false,
    type: 'card'
  }
];

// Anuncios específicos por zona
export const getAdsByZone = (zone: string): Ad[] => {
  const zoneAds: Record<string, Ad[]> = {
    'Pedregal': [
      {
        id: 'p1',
        title: 'Farmacia Pedregal - Descuentos en Medicinas',
        description: 'Medicinas con descuento del 20% para afiliados. Consulta médica gratuita los fines de semana.',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
        logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop',
        brand: 'Farmacia Pedregal',
        category: 'Salud',
        discount: '20% OFF',
        validUntil: '28 de febrero',
        link: '#',
        zone: 'Pedregal',
        type: 'card'
      },
      {
        id: 'p2',
        title: 'Supermercado El Ahorro - Ofertas del Mes',
        description: 'Productos frescos con descuentos especiales. Frutas y verduras orgánicas de la región.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
        logo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop',
        brand: 'Supermercado El Ahorro',
        category: 'Supermercados',
        discount: '15% OFF',
        validUntil: '15 de enero',
        link: '#',
        zone: 'Pedregal',
        type: 'banner'
      }
    ],
    'Centro': [
      {
        id: 'c1',
        title: 'Restaurante El Centro - Menú Ejecutivo',
        description: 'Almuerzo ejecutivo por solo $12.99. Incluye entrada, plato principal y postre.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
        brand: 'Restaurante El Centro',
        category: 'Restaurantes',
        discount: '25% OFF',
        validUntil: '31 de enero',
        link: '#',
        zone: 'Centro',
        type: 'card'
      },
      {
        id: 'c2',
        title: 'Gym Fitness Center - Membresía Premium',
        description: 'Únete a nuestro gym con acceso 24/7. ¡Primer mes gratis para nuevos miembros!',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
        brand: 'Gym Fitness Center',
        category: 'Deportes',
        discount: 'Primer mes gratis',
        validUntil: '28 de febrero',
        link: '#',
        zone: 'Centro',
        type: 'banner'
      }
    ],
    'Zona Rosa': [
      {
        id: 'z1',
        title: 'Boutique Rosa - Nueva Colección',
        description: 'Descubre la nueva colección de primavera. Vestidos y accesorios con estilo único.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
        logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
        brand: 'Boutique Rosa',
        category: 'Moda',
        discount: '30% OFF',
        validUntil: '20 de marzo',
        link: '#',
        zone: 'Zona Rosa',
        type: 'card'
      },
      {
        id: 'z2',
        title: 'Spa Relax - Tratamientos Premium',
        description: 'Relájate con nuestros tratamientos de spa. Masajes y terapias de relajación.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
        logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100&h=100&fit=crop',
        brand: 'Spa Relax',
        category: 'Belleza',
        discount: '40% OFF',
        validUntil: '15 de febrero',
        link: '#',
        zone: 'Zona Rosa',
        type: 'banner'
      }
    ]
  };

  return zoneAds[zone] || [];
};

