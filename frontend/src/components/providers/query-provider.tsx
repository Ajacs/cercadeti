'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cachear por 5 minutos
            staleTime: 5 * 60 * 1000,
            // Mantener en caché por 10 minutos
            gcTime: 10 * 60 * 1000,
            // Refetch en background cuando la ventana recupera el foco
            refetchOnWindowFocus: false,
            // Reintentar 1 vez en caso de error
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
