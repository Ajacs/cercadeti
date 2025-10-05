/**
 * Hook personalizado para gestionar categorías desde Strapi
 */

import { useState, useEffect, useCallback } from 'react';
import { Category } from '@/types';
import { strapiAdapter } from '@/lib/strapi-adapter';

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await strapiAdapter.getCategories();
      setCategories(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
}

export function useCategory(slug: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const category = await strapiAdapter.getCategoryBySlug(slug);
      setCategory(category);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar la categoría');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return { category, loading, error, refetch: fetchCategory };
}
