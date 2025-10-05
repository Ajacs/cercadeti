# 🚀 Guía de Configuración de Strapi - CercaDeTi

Esta guía te ayudará a configurar Strapi correctamente para que funcione con el frontend.

## 📋 Pasos de Configuración

### 1. Verificar que Strapi esté ejecutándose

```bash
cd backend
npm run develop
```

Strapi debería estar disponible en `http://localhost:1337`

### 2. Crear Usuario Administrador

1. Ve a `http://localhost:1337/admin`
2. Si es la primera vez, crea una cuenta de administrador:
   - Email: `admin@strapi.io`
   - Contraseña: `admin123` (o la que prefieras)
3. Completa el formulario de registro

### 3. Configurar Permisos Públicos

1. En el panel de administración, ve a **Settings** (Configuración)
2. En el menú lateral, selecciona **Users & Permissions Plugin**
3. Haz clic en **Roles**
4. Edita el rol **Public**
5. Para cada Content Type, habilita:
   - ✅ **find** (encontrar múltiples)
   - ✅ **findOne** (encontrar uno)
   - ❌ **create** (crear)
   - ❌ **update** (actualizar)
   - ❌ **delete** (eliminar)

**Content Types a configurar:**
- business-plans
- zones
- categories
- businesses
- offers
- ads

6. Haz clic en **Save** (Guardar)

### 4. Poblar con Datos de Prueba

Una vez configurados los permisos, ejecuta:

```bash
cd backend
npm run populate
```

Esto insertará todos los datos de prueba en Strapi.

### 5. Verificar que Todo Funcione

Prueba estas URLs en tu navegador:

- `http://localhost:1337/api/businesses`
- `http://localhost:1337/api/categories`
- `http://localhost:1337/api/zones`
- `http://localhost:1337/api/business-plans`
- `http://localhost:1337/api/offers`
- `http://localhost:1337/api/ads`

Deberías ver respuestas JSON con datos.

## 🔧 Scripts Disponibles

```bash
# Iniciar Strapi
npm run develop

# Poblar con datos de prueba
npm run populate

# Configurar automáticamente (experimental)
npm run setup

# Generar datos de prueba
npm run seed
```

## 🐛 Solución de Problemas

### Error 403 (Forbidden)
- **Causa**: Permisos no configurados
- **Solución**: Configura los permisos públicos como se describe arriba

### Error de conexión
- **Causa**: Strapi no está ejecutándose
- **Solución**: Ejecuta `npm run develop` en el directorio backend

### Datos no aparecen
- **Causa**: Datos no poblados o permisos incorrectos
- **Solución**: 
  1. Verifica permisos
  2. Ejecuta `npm run populate`
  3. Verifica en el panel de admin que los datos existan

### Puerto en uso
- **Causa**: Otro proceso usando el puerto 1337
- **Solución**: 
  ```bash
  lsof -ti:1337 | xargs kill -9
  ```

## 📊 Verificar Integración Frontend

Una vez que Strapi esté configurado:

1. Inicia el frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Ve a `http://localhost:3000/demo`

3. Verifica que aparezca "Strapi conectado - Usando datos reales"

## 🎯 Estado Esperado

Cuando todo esté configurado correctamente:

- ✅ Strapi ejecutándose en `http://localhost:1337`
- ✅ Panel de admin accesible en `http://localhost:1337/admin`
- ✅ APIs públicas accesibles sin autenticación
- ✅ Datos de prueba poblados
- ✅ Frontend mostrando datos reales de Strapi

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs de Strapi en la consola
2. Verifica que los permisos estén configurados
3. Asegúrate de que los datos estén poblados
4. Revisa la consola del navegador para errores

---

¡Una vez completada esta configuración, tendrás una integración completa entre Strapi y el frontend! 🎉
