# 🎨 Guía de Íconos Lucide para Categorías

## 📚 ¿Qué son los íconos Lucide?

Tu proyecto usa **Lucide React v0.544.0**, una librería de íconos open-source con más de 1,000 íconos disponibles.

## 🔍 Cómo encontrar íconos

### Opción 1: Sitio oficial (RECOMENDADO)
👉 **https://lucide.dev/icons/**

- Busca por palabra clave
- Copia el nombre exacto del ícono
- Ejemplo: Si ves "ShoppingCart", úsalo así: `icon: "ShoppingCart"`

### Opción 2: Ver en el código
Los íconos se importan dinámicamente en el código:
```typescript
import * as LucideIcons from "lucide-react";

function getLucideIcon(iconName: string) {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    return <IconComponent />;
  }
  return <LucideIcons.HelpCircle />; // Ícono por defecto
}
```

## 🏪 Íconos recomendados para categorías de negocios

### 🍔 Comida y Bebida
```javascript
"UtensilsCrossed"  // Restaurantes en general
"Utensils"         // Comida rápida
"Coffee"           // Cafeterías
"Pizza"            // Pizzerías
"IceCream"         // Heladerías
"Beef"             // Carnicerías
"CakeSlice"        // Panaderías/Pastelerías
"Wine"             // Bares/Licorerías
"ChefHat"          // Cocina gourmet
```

### 🛒 Comercio y Retail
```javascript
"ShoppingCart"     // Supermercados
"Store"            // Tiendas/Abarrotes
"ShoppingBag"      // Tiendas de ropa
"Package"          // Paquetería/Mensajería
"Shirt"            // Moda/Ropa
"Watch"            // Joyería/Accesorios
"Footprints"       // Zapaterías
"Glasses"          // Ópticas
"BookOpen"         // Librerías
```

### 🏠 Hogar y Servicios
```javascript
"Home"             // Servicios del hogar
"Wrench"           // Ferretería/Reparaciones
"Hammer"           // Construcción
"PaintBucket"      // Pintura
"Lightbulb"        // Electricidad
"Droplet"          // Plomería
"Sofa"             // Muebles
"Brush"            // Limpieza
"Drill"            // Herramientas
```

### 💆 Belleza y Salud
```javascript
"Sparkles"         // Belleza en general
"Scissors"         // Peluquería/Salón
"Heart"            // Salud/Bienestar
"Pill"             // Farmacia
"Stethoscope"      // Servicios médicos
"HeartPulse"       // Salud cardiovascular
"Syringe"          // Clínica/Inyecciones
"Smile"            // Odontología
"Eye"              // Oftalmología
```

### 🐾 Mascotas
```javascript
"Heart"            // Veterinaria/Mascotas
"PawPrint"         // Tienda de mascotas
"Dog"              // Perros (si existe en tu versión)
"Cat"              // Gatos (si existe en tu versión)
```

### 🚗 Transporte y Automotriz
```javascript
"Car"              // Automotriz
"Truck"            // Camiones/Transporte
"Bus"              // Transporte público
"Bike"             // Bicicletas
"Fuel"             // Gasolinera
"CarFront"         // Mecánica
"Waypoints"        // GPS/Rastreo
```

### 🏋️ Deportes y Fitness
```javascript
"Dumbbell"         // Gimnasio
"Heart"            // Fitness/Wellness
"Activity"         // Deportes en general
"Footprints"       // Running/Caminata
"Trophy"           // Competencias
"Target"           // Deportes de precisión
```

### 🎓 Educación
```javascript
"GraduationCap"    // Educación/Universidad
"BookOpen"         // Biblioteca/Librería
"School"           // Escuelas
"Languages"        // Idiomas
"Calculator"       // Matemáticas/Contabilidad
"Brain"            // Capacitación mental
```

### 🎭 Entretenimiento
```javascript
"Film"             // Cine
"Music"            // Música
"Tv"               // Televisión
"GamepadIcon"      // Videojuegos (GamepadIcon o Gamepad2)
"PartyPopper"      // Fiestas/Eventos
"Ticket"           // Entradas/Eventos
```

