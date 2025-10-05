# CercaDeTi

Plataforma de búsqueda de negocios locales con Next.js y Strapi.

## Estructura del Proyecto

```
cercadeti/
├── frontend/          # Aplicación Next.js 15
└── backend/           # API Strapi v5
```

## Desarrollo Local

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run develop
```

## Despliegue

### Frontend (Vercel)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: Configurar `NEXT_PUBLIC_STRAPI_URL` con la URL de producción de Strapi

### Backend (Strapi Cloud)
- **Root Directory**: `backend`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment Variables**: Configurar según `.env.example`

## Variables de Entorno

### Frontend (.env.local)
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id  # Opcional
```

### Backend (.env)
```
SENTRY_DSN=https://your-dsn@sentry.io/project-id  # Opcional
```

Ver `backend/.env.example` para la configuración completa.

## Monitoreo y APM

El proyecto incluye configuración de Sentry para monitoreo de errores y performance.

Ver [MONITORING_SETUP.md](./MONITORING_SETUP.md) para instrucciones detalladas de configuración.

**Herramientas gratuitas configuradas:**
- 🔍 **Sentry**: Error tracking y performance monitoring
- ⚡ **Vercel Speed Insights**: Métricas de rendimiento del frontend
