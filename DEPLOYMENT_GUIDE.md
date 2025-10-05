# Guía de Despliegue - CercaDeTi

## 📋 Pre-requisitos

- [x] Cuenta en Strapi Cloud (https://cloud.strapi.io)
- [x] Cuenta en Vercel (https://vercel.com)
- [x] Repositorio de GitHub con el código
- [x] Build del frontend exitoso ✅
- [ ] Sentry configurado (opcional pero recomendado)

---

## 🚀 Parte 1: Desplegar Backend en Strapi Cloud

### Paso 1: Preparar el Backend

1. **Verificar la base de datos** (SQLite para desarrollo, PostgreSQL para producción)

   Strapi Cloud usará PostgreSQL automáticamente, no necesitas hacer nada.

2. **Verificar variables de entorno necesarias**:
   ```bash
   # Strapi Cloud configura automáticamente:
   - DATABASE_URL (PostgreSQL)
   - APP_KEYS
   - API_TOKEN_SALT
   - ADMIN_JWT_SECRET
   - TRANSFER_TOKEN_SALT
   - JWT_SECRET

   # Tú debes configurar:
   - SENTRY_DSN (opcional)
   - NODE_ENV=production
   ```

### Paso 2: Crear Proyecto en Strapi Cloud

1. Ir a https://cloud.strapi.io
2. Click en "Create project"
3. Seleccionar "Deploy from GitHub"
4. Autorizar acceso a tu repositorio
5. Seleccionar el repositorio `cercadeti`
6. **Configuración importante**:
   ```
   Project name: cercadeti-backend
   Root directory: backend
   Branch: main
   Region: us-east-1 (o el más cercano)
   ```

### Paso 3: Configurar Variables de Entorno

En Strapi Cloud → Settings → Environment Variables:

```bash
NODE_ENV=production
SENTRY_DSN=https://your-dsn@sentry.io/project-id  # Opcional
```

Las demás variables las genera Strapi Cloud automáticamente.

### Paso 4: Deploy

1. Click en "Deploy"
2. Esperar ~5-10 minutos para el primer deploy
3. Una vez completado, tendrás:
   - **Backend URL**: `https://your-project.strapiapp.com`
   - **Admin Panel**: `https://your-project.strapiapp.com/admin`

### Paso 5: Configurar Admin User

1. Visitar `https://your-project.strapiapp.com/admin`
2. Crear cuenta de administrador:
   - Email: tu email
   - Password: contraseña segura (guárdala)
   - Nombre: Tu nombre

### Paso 6: Poblar Datos Iniciales

**Opción A: Manual** (Recomendado para producción)
1. Ir al Admin Panel
2. Content Manager → Crear contenido:
   - **Categories**: Restaurantes, Hoteles, etc.
   - **Zones**: Zona Centro, etc.
   - **Business Plans**: Free, Premium, etc.

**Opción B: Importar desde desarrollo**
1. Exportar contenido desde local:
   ```bash
   cd backend
   npm run strapi export
   ```
2. Importar en Strapi Cloud usando el admin panel o CLI

### Paso 7: Configurar Permisos Públicos

1. Settings → Users & Permissions Plugin → Roles
2. Click en "Public"
3. Habilitar permisos para:
   - **Business**: find, findOne
   - **Category**: find, findOne
   - **Zone**: find, findOne
   - **Ad**: find, findOne
   - **Offer**: find, findOne
   - **Pending-business**: create
   - **Contact-submission**: create
4. Click "Save"

### Paso 8: Verificar Backend

Prueba que la API funcione:
```bash
curl https://your-project.strapiapp.com/api/categories
# Debería retornar JSON con categorías
```

---

## 🌐 Parte 2: Desplegar Frontend en Vercel

### Paso 1: Preparar Variables de Entorno

Antes de desplegar, prepara estos valores:

```bash
NEXT_PUBLIC_STRAPI_URL=https://your-project.strapiapp.com
NEXT_PUBLIC_SENTRY_DSN=https://your-frontend-dsn@sentry.io/project-id  # Opcional
```

### Paso 2: Crear Proyecto en Vercel

1. Ir a https://vercel.com/new
2. Click en "Import Git Repository"
3. Seleccionar repositorio `cercadeti`
4. **Configuración importante**:
   ```
   Project Name: cercadeti-frontend
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

### Paso 3: Configurar Variables de Entorno

En la sección "Environment Variables":

1. Agregar variable:
   ```
   Name: NEXT_PUBLIC_STRAPI_URL
   Value: https://your-project.strapiapp.com
   Environments: Production, Preview, Development
   ```

2. (Opcional) Agregar Sentry:
   ```
   Name: NEXT_PUBLIC_SENTRY_DSN
   Value: https://your-dsn@sentry.io/project-id
   Environments: Production, Preview, Development
   ```

### Paso 4: Deploy

1. Click en "Deploy"
2. Esperar ~2-3 minutos
3. Una vez completado:
   - **Frontend URL**: `https://cercadeti-frontend.vercel.app`
   - O tu dominio personalizado

### Paso 5: Configurar Dominio Personalizado (Opcional)

1. En Vercel → Settings → Domains
2. Agregar dominio: `tudominio.com`
3. Configurar DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
4. Esperar propagación DNS (~5-30 minutos)

### Paso 6: Habilitar HTTPS y Optimizaciones

Vercel habilita automáticamente:
- ✅ HTTPS/SSL
- ✅ CDN global
- ✅ Automatic deployments desde GitHub
- ✅ Preview deployments para PRs

---

## 🔗 Parte 3: Conectar Frontend con Backend

### Verificar Comunicación

1. **Abrir el frontend** en el navegador:
   - `https://cercadeti-frontend.vercel.app`

2. **Verificar que se carguen datos**:
   - La página principal debe mostrar categorías
   - El selector de zonas debe funcionar
   - La búsqueda debe traer resultados

### Solución de Problemas Comunes

#### Error: "Failed to fetch" o CORS error

**Causa**: Backend no permite requests desde el dominio del frontend

**Solución**:
1. En Strapi Cloud, editar `backend/config/middlewares.ts`
2. Agregar dominio de Vercel a CORS:
   ```typescript
   {
     name: 'strapi::cors',
     config: {
       enabled: true,
       headers: '*',
       origin: [
         'http://localhost:3000',
         'https://cercadeti-frontend.vercel.app',
         'https://tudominio.com'  // Si usas dominio personalizado
       ]
     }
   }
   ```
3. Commit y push → Strapi Cloud redesplegará automáticamente

#### Error: "Cannot read properties of undefined"

**Causa**: Frontend esperando datos que no existen en backend

**Solución**:
1. Verificar que hayas creado contenido en Strapi:
   - Categories
   - Zones
   - Businesses (al menos algunos de prueba)
2. Verificar permisos públicos en Strapi

#### Error: "Network request failed"

**Causa**: Variable de entorno incorrecta

**Solución**:
1. En Vercel → Settings → Environment Variables
2. Verificar que `NEXT_PUBLIC_STRAPI_URL` esté correcto
3. NO debe terminar con `/` (slash)
4. Debe incluir `https://`
5. Re-deploy después de cambiar variables

---

## ✅ Checklist Final de Deployment

### Backend (Strapi Cloud)
- [ ] Proyecto desplegado exitosamente
- [ ] Admin user creado
- [ ] Contenido inicial creado (Categories, Zones, Business Plans)
- [ ] Permisos públicos configurados
- [ ] API responde correctamente: `curl https://your-project.strapiapp.com/api/categories`
- [ ] CORS configurado con dominio de Vercel

### Frontend (Vercel)
- [ ] Proyecto desplegado exitosamente
- [ ] Variable `NEXT_PUBLIC_STRAPI_URL` configurada
- [ ] Sitio carga correctamente
- [ ] Datos se muestran en la página principal
- [ ] Búsqueda funciona
- [ ] Formularios funcionan
- [ ] (Opcional) Dominio personalizado configurado

### Comunicación
- [ ] Frontend puede consultar API del backend
- [ ] No hay errores de CORS
- [ ] Imágenes se cargan correctamente
- [ ] Formulario de registro de negocio funciona
- [ ] Formulario de contacto funciona

### Monitoreo (Opcional pero Recomendado)
- [ ] Sentry configurado en frontend
- [ ] Sentry configurado en backend
- [ ] Better Uptime monitoreando frontend
- [ ] Better Uptime monitoreando backend health check

---

## 🔄 Flujo de Deployment Continuo

Una vez configurado, el flujo es:

1. **Hacer cambios en local**
2. **Commit y push a GitHub**:
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push origin main
   ```
3. **Automatic deploy**:
   - Vercel detecta el cambio en `frontend/` y despliega automáticamente
   - Strapi Cloud detecta cambio en `backend/` y despliega automáticamente

4. **Verificar en producción**:
   - Revisar que el sitio funcione
   - Revisar Sentry por errores

---

## 🆘 Rollback en Caso de Error

### Vercel (Frontend)
1. Ir a Deployments
2. Encontrar el deployment anterior que funcionaba
3. Click en "..." → "Promote to Production"

### Strapi Cloud (Backend)
1. Ir a Deployments
2. Encontrar el deployment anterior
3. Click en "Redeploy"

O hacer rollback con Git:
```bash
git revert HEAD
git push origin main
```

---

## 📊 Monitorear Aplicación

### Vercel Analytics
- Dashboard: https://vercel.com/[tu-proyecto]/analytics
- Métricas: Core Web Vitals, tráfico, errores

### Strapi Cloud Logs
- Dashboard → Logs
- Filtrar por errores, warnings, etc.

### Sentry (si configurado)
- Frontend: https://sentry.io/organizations/[org]/projects/cercadeti-frontend
- Backend: https://sentry.io/organizations/[org]/projects/cercadeti-backend

---

## 💡 Recomendaciones Post-Deployment

1. **Agregar un negocio de prueba** en el admin panel
2. **Probar el flujo de registro** desde el frontend
3. **Configurar alertas** en Sentry
4. **Configurar uptime monitoring** con Better Uptime
5. **Agregar Google Analytics** (opcional)
6. **Configurar un backup** de la base de datos (Strapi Cloud lo hace automáticamente)

---

## 🎯 URLs Importantes

Después del deployment, guarda estas URLs:

```
Frontend: https://cercadeti-frontend.vercel.app
Backend API: https://your-project.strapiapp.com/api
Backend Admin: https://your-project.strapiapp.com/admin
Sentry Frontend: https://sentry.io/...
Sentry Backend: https://sentry.io/...
Better Uptime: https://betteruptime.com/team/...
```

---

## ✨ ¡Listo!

Tu aplicación está en producción y lista para usuarios reales.

**Próximos pasos sugeridos:**
1. Compartir el link con usuarios de prueba
2. Recopilar feedback
3. Monitorear errores en Sentry
4. Optimizar performance según métricas