### 📸 Servicios Creativos
```javascript
"Camera"           // Fotografía
"Video"            // Video/Filmación
"Palette"          // Arte/Diseño
"Printer"          // Impresión
"Layout"           // Diseño gráfico
```

### 🏢 Servicios Profesionales
```javascript
"Briefcase"        // Negocios/Oficina
"Building2"        // Empresas
"Users"            // Servicios corporativos
"FileText"         // Documentación/Legal
"Scale"            // Legal/Abogados
"Calculator"       // Contabilidad
"DollarSign"       // Finanzas
```

### 🌿 Otros
```javascript
"Leaf"             // Productos naturales
"Flower"           // Florería
"Trees"            // Jardinería
"Smartphone"       // Tecnología/Celulares
"Laptop"           // Computadoras
"Wifi"             // Internet/Telecomunicaciones
"Key"              // Cerrajería/Seguridad
"Shield"           // Seguridad
"Zap"              // Energía/Electricidad
```

## 💡 Cómo usar los íconos

### En `populate-categories.js`:
```javascript
{
  name: "Abarrotes",
  slug: "abarrotes",
  description: "Tiendas de abarrotes y productos básicos",
  icon: "Store",  // 👈 Solo el nombre del ícono
  color: "#FFB74D",
  is_active: true,
  sort_order: 3
}
```

### En Strapi Admin Panel:
1. Ve a Content Manager → Categories
2. Edita o crea una categoría
3. En el campo "Icon", escribe el nombre exacto: `Store`
4. Guarda

## ⚠️ Importante

1. **Nombre exacto**: El nombre debe coincidir exactamente (case-sensitive)
   - ✅ Correcto: `ShoppingCart`
   - ❌ Incorrecto: `shoppingcart`, `shopping-cart`, `Shopping_Cart`

2. **Si el ícono no existe**: Se mostrará `HelpCircle` (?) como fallback

3. **Verificar en Lucide**: Siempre verifica en https://lucide.dev/icons/ que el ícono existe en la versión que usas

## 🔄 Actualizar la versión de Lucide

Si necesitas íconos más nuevos:

```bash
cd frontend
npm update lucide-react
```

O instalar una versión específica:
```bash
npm install lucide-react@latest
```

## 📝 Ejemplos actuales en el proyecto

```javascript
// De populate-categories.js:
"UtensilsCrossed"  // Restaurantes
"ShoppingCart"     // Supermercados
"Store"            // Abarrotes
"Home"             // Servicios Hogar
"Heart"            // Mascotas
"Car"              // Transporte
"Sparkles"         // Belleza
"Dumbbell"         // Deportes
"GraduationCap"    // Educación
"Film"             // Entretenimiento
"Camera"           // Fotografía
"Shirt"            // Moda
```

## 🎨 Colores recomendados

Los colores son códigos hexadecimales. Aquí algunos que combinan bien:

```javascript
"#FF6B6B"  // Rojo (Comida)
"#4ECDC4"  // Turquesa (Comercio)
"#FFB74D"  // Naranja (Abarrotes)
"#45B7D1"  // Azul claro (Servicios)
"#96CEB4"  // Verde menta (Mascotas)
"#FFEAA7"  // Amarillo (Transporte)
"#DDA0DD"  // Lila (Salud)
"#FFB6C1"  // Rosa (Belleza)
"#87CEEB"  // Azul cielo (Deportes)
"#98D8C8"  // Verde agua (Educación)
"#F7DC6F"  // Amarillo oro (Entretenimiento)
"#BB8FCE"  // Púrpura (Creatividad)
"#85C1E9"  // Azul (Moda)
```

## 🔗 Recursos

- **Sitio oficial de Lucide**: https://lucide.dev
- **GitHub**: https://github.com/lucide-icons/lucide
- **NPM**: https://www.npmjs.com/package/lucide-react
- **Buscar íconos**: https://lucide.dev/icons/

---

¿Necesitas ayuda para elegir un ícono específico? ¡Solo pregunta! 🚀
