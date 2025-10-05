/**
 * Supabase Image Optimization Utilities
 * Supabase Storage includes CDN with automatic optimizations
 */

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  resize?: 'cover' | 'contain' | 'fill';
}

export const optimizeSupabaseImage = (
  url: string,
  options: ImageOptimizationOptions = {}
): string => {
  if (!url || !url.includes('supabase')) {
    return url;
  }

  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    resize = 'cover'
  } = options;

  // Supabase Transform API
  const params = new URLSearchParams();

  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  if (quality) params.append('quality', quality.toString());
  if (format) params.append('format', format);
  if (resize) params.append('resize', resize);

  // Add transform parameters to URL
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
};

// Predefined image sizes for common use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150, quality: 70 },
  card: { width: 300, height: 200, quality: 80 },
  hero: { width: 800, height: 400, quality: 85 },
  full: { width: 1200, height: 800, quality: 90 },
} as const;

// Helper functions for common image optimizations
export const getOptimizedImageUrl = {
  thumbnail: (url: string) => optimizeSupabaseImage(url, IMAGE_SIZES.thumbnail),
  card: (url: string) => optimizeSupabaseImage(url, IMAGE_SIZES.card),
  hero: (url: string) => optimizeSupabaseImage(url, IMAGE_SIZES.hero),
  full: (url: string) => optimizeSupabaseImage(url, IMAGE_SIZES.full),
};

// Generate responsive image sources
export const generateResponsiveSources = (url: string) => {
  return {
    small: optimizeSupabaseImage(url, { width: 400, quality: 75 }),
    medium: optimizeSupabaseImage(url, { width: 800, quality: 80 }),
    large: optimizeSupabaseImage(url, { width: 1200, quality: 85 }),
    webp: {
      small: optimizeSupabaseImage(url, { width: 400, quality: 75, format: 'webp' }),
      medium: optimizeSupabaseImage(url, { width: 800, quality: 80, format: 'webp' }),
      large: optimizeSupabaseImage(url, { width: 1200, quality: 85, format: 'webp' }),
    },
    avif: {
      small: optimizeSupabaseImage(url, { width: 400, quality: 75, format: 'avif' }),
      medium: optimizeSupabaseImage(url, { width: 800, quality: 80, format: 'avif' }),
      large: optimizeSupabaseImage(url, { width: 1200, quality: 85, format: 'avif' }),
    }
  };
};
