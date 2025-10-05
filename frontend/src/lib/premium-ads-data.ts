export interface PremiumAd {
  id: string;
  title: string;
  description: string;
  image: string;
  logo: string;
  brand: string;
  category: string;
  discount?: string;
  validUntil?: string;
  link: string;
  featured?: boolean;
  zone?: string;
  type: 'hero' | 'premium' | 'spotlight';
  stats?: {
    views?: number;
    clicks?: number;
    conversion?: number;
  };
  highlights?: string[];
}

export const premiumAds: PremiumAd[] = [
  {
    id: 'hero-1',
    title: 'Black Friday Exclusivo',
    description: 'Hasta 70% de descuento en productos seleccionados. Ofertas limitadas solo para nuestros usuarios premium.',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
    brand: 'TechStore',
    category: 'Tecnología',
    discount: '70% OFF',
    validUntil: '30 de Noviembre',
    link: 'https://techstore.com/black-friday',
    featured: true,
    zone: 'Centro',
    type: 'hero',
    stats: {
      views: 15420,
      clicks: 892,
      conversion: 12.5
    },
    highlights: ['Envío Gratis', 'Garantía Extendida', 'Soporte 24/7']
  },
  {
    id: 'hero-2',
    title: 'Gran Inauguración',
    description: 'Nueva tienda en el centro de la ciudad. Ven a conocer nuestros productos únicos con descuentos especiales.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    logo: 'https://images.unsplash.com/photo-1599305445771-98809329a8c4?w=100&h=100&fit=crop',
    brand: 'Fashion Hub',
    category: 'Moda',
    discount: '50% OFF',
    validUntil: '15 de Diciembre',
    link: 'https://fashionhub.com/grand-opening',
    featured: true,
    zone: 'Centro',
    type: 'hero',
    stats: {
      views: 8930,
      clicks: 445,
      conversion: 8.2
    },
    highlights: ['Productos Exclusivos', 'Asesoría Personal', 'Cambios Gratis']
  },
  {
    id: 'premium-1',
    title: 'Restaurante Gourmet',
    description: 'Experiencia culinaria única con ingredientes frescos y chefs especializados.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop',
    brand: 'La Mesa',
    category: 'Restaurantes',
    discount: '30% OFF',
    validUntil: '31 de Diciembre',
    link: 'https://lamesa.com/ofertas',
    featured: true,
    zone: 'Pedregosa',
    type: 'premium',
    stats: {
      views: 5670,
      clicks: 234,
      conversion: 15.8
    },
    highlights: ['Cocina Internacional', 'Ambiente Elegante', 'Reservas Online']
  },
  {
    id: 'premium-2',
    title: 'Spa & Wellness',
    description: 'Relájate y rejuvenece con nuestros tratamientos de spa de lujo.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
    brand: 'Zen Spa',
    category: 'Belleza',
    discount: '40% OFF',
    validUntil: '20 de Diciembre',
    link: 'https://zenspa.com/tratamientos',
    featured: true,
    zone: 'Centro',
    type: 'premium',
    stats: {
      views: 4320,
      clicks: 189,
      conversion: 18.5
    },
    highlights: ['Tratamientos Premium', 'Terapeutas Certificados', 'Ambiente Relajante']
  },
  {
    id: 'premium-3',
    title: 'Gimnasio Premium',
    description: 'Equipamiento de última generación y entrenadores personales certificados.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
    brand: 'FitZone',
    category: 'Deportes',
    discount: '25% OFF',
    validUntil: '10 de Enero',
    link: 'https://fitzone.com/membresia',
    featured: true,
    zone: 'Pedregosa',
    type: 'premium',
    stats: {
      views: 6780,
      clicks: 312,
      conversion: 11.2
    },
    highlights: ['Equipos Modernos', 'Clases Grupales', 'Nutricionista']
  },
  {
    id: 'premium-4',
    title: 'Clínica Dental',
    description: 'Atención dental de alta calidad con tecnología avanzada y especialistas.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddceee95?w=800&h=600&fit=crop',
    logo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
    brand: 'Dental Care',
    category: 'Salud',
    discount: '20% OFF',
    validUntil: '28 de Febrero',
    link: 'https://dentalcare.com/consulta',
    featured: true,
    zone: 'Centro',
    type: 'premium',
    stats: {
      views: 3450,
      clicks: 156,
      conversion: 22.1
    },
    highlights: ['Tecnología 3D', 'Especialistas Certificados', 'Financiamiento']
  },
  {
    id: 'premium-5',
    title: 'Supermercado 24/7',
    description: 'Productos frescos las 24 horas del día con entrega a domicilio.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
    logo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop',
    brand: 'FreshMart',
    category: 'Supermercados',
    discount: '15% OFF',
    validUntil: '31 de Diciembre',
    link: 'https://freshmart.com/delivery',
    featured: true,
    zone: 'Pedregosa',
    type: 'premium',
    stats: {
      views: 8920,
      clicks: 445,
      conversion: 9.8
    },
    highlights: ['Abierto 24/7', 'Entrega Rápida', 'Productos Frescos']
  },
  {
    id: 'premium-6',
    title: 'Academia de Idiomas',
    description: 'Aprende idiomas con profesores nativos y metodología innovadora.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    logo: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=100&h=100&fit=crop',
    brand: 'Language Hub',
    category: 'Educación',
    discount: '35% OFF',
    validUntil: '15 de Enero',
    link: 'https://languagehub.com/cursos',
    featured: true,
    zone: 'Centro',
    type: 'premium',
    stats: {
      views: 2340,
      clicks: 98,
      conversion: 16.3
    },
    highlights: ['Profesores Nativos', 'Clases Virtuales', 'Certificación Internacional']
  }
];


