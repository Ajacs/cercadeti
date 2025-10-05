# Configuración de Monitoreo (APM)

## Sentry - Error Tracking & Performance Monitoring

### Plan Gratuito
- ✅ 5,000 eventos/mes
- ✅ 1 proyecto
- ✅ Error tracking
- ✅ Performance monitoring
- ✅ Session replay
- ✅ Alertas por email/Slack/Discord

### Configuración

#### 1. Crear cuenta en Sentry
1. Visita https://sentry.io/signup/
2. Crea una cuenta gratuita
3. Crea un proyecto para Next.js
4. Crea otro proyecto para Node.js
5. Copia los DSN de cada proyecto

#### 2. Variables de Entorno

**Frontend (.env.local)**
```bash
NEXT_PUBLIC_SENTRY_DSN=https://your-frontend-dsn@sentry.io/project-id
```

**Backend (.env)**
```bash
SENTRY_DSN=https://your-backend-dsn@sentry.io/project-id
```

#### 3. Configurar en Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega `NEXT_PUBLIC_SENTRY_DSN` con el valor de tu DSN

#### 4. Configurar en Strapi Cloud
1. Ve a tu proyecto en Strapi Cloud
2. Settings → Environment Variables
3. Agrega `SENTRY_DSN` con el valor de tu DSN

### Configurar Alertas

1. En Sentry, ve a Settings → Alerts
2. Crea reglas de alerta:
   - **Error Rate**: Alerta cuando > 10 errores en 5 minutos
   - **Response Time**: Alerta cuando tiempo de respuesta > 2 segundos
   - **Availability**: Alerta cuando hay errores críticos

3. Configura notificaciones:
   - Email (incluido en plan gratuito)
   - Slack (requiere integración)
   - Discord (requiere integración)

---

## Alternativas Gratuitas

### 2. **LogRocket** (Alternativa)
- **Gratuito**: 1,000 sesiones/mes
- **Monitorea**: Session replay, errores, performance
- **URL**: https://logrocket.com

### 3. **Better Uptime** (Uptime Monitoring)
- **Gratuito**: 10 monitores, checks cada 3 minutos
- **Alertas**: Email, SMS, Slack, Discord
- **URL**: https://betteruptime.com

### 4. **UptimeRobot** (Uptime Monitoring)
- **Gratuito**: 50 monitores, checks cada 5 minutos
- **Alertas**: Email, SMS (limitado)
- **URL**: https://uptimerobot.com

### 5. **Axiom** (Logs)
- **Gratuito**: 500MB/mes, 30 días retención
- **Monitorea**: Logs, métricas, trazas
- **URL**: https://axiom.co

---

## Configuración Recomendada (Sin Costo)

Para maximizar el monitoreo sin costos:

1. **Sentry**: Error tracking + Performance (Frontend + Backend)
2. **Better Uptime**: Monitoreo de disponibilidad
3. **Vercel Analytics**: Métricas de frontend (incluido con Vercel)

### Configurar Better Uptime

1. Crea cuenta en https://betteruptime.com
2. Agrega un monitor:
   - **URL**: Tu dominio de producción
   - **Check Interval**: 3 minutos
   - **Alertas**: Email + (opcional) Slack/Discord

3. Crea monitores adicionales para:
   - Frontend: `https://tudominio.com`
   - Backend API: `https://api.tudominio.com/api/health`
   - Strapi Health: `https://strapi.tudominio.com/_health`

---

## Dashboard Recomendado

Crea un canal de Slack o Discord para centralizar todas las alertas:

1. **Sentry**: Errores y performance
2. **Better Uptime**: Caídas del sitio
3. **Vercel**: Build failures

Esto te dará visibilidad completa de tu aplicación sin costos.
