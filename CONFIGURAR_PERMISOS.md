# 🔧 Configurar Permisos de Strapi - Guía Paso a Paso

## 🎯 Objetivo
Configurar los permisos públicos en Strapi para que el frontend pueda acceder a los datos.

## 📋 Pasos a Seguir

### 1. Acceder al Panel de Administración
1. Ve a: **http://localhost:1337/admin**
2. Haz login con las credenciales de desarrollo:
   - **Email**: `ajacs1104@gmail.com`
   - **Password**: `17dtv0027C`

### 2. Configurar Permisos Públicos
1. En el panel de administración, ve a **Settings** (Configuración)
2. En el menú lateral, selecciona **Users & Permissions Plugin**
3. Haz clic en **Roles**
4. Encuentra el rol **Public** y haz clic en el ícono de editar (lápiz)

### 3. Habilitar Permisos para Cada Content Type
Para cada uno de estos Content Types, habilita:
- ✅ **find** (encontrar múltiples registros)
- ✅ **findOne** (encontrar un registro específico)
- ❌ **create** (crear - mantener deshabilitado)
- ❌ **update** (actualizar - mantener deshabilitado)
- ❌ **delete** (eliminar - mantener deshabilitado)

**Content Types a configurar:**
- `business-plans`
- `zones`
- `categories`
- `businesses`
- `offers`
- `ads`

### 4. Guardar Cambios
1. Haz clic en **Save** (Guardar)
2. Espera a que se confirmen los cambios

### 5. Verificar Configuración
Ejecuta este comando para verificar que los permisos estén configurados:

```bash
cd backend
npm run populate-simple
```

Deberías ver mensajes como:
```
✅ /api/business-plans - Accesible
✅ /api/zones - Accesible
✅ /api/categories - Accesible
✅ /api/businesses - Accesible
✅ /api/offers - Accesible
✅ /api/ads - Accesible
```

### 6. Poblar Datos
Una vez que las APIs estén accesibles, ejecuta:

```bash
npm run populate-simple
```

Esto insertará todos los datos de prueba en Strapi.

## 🎉 Resultado Esperado

Después de completar estos pasos:

1. **Backend**: Las APIs de Strapi estarán accesibles públicamente
2. **Datos**: La base de datos estará poblada con datos de prueba
3. **Frontend**: El frontend mostrará:
   - Categorías en los filtros
   - Negocios en la lista
   - Zonas en el selector
   - Ofertas y anuncios

## 🐛 Solución de Problemas

### Error 403 (Forbidden)
- **Causa**: Permisos no configurados
- **Solución**: Seguir los pasos 1-4 de esta guía

### APIs no responden
- **Causa**: Strapi no está ejecutándose
- **Solución**: Ejecutar `npm run develop` en el directorio backend

### Datos no aparecen en el frontend
- **Causa**: Datos no poblados o permisos incorrectos
- **Solución**: 
  1. Verificar permisos (pasos 1-4)
  2. Poblar datos (paso 6)
  3. Recargar el frontend

## 📞 Soporte

Si tienes problemas:
1. Verifica que Strapi esté ejecutándose en http://localhost:1337
2. Confirma que las credenciales sean correctas
3. Asegúrate de guardar los cambios en los permisos
4. Revisa la consola del navegador para errores

---

¡Una vez completados estos pasos, tendrás una integración completa funcionando! 🚀
