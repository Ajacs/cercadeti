// Script simple para probar la conexión con Strapi
const testStrapiConnection = async () => {
  console.log('🧪 Probando conexión con Strapi...');
  
  try {
    const response = await fetch('http://localhost:1337/api/categories');
    console.log('📡 Respuesta de Strapi:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Datos recibidos:', data.data.length, 'categorías');
      console.log('📊 Primeras categorías:', data.data.slice(0, 3).map(c => c.name));
    } else {
      console.log('❌ Error en la respuesta:', response.status);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
};

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  testStrapiConnection();
}

module.exports = { testStrapiConnection };
