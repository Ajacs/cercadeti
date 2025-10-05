# APM - Siguientes Pasos

## 📋 Checklist de Configuración

### 1. Configurar Sentry (15 minutos)

#### Paso 1: Crear Cuenta y Proyectos
- [ ] Ir a https://sentry.io/signup/
- [ ] Crear cuenta gratuita (usar email corporativo si es posible)
- [ ] Crear proyecto para **Frontend**:
  - Platform: Next.js
  - Nombre: `cercadeti-frontend`
  - Copiar el DSN que aparece
- [ ] Crear proyecto para **Backend**:
  - Platform: Node.js
  - Nombre: `cercadeti-backend`
  - Copiar el DSN que aparece

#### Paso 2: Configurar Variables de Entorno

**En Local (para testing):**

Frontend (`/frontend/.env.local`):
```bash
NEXT_PUBLIC_SENTRY_DSN=https://XXXXXX@oXXXXX.ingest.sentry.io/XXXXXX
```

Backend (`/backend/.env`):
```bash
SENTRY_DSN=https://XXXXXX@oXXXXX.ingest.sentry.io/XXXXXX
NODE_ENV=development
```

**En Vercel:**
- [ ] Ir a tu proyecto en Vercel
- [ ] Settings → Environment Variables
- [ ] Agregar variable:
  - Name: `NEXT_PUBLIC_SENTRY_DSN`
  - Value: `(tu DSN de frontend)`
  - Environments: Production, Preview, Development

**En Strapi Cloud:**
- [ ] Ir a tu proyecto en Strapi Cloud
- [ ] Settings → Environment Variables
- [ ] Agregar variable:
  - Name: `SENTRY_DSN`
  - Value: `(tu DSN de backend)`
  - Environment: Production

#### Paso 3: Verificar Instalación Local

```bash
# Frontend
cd frontend
npm run dev

# En otra terminal, simular un error:
# Abre http://localhost:3000 y fuerza un error en consola
# O visita una página que no existe: http://localhost:3000/test-404

# Backend
cd backend
npm run develop

# Verifica que Sentry se inicializó correctamente
# Deberías ver el mensaje en los logs
```

- [ ] Revisar dashboard de Sentry para ver si llegaron los errores de prueba
- [ ] Si no aparecen, verificar que los DSN estén correctos

#### Paso 4: Configurar Alertas en Sentry

- [ ] En Sentry, ir a **Alerts** → **Create Alert**
- [ ] Crear alerta para errores frecuentes:
  - **Nombre**: "High Error Rate"
  - **When**: An event is seen
  - **If**: The issue's frequency is greater than 10 events in 1 hour
  - **Then**: Send notification to: (tu email)

- [ ] Crear alerta para performance:
  - **Nombre**: "Slow Response Time"
  - **When**: A metric is greater than
  - **Metric**: p95(transaction.duration)
  - **Threshold**: 2000ms (2 segundos)
  - **Then**: Send notification to: (tu email)

- [ ] Crear alerta para errores críticos:
  - **Nombre**: "Critical Errors"
  - **When**: An event is seen
  - **If**: The event's level is equal to error OR fatal
  - **Then**: Send notification to: (tu email)

### 2. Configurar Better Uptime (10 minutos)

- [ ] Ir a https://betteruptime.com/sign-up
- [ ] Crear cuenta gratuita
- [ ] Crear monitor para Frontend:
  - **Name**: CercaDeTi Frontend
  - **URL**: https://tudominio.vercel.app (o tu dominio personalizado)
  - **Check frequency**: Every 3 minutes
  - **Alert policy**: Email + (opcional) SMS/Slack

- [ ] Crear monitor para Backend Health Check:
  - **Name**: CercaDeTi API Health
  - **URL**: https://tu-strapi.strapiapp.com/_health
  - **Check frequency**: Every 3 minutes
  - **Expected response**: 200 OK

- [ ] Configurar política de escalamiento:
  - Settings → On-call calendar
  - Agregar tu email/teléfono
  - (Opcional) Configurar integraciones con Slack/Discord

### 3. Configurar Vercel Analytics (Ya incluido)

- [ ] En tu proyecto de Vercel, ir a Analytics
- [ ] Habilitar "Web Analytics" si no está activo
- [ ] Revisar métricas de:
  - Real User Monitoring (RUM)
  - Core Web Vitals
  - Top pages
  - Traffic sources

### 4. Testing de Monitoreo (Post-Deploy)

Una vez desplegado en producción:

**Frontend:**
- [ ] Forzar un error 404: visitar `https://tudominio.com/pagina-inexistente`
- [ ] Verificar que aparece en Sentry Frontend
- [ ] Verificar que Better Uptime detecta el sitio como UP

