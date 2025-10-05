const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateManifestIcons() {
  console.log('🎨 Generando iconos para manifest.json...');

  try {
    // Leer el SVG
    const svgPath = path.join(__dirname, '../public/logo.svg');
    const svgBuffer = fs.readFileSync(svgPath);

    // Generar icono 192x192
    const icon192Path = path.join(__dirname, '../public/icon-192.png');
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(icon192Path);
    
    console.log('✅ Generado icon-192.png (192x192)');

    // Generar icono 512x512
    const icon512Path = path.join(__dirname, '../public/icon-512.png');
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(icon512Path);
    
    console.log('✅ Generado icon-512.png (512x512)');

    console.log('🎉 Todos los iconos del manifest generados exitosamente');

  } catch (error) {
    console.error('❌ Error generando iconos del manifest:', error);
  }
}

generateManifestIcons();
