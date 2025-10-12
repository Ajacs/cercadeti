"use client";

import { useState } from 'react';
import { strapiAdapter } from '@/lib/strapi-adapter';

interface BusinessRegistrationData {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  categoryId?: string;
  customCategoryName?: string;
  logo?: File;
}

interface UseBusinessRegistrationReturn {
  submitRegistration: (data: BusinessRegistrationData) => Promise<{ success: boolean; message: string }>;
  loading: boolean;
  error: string | null;
}

export function useBusinessRegistration(): UseBusinessRegistrationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRegistration = async (data: BusinessRegistrationData): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);

    try {
      // Preparar datos para Strapi
      const registrationData: any = {
        name: data.name,
        description: data.description,
        email: data.email,
        phone: data.phone,
        address: data.address,
        website: data.website || '',
        custom_category_name: data.customCategoryName || '',
        submitted_at: new Date().toISOString(),
        validation_status: 'pending'
      };

      // Si hay una categoría seleccionada (no es "Otra"), agregarla como ID numérico
      if (data.categoryId && data.categoryId !== 'other') {
        registrationData.category = parseInt(data.categoryId);
      }

      // Crear FormData para manejar archivos
      const formData = new FormData();
      
      // Agregar datos del negocio
      formData.append('data', JSON.stringify(registrationData));

      // Si hay logo, agregarlo (sin el prefijo 'files.')
      if (data.logo) {
        formData.append('logo', data.logo);
      }

      // Enviar a Strapi
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/pending-businesses`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error al enviar el registro');
      }

      const result = await response.json();

      return {
        success: true,
        message: 'Tu solicitud de registro ha sido enviada exitosamente. Te contactaremos pronto para validar tu información.'
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al enviar el registro';
      setError(errorMessage);
      
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitRegistration,
    loading,
    error
  };
}