**Backend:**
- [ ] Hacer una petición incorrecta a la API: `GET https://tu-api/api/endpoint-falso`
- [ ] Verificar que aparece en Sentry Backend
- [ ] Verificar que el health check de Better Uptime pasa

**Alertas:**
- [ ] Simular caída del servidor (opcional, solo si quieres probar alertas)
- [ ] Verificar que lleguen las notificaciones por email

### 5. Dashboard Centralizado (Opcional, 20 minutos)

Si quieres tener todas las alertas en un solo lugar:

**Opción A: Slack**
- [ ] Crear canal #alertas-produccion
- [ ] Integrar Sentry: Sentry → Settings → Integrations → Slack
- [ ] Integrar Better Uptime: Better Uptime → Integrations → Slack

**Opción B: Discord**
- [ ] Crear servidor de Discord o usar uno existente
- [ ] Crear canal #alertas
- [ ] Integrar Sentry: Usar webhooks de Discord
- [ ] Integrar Better Uptime: Usar webhooks de Discord

---

## 📊 Métricas Clave a Monitorear

### Frontend (Sentry)
- [ ] **Error Rate**: < 1% de las sesiones con errores
- [ ] **P95 Response Time**: < 2 segundos
- [ ] **Largest Contentful Paint (LCP)**: < 2.5 segundos
- [ ] **First Input Delay (FID)**: < 100ms

### Backend (Sentry)
- [ ] **Error Rate**: < 0.5% de las requests
- [ ] **P95 API Response Time**: < 500ms
- [ ] **Database Query Time**: < 100ms
- [ ] **Memory Usage**: < 80%

### Uptime (Better Uptime)
- [ ] **Uptime SLA**: > 99.9%
- [ ] **Average Response Time**: < 300ms
- [ ] **SSL Certificate**: Valid

---

## 🚨 Plan de Respuesta a Incidentes

### Si recibes una alerta de error rate alto:
1. Revisar dashboard de Sentry
2. Identificar el error más frecuente
3. Revisar stack trace y breadcrumbs
4. Si es crítico, hacer rollback a versión anterior
5. Investigar causa raíz y aplicar fix
6. Desplegar nueva versión

### Si recibes alerta de sitio caído:
1. Verificar manualmente: abrir el sitio en navegador
2. Si está caído, revisar logs en Vercel/Strapi Cloud
3. Verificar status de Vercel: https://vercel-status.com
4. Verificar status de Strapi Cloud: https://status.strapi.io
5. Si es problema de código, hacer rollback
6. Contactar soporte si es problema de infraestructura

### Si recibes alerta de response time lento:
1. Revisar Sentry Performance dashboard
2. Identificar endpoints más lentos
3. Verificar logs de Strapi para queries lentas
4. Optimizar queries o agregar cache
5. Monitorear mejora después del fix

---

## 📈 Revisión Semanal Recomendada

**Todos los lunes por la mañana:**
- [ ] Revisar resumen semanal de Sentry
- [ ] Revisar uptime de Better Uptime (debería ser > 99.9%)
- [ ] Revisar Core Web Vitals en Vercel Analytics
- [ ] Identificar top 3 errores más frecuentes
- [ ] Crear tareas para resolver errores recurrentes

---

## ✅ Checklist Final

- [ ] Sentry configurado en Frontend
- [ ] Sentry configurado en Backend
- [ ] Alertas configuradas en Sentry
- [ ] Better Uptime monitoreando Frontend
- [ ] Better Uptime monitoreando Backend
- [ ] Vercel Analytics habilitado
- [ ] Slack/Discord integrado (opcional)
- [ ] Primera alerta de prueba recibida
- [ ] Plan de respuesta a incidentes documentado
- [ ] Calendario de revisión semanal agendado

**Tiempo total estimado: 45 minutos - 1 hora**

---

## 💡 Tips Adicionales

- **Source Maps**: Sentry ya está configurado para subir source maps automáticamente en el build de Next.js
- **Release Tracking**: Considera agregar release tracking para correlacionar errores con deploys específicos
- **Custom Context**: Puedes agregar información custom a los eventos de Sentry (user ID, plan, etc.)
- **Ignore Errors**: Configura Sentry para ignorar errores conocidos/irrelevantes (ej: ad blockers)

## 🆘 Troubleshooting

**Si no aparecen eventos en Sentry:**
- Verificar que el DSN está correcto
- Verificar que la variable de entorno existe y está bien escrita
- Revisar la consola del navegador/servidor para errores de Sentry
- Verificar que el proyecto no esté en modo "development only"

**Si Better Uptime marca el sitio como DOWN:**
- Verificar manualmente que el sitio esté accesible
- Verificar que la URL del monitor es correcta
- Revisar los logs de Vercel/Strapi para errores
- Verificar que no haya problemas de DNS
