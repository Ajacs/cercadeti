# 🔍 Diagnóstico: Categoría "Abarrotes" no aparece en producción

## Problema identificado

La categoría "Abarrotes" fue creada manualmente en producción pero no aparece en el frontend cuando hay negocios asignados a ella.

## Causas posibles

1. **Los negocios no tienen asignada la categoría correctamente**
   - El slug debe ser exactamente: `abarrotes` (sin mayúsculas, sin espacios)
   - La relación en Strapi debe estar correctamente configurada

2. **La categoría no está activa**
   - Verificar que `is_active: true` en Strapi

3. **No hay negocios con esta categoría en la zona específica**
   - Con el nuevo filtrado, solo se muestran categorías con negocios

## Solución paso a paso

### 1. Ejecutar el script de diagnóstico

```bash
cd backend/scripts

# Para desarrollo local
node debug-categories.js

# Para producción (cambiar la variable de entorno)
STRAPI_URL=https://tu-dominio-strapi.com node debug-categories.js
```

Este script te dirá:
- ✅ Si la categoría "Abarrotes" existe
- ✅ Cuántos negocios tienen esta categoría
- ✅ Los nombres de los negocios
- ⚠️ Si hay problemas de configuración

### 2. Si la categoría no existe en local

Ejecutar el script de población (ahora incluye "Abarrotes"):

```bash
cd backend/scripts
node populate-categories.js
```

### 3. Verificar negocios en Strapi Admin

1. Ir a: `http://localhost:1337/admin` (o tu URL de producción)
2. Content Manager → Businesses
3. Para cada negocio de abarrotes:
   - Editar el negocio
   - En el campo "Category", seleccionar "Abarrotes"
   - Verificar que el negocio esté en la zona correcta
   - Guardar

### 4. Verificar la categoría

1. Content Manager → Categories
2. Buscar "Abarrotes"
3. Verificar:
   - ✅ Slug: `abarrotes` (exactamente así)
   - ✅ is_active: `true`
   - ✅ Color: `#FFB74D`
   - ✅ Icon: `Store`

### 5. Probar en el frontend

Una vez configurado correctamente:

1. Ir a: `http://localhost:3000/zona/pedregal` (o tu zona)
2. La categoría "Abarrotes" debería aparecer **solo si hay negocios**
3. El contador mostrará la cantidad correcta de negocios

## Cambios realizados

### 1. Script de categorías actualizado (`populate-categories.js`)
- ✅ Agregada categoría "Abarrotes" con:
  - Nombre: "Abarrotes"
  - Slug: "abarrotes"
  - Descripción: "Tiendas de abarrotes y productos básicos"
  - Icono: "Store"
  - Color: "#FFB74D"
  - sort_order: 3

### 2. Filtrado inteligente en frontend
- ✅ Ahora **solo se muestran categorías con negocios** en esa zona
- ✅ Si una categoría no tiene negocios, no aparecerá
- ✅ Esto evita mostrar categorías "vacías"

### 3. Script de diagnóstico (`debug-categories.js`)
- ✅ Nuevo script para diagnosticar problemas
- ✅ Muestra todas las categorías y negocios
- ✅ Busca específicamente "Abarrotes"

## Verificación final

Para confirmar que todo funciona:

```bash
# 1. Ejecutar diagnóstico
cd backend/scripts
node debug-categories.js

# Deberías ver algo como:
# 📂 Categorías registradas:
#    ✅ Abarrotes (slug: "abarrotes") - ID: XX
#
# 📦 Negocios y sus categorías:
#    📁 Abarrotes (slug: "abarrotes") - 3 negocio(s):
#       • Abarrotes Don Juan
#       • Tienda La Esquina
#       • ...
```

## Notas importantes

⚠️ **El nuevo comportamiento del frontend:**
- Las categorías solo aparecen si tienen negocios en esa zona específica
- Esto es intencional para evitar confundir a los usuarios
- Si una categoría no aparece, puede ser porque no hay negocios, no porque haya un error

✅ **Beneficios:**
- Mejor experiencia de usuario
- No más clics en categorías vacías
- Información siempre relevante

## Soporte

Si después de seguir estos pasos el problema persiste:
1. Ejecuta el script de diagnóstico y comparte el output
2. Verifica los logs de Strapi para errores
3. Confirma que la API de Strapi está respondiendo correctamente
