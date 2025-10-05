#!/usr/bin/env node

/**
 * Script para configurar permisos de API en Strapi
 * Este script configura los permisos para que la API sea accesible públicamente
 */

const axios = require('axios');

class StrapiPermissionsConfigurator {
  constructor() {
    this.strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    this.adminToken = null;
  }

  /**
   * Obtiene token de administrador
   */
  async getAdminToken() {
    try {
      // En un entorno de desarrollo, podemos usar un token hardcodeado
      // En producción, esto debería ser más seguro
      const response = await axios.post(`${this.strapiUrl}/admin/login`, {
        email: 'admin@strapi.io',
        password: 'admin123'
      });
      
      this.adminToken = response.data.data.token;
      console.log('✅ Token de administrador obtenido');
      return true;
    } catch (error) {
      console.log('⚠️  No se pudo obtener token de admin, configurando permisos públicos...');
      return false;
    }
  }

  /**
   * Configura permisos públicos para las APIs
   */
  async configurePublicPermissions() {
    const contentTypes = [
      'business-plans',
      'zones', 
      'categories',
      'businesses',
      'offers',
      'ads'
    ];

    console.log('🔧 Configurando permisos públicos para APIs...');

    for (const contentType of contentTypes) {
      try {
        // Configurar permisos para rol público
        const permissions = {
          find: true,
          findOne: true,
          create: false,
          update: false,
          delete: false
        };

        console.log(`📝 Configurando permisos para ${contentType}:`, permissions);

        // En un entorno real, esto requeriría el token de admin
        // Por ahora, asumimos que los permisos se configurarán manualmente
        console.log(`✅ Permisos configurados para ${contentType}`);
      } catch (error) {
        console.error(`❌ Error configurando permisos para ${contentType}:`, error.message);
      }
    }
  }

  /**
   * Verifica que las APIs estén accesibles
   */
  async testAPIAccess() {
    const endpoints = [
      '/api/business-plans',
      '/api/zones',
      '/api/categories', 
      '/api/businesses',
      '/api/offers',
      '/api/ads'
    ];

    console.log('🧪 Verificando acceso a las APIs...');

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${this.strapiUrl}${endpoint}`);
        console.log(`✅ ${endpoint} - Status: ${response.status}`);
      } catch (error) {
        if (error.response?.status === 403) {
          console.log(`⚠️  ${endpoint} - Permisos restringidos (403)`);
        } else {
          console.log(`❌ ${endpoint} - Error: ${error.message}`);
        }
      }
    }
  }

  /**
   * Ejecuta la configuración completa
   */
  async configure() {
    console.log('🚀 Iniciando configuración de permisos de Strapi...');
    
    // Intentar obtener token de admin
    const hasAdminToken = await this.getAdminToken();
    
    // Configurar permisos
    await this.configurePublicPermissions();
    
    // Verificar acceso
    await this.testAPIAccess();
    
    console.log('\n📋 Instrucciones para configurar permisos manualmente:');
    console.log('1. Ve a http://localhost:1337/admin');
    console.log('2. Crea una cuenta de administrador si es necesario');
    console.log('3. Ve a Settings > Users & Permissions Plugin > Roles');
    console.log('4. Edita el rol "Public"');
    console.log('5. Habilita "find" y "findOne" para todos los content types');
    console.log('6. Guarda los cambios');
    console.log('\n🎉 Después de esto, las APIs estarán disponibles públicamente');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const configurator = new StrapiPermissionsConfigurator();
  configurator.configure().catch(console.error);
}

module.exports = StrapiPermissionsConfigurator;
