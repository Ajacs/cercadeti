const CACHE_NAME = 'cerca-de-ti-v1';
const STATIC_CACHE = 'cerca-de-ti-static-v1';
const DYNAMIC_CACHE = 'cerca-de-ti-dynamic-v1';
const DATA_CACHE = 'cerca-de-ti-data-v1';

// Recursos críticos que deben estar siempre disponibles offline
const CRITICAL_RESOURCES = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  // CSS y JS principales
  '/_next/static/css/',
  '/_next/static/js/',
  // Imágenes placeholder
  'https://picsum.photos/',
  'https://placehold.co/',
  // Google Fonts
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
];

// URLs de API que queremos cachear
const API_ENDPOINTS = [
  '/api/businesses',
  '/api/categories',
  '/api/zones',
  '/api/offers',
];

// Configuración de cache por tipo de recurso
const CACHE_STRATEGIES = {
  // Recursos estáticos - Cache First
  static: {
    cacheName: STATIC_CACHE,
    strategy: 'cache-first',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
  },
  // APIs - Network First con fallback
  api: {
    cacheName: DATA_CACHE,
    strategy: 'network-first',
    maxAge: 5 * 60 * 1000, // 5 minutos
    networkTimeout: 3000, // 3 segundos timeout
  },
  // Imágenes - Cache First con validación
  images: {
    cacheName: DYNAMIC_CACHE,
    strategy: 'cache-first',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  },
  // Páginas HTML - Stale While Revalidate
  pages: {
    cacheName: DYNAMIC_CACHE,
    strategy: 'stale-while-revalidate',
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  },
};

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  
  event.waitUntil(
    Promise.all([
      // Precargar recursos críticos
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll([
          '/',
          '/offline',
          '/manifest.json',
        ]);
      }),
      // Inicializar otros caches
      caches.open(DYNAMIC_CACHE),
      caches.open(DATA_CACHE),
    ]).then(() => {
      console.log('[SW] Service Worker instalado correctamente');
      // Forzar activación inmediata
      return self.skipWaiting();
    })
  );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');
  
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!Object.values(CACHE_STRATEGIES).some(strategy => strategy.cacheName === cacheName) && 
                cacheName !== CACHE_NAME) {
              console.log('[SW] Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Tomar control inmediato de todas las páginas
      self.clients.claim(),
    ])
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo interceptar requests HTTP/HTTPS
  if (!request.url.startsWith('http')) return;

  // Determinar estrategia de cache basada en el tipo de recurso
  const strategy = getCacheStrategy(request);
  
  if (strategy) {
    event.respondWith(handleRequest(request, strategy));
  }
});

// Determinar estrategia de cache
function getCacheStrategy(request) {
  const url = new URL(request.url);
  
  // APIs
  if (url.pathname.startsWith('/api/')) {
    return CACHE_STRATEGIES.api;
  }
  
  // Imágenes
  if (request.destination === 'image' || 
      url.hostname.includes('picsum.photos') ||
      url.hostname.includes('placehold.co') ||
      url.hostname.includes('images.unsplash.com')) {
    return CACHE_STRATEGIES.images;
  }
  
  // Recursos estáticos de Next.js
  if (url.pathname.startsWith('/_next/static/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')) {
    return CACHE_STRATEGIES.static;
  }
  
  // Fuentes
  if (url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    return CACHE_STRATEGIES.static;
  }
  
  // Páginas HTML
  if (request.destination === 'document') {
    return CACHE_STRATEGIES.pages;
  }
  
  return null;
}

// Manejar requests con diferentes estrategias
async function handleRequest(request, strategy) {
  const cacheName = strategy.cacheName;
  const cache = await caches.open(cacheName);
  
  try {
    switch (strategy.strategy) {
      case 'cache-first':
        return await cacheFirst(request, cache);
      case 'network-first':
        return await networkFirst(request, cache, strategy.networkTimeout);
      case 'stale-while-revalidate':
        return await staleWhileRevalidate(request, cache);
      default:
        return await networkFirst(request, cache);
    }
  } catch (error) {
    console.error('[SW] Error manejando request:', error);
    return await getOfflineFallback(request);
  }
}

// Estrategia Cache First
async function cacheFirst(request, cache) {
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('[SW] Sirviendo desde cache:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Error de red, sirviendo fallback:', error);
    return await getOfflineFallback(request);
  }
}

// Estrategia Network First
async function networkFirst(request, cache, timeout = 3000) {
  try {
    const networkResponse = await fetchWithTimeout(request, timeout);
    
    if (networkResponse.ok) {
      // Actualizar cache en background
      cache.put(request, networkResponse.clone()).catch(console.error);
      return networkResponse;
    }
    
    // Si la respuesta no es ok, intentar cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log('[SW] Red falló, sirviendo desde cache:', request.url);
      return cachedResponse;
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Error de red, intentando cache:', error);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Sirviendo desde cache después de error de red:', request.url);
      return cachedResponse;
    }
    
    return await getOfflineFallback(request);
  }
}

// Estrategia Stale While Revalidate
async function staleWhileRevalidate(request, cache) {
  const cachedResponse = await cache.match(request);
  
  // Siempre intentar actualizar en background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  // Retornar cache inmediatamente si existe, o esperar por la red
  return cachedResponse || fetchPromise;
}

// Fetch con timeout
async function fetchWithTimeout(request, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(request, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Fallback offline
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // Si es una página HTML, mostrar página offline
  if (request.destination === 'document') {
    const offlineCache = await caches.open(STATIC_CACHE);
    const offlinePage = await offlineCache.match('/offline');
    
    if (offlinePage) {
      return offlinePage;
    }
    
    // Crear respuesta offline básica
    return new Response(`
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CercaDeTi - Sin conexión</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 20px;
              background: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .offline-container {
              text-align: center;
              background: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              max-width: 400px;
            }
            .offline-icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
            h1 {
              color: #333;
              margin-bottom: 16px;
            }
            p {
              color: #666;
              line-height: 1.5;
            }
            .retry-btn {
              background: #007bff;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              margin-top: 20px;
              font-size: 16px;
            }
            .retry-btn:hover {
              background: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="offline-container">
            <div class="offline-icon">📱</div>
            <h1>Sin conexión a internet</h1>
            <p>No tienes conexión a internet en este momento. Algunas funciones pueden no estar disponibles.</p>
            <button class="retry-btn" onclick="window.location.reload()">Reintentar</button>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
  
  // Para otros tipos de recursos, retornar respuesta vacía
  return new Response('', { status: 404 });
}

// Mensajes desde la aplicación
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    event.ports[0].postMessage({
      caches: Object.values(CACHE_STRATEGIES).map(s => s.cacheName),
    });
  }
});

// Limpiar caches periódicamente
setInterval(async () => {
  const cacheNames = await caches.keys();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const dateHeader = response.headers.get('date');
        if (dateHeader) {
          const responseDate = new Date(dateHeader);
          const now = new Date();
          const age = now - responseDate;
          
          // Eliminar respuestas muy antiguas
          if (age > 7 * 24 * 60 * 60 * 1000) { // 7 días
            await cache.delete(request);
          }
        }
      }
    }
  }
}, 60 * 60 * 1000); // Cada hora
