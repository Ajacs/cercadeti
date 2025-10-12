/**
 * Utilidades para trabajar con imágenes de Strapi
 */

import type { Business } from '@/types';

/**
 * Obtiene la URL de la imagen principal de un negocio
 * Maneja tanto el campo main_image (media object) como main_image_url (string)
 */
export function getBusinessImageUrl(business: Business): string {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  // Prioridad 1: main_image (objeto media de Strapi)
  if (business.main_image) {
    const image = business.main_image as any;

    // Intentar obtener el formato medium (mejor para cards)
    if (image.formats?.medium?.url) {
      return `${strapiUrl}${image.formats.medium.url}`;
    }

    // Si no hay medium, intentar small
    if (image.formats?.small?.url) {
      return `${strapiUrl}${image.formats.small.url}`;
    }

    // Si no hay formatos, usar la URL original
    if (image.url) {
      return `${strapiUrl}${image.url}`;
    }
  }

  // Prioridad 2: main_image_url (string directo)
  if (business.main_image_url) {
    // Si ya es una URL completa, devolverla tal cual
    if (business.main_image_url.startsWith('http')) {
      return business.main_image_url;
    }
    // Si es una ruta relativa, agregarle el URL de Strapi
    return `${strapiUrl}${business.main_image_url}`;
  }

  // Fallback: placeholder
  return '/placeholder-business.jpg';
}

/**
 * Obtiene la URL de la imagen en el formato más grande disponible
 * Útil para páginas de detalle donde queremos imágenes de mayor resolución
 */
export function getBusinessImageUrlLarge(business: Business): string {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  // Prioridad 1: main_image (objeto media de Strapi)
  if (business.main_image) {
    const image = business.main_image as any;

    // Intentar obtener el formato large primero
    if (image.formats?.large?.url) {
      return `${strapiUrl}${image.formats.large.url}`;
    }

    // Si no hay large, intentar medium
    if (image.formats?.medium?.url) {
      return `${strapiUrl}${image.formats.medium.url}`;
    }

    // Si no hay formatos, usar la URL original
    if (image.url) {
      return `${strapiUrl}${image.url}`;
    }
  }

  // Prioridad 2: main_image_url (string directo)
  if (business.main_image_url) {
    if (business.main_image_url.startsWith('http')) {
      return business.main_image_url;
    }
    return `${strapiUrl}${business.main_image_url}`;
  }

  // Fallback: placeholder
  return '/placeholder-business.jpg';
}
