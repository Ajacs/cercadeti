"use client";

import Image from 'next/image';
import { useState } from 'react';
import { getOptimizedImageUrl, generateResponsiveSources } from '@/lib/image-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  size?: 'thumbnail' | 'card' | 'hero' | 'full';
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  responsive?: boolean;
  placeholder?: 'blur' | 'empty';
  fill?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  size = 'card',
  className,
  width,
  height,
  priority = false,
  responsive = false,
  placeholder = 'empty',
  fill = false,
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use optimized URL if it's a Supabase image
  const optimizedSrc = src.includes('supabase')
    ? getOptimizedImageUrl[size](src)
    : src;

  // Generate responsive sources for Supabase images
  const responsiveSources = responsive && src.includes('supabase')
    ? generateResponsiveSources(src)
    : null;

  // Fallback image for errors
  const fallbackSrc = '/images/placeholder-business.jpg';

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (responsive && responsiveSources) {
    return (
      <picture className={className}>
        {/* AVIF sources for modern browsers */}
        <source
          media="(max-width: 768px)"
          srcSet={responsiveSources.avif.small}
          type="image/avif"
        />
        <source
          media="(max-width: 1024px)"
          srcSet={responsiveSources.avif.medium}
          type="image/avif"
        />
        <source
          srcSet={responsiveSources.avif.large}
          type="image/avif"
        />

        {/* WebP sources for better compression */}
        <source
          media="(max-width: 768px)"
          srcSet={responsiveSources.webp.small}
          type="image/webp"
        />
        <source
          media="(max-width: 1024px)"
          srcSet={responsiveSources.webp.medium}
          type="image/webp"
        />
        <source
          srcSet={responsiveSources.webp.large}
          type="image/webp"
        />

        {/* Fallback JPEG sources */}
        <Image
          src={imageError ? fallbackSrc : optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          placeholder={placeholder}
          onLoad={handleLoad}
          onError={handleError}
          fill={fill}
          {...props}
        />
      </picture>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageError ? fallbackSrc : optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        onLoad={handleLoad}
        onError={handleError}
        fill={fill}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
}