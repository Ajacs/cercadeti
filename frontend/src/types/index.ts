// =============================================
// TIPOS PRINCIPALES PARA STRAPI
// =============================================

export interface BusinessPlan {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  features: string[];
  duration_days: number;
  max_ads: number;
  max_offers: number;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Zone {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Business {
  id: number;
  documentId?: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  main_image_url?: string;
  gallery_urls?: string[];
  hours?: Record<string, { open: string; close: string; closed?: boolean }>;
  rating: number;
  review_count: number;
  featured: boolean;
  offer: boolean;
  offer_text?: string;
  is_active: boolean;
  is_verified: boolean;
  supports_delivery: boolean;
  delivery_time?: string;
  delivery_fee?: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  // Relaciones
  category?: Category;
  zone?: Zone;
  plan?: BusinessPlan;
  offers?: Offer[];
  ads?: Ad[];
}

export interface Offer {
  id: number;
  name: string;
  description?: string;
  discount_percentage?: number;
  discount_amount?: number;
  original_price?: number;
  offer_price?: number;
  currency: string;
  image_url?: string;
  is_active: boolean;
  valid_until?: string;
  terms_conditions?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  // Relaciones
  business?: Business;
}

export interface Ad {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  video_url?: string;
  link_url?: string;
  is_active: boolean;
  valid_until?: string;
  priority: number;
  click_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  // Relaciones
  business?: Business;
}

// =============================================
// TIPOS LEGACY PARA COMPATIBILIDAD
// =============================================

export type LegacyBusiness = {
  id: string;
  name: string;
  category: 'Restaurantes' | 'Supermercados' | 'Servicios Hogar' | 'Mascotas' | 'Transporte' | 'Salud' | 'Belleza' | 'Deportes' | 'Educación' | 'Entretenimiento' | 'Fotografía' | 'Moda';
  deliveryTime: string;
  rating: number;
  image: string;
  description: string;
  featured: boolean;
  offer: boolean;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  zone?: string;
};

// =============================================
// TIPOS PARA FORMULARIOS Y UI
// =============================================

export interface BusinessFormData {
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  category_id?: number;
  zone_id?: number;
  plan_id?: number;
  supports_delivery?: boolean;
  delivery_time?: string;
  delivery_fee?: number;
}

export interface OfferFormData {
  name: string;
  description?: string;
  discount_percentage?: number;
  discount_amount?: number;
  original_price?: number;
  offer_price?: number;
  currency: string;
  image_url?: string;
  valid_until?: string;
  terms_conditions?: string;
  business_id: number;
}

export interface AdFormData {
  name: string;
  description?: string;
  image_url?: string;
  video_url?: string;
  link_url?: string;
  valid_until?: string;
  priority: number;
  business_id: number;
}

// =============================================
// TIPOS PARA FILTROS Y BÚSQUEDAS
// =============================================

export interface BusinessFilters {
  category_id?: number;
  zone_id?: number;
  plan_id?: number;
  featured?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  supports_delivery?: boolean;
  min_rating?: number;
  search?: string;
}

export interface PendingBusiness {
  id: number;
  documentId?: string;
  name: string;
  description?: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  logo_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  custom_category_name?: string;
  category?: Category;
  zone?: Zone;
  business_plan?: BusinessPlan;
}

export interface ContactSubmission {
  id: number;
  documentId?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  submitted_at: string;
  replied_at?: string;
  business?: Business;
  pending_business?: PendingBusiness;
}

export interface BusinessSearchParams {
  query?: string;
  category_slug?: string;
  zone_slug?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
  sort?: 'rating' | 'name' | 'created_at';
  order?: 'asc' | 'desc';
}

// =============================================
// TIPOS PARA ESTADÍSTICAS Y ANALYTICS
// =============================================

export interface BusinessStats {
  total_businesses: number;
  active_businesses: number;
  featured_businesses: number;
  verified_businesses: number;
  businesses_by_category: Array<{
    category: string;
    count: number;
  }>;
  businesses_by_zone: Array<{
    zone: string;
    count: number;
  }>;
  average_rating: number;
  total_reviews: number;
}

export interface OfferStats {
  total_offers: number;
  active_offers: number;
  offers_by_business: Array<{
    business_name: string;
    count: number;
  }>;
}

export interface AdStats {
  total_ads: number;
  active_ads: number;
  total_clicks: number;
  total_views: number;
  click_through_rate: number;
}

// =============================================
// TIPOS PARA RESPUESTAS DE API
// =============================================

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

// =============================================
// ALIASES PARA COMPATIBILIDAD
// =============================================

// Mantener compatibilidad con código existente
export type BusinessWithDetails = Business;
