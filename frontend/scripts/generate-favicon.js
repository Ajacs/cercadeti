const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  console.log('🎨 Generando favicon.ico desde logo.svg...');

  try {
    // Leer el SVG
    const svgPath = path.join(__dirname, '../public/logo.svg');
    const svgBuffer = fs.readFileSync(svgPath);

    // Convertir SVG a PNG en diferentes tamaños
    const sizes = [16, 32, 48, 64, 128, 256];
    const pngBuffers = [];

    for (const size of sizes) {
      const pngBuffer = await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer();
      
      pngBuffers.push({ size, buffer: pngBuffer });
      console.log(`✅ Generado PNG ${size}x${size}`);
    }

    // Crear un favicon simple (16x16) para ICO
    const faviconBuffer = await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toBuffer();

    // Guardar como favicon.ico (usando PNG para simplicidad)
    const faviconPath = path.join(__dirname, '../public/favicon.ico');
    fs.writeFileSync(faviconPath, faviconBuffer);
    
    console.log('✅ favicon.ico creado exitosamente');

    // También crear versiones PNG para diferentes dispositivos
    const favicon16Path = path.join(__dirname, '../public/favicon-16x16.png');
    const favicon32Path = path.join(__dirname, '../public/favicon-32x32.png');
    const appleTouchIconPath = path.join(__dirname, '../public/apple-touch-icon.png');

    await sharp(svgBuffer).resize(16, 16).png().toFile(favicon16Path);
    await sharp(svgBuffer).resize(32, 32).png().toFile(favicon32Path);
    await sharp(svgBuffer).resize(180, 180).png().toFile(appleTouchIconPath);

    console.log('✅ Archivos de favicon generados:');
    console.log('   - favicon.ico (32x32)');
    console.log('   - favicon-16x16.png');
    console.log('   - favicon-32x32.png');
    console.log('   - apple-touch-icon.png');

  } catch (error) {
    console.error('❌ Error generando favicon:', error);
  }
}

generateFavicon();
