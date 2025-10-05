#!/usr/bin/env node

/**
 * Script para configurar permisos públicos en Strapi
 * Este script configura los permisos para que las APIs sean accesibles públicamente
 */

const axios = require('axios');

class StrapiPermissionsConfigurator {
  constructor() {
    this.strapiUrl = 'http://localhost:1337';
    this.adminToken = null;
    // Solo para desarrollo - NO usar en producción
    this.adminEmail = process.env.STRAPI_ADMIN_EMAIL || 'ajacs1104@gmail.com';
    this.adminPassword = process.env.STRAPI_ADMIN_PASSWORD || '17dtv0027C';
  }

  /**
   * Obtiene token de administrador
   */
  async getAdminToken() {
    try {
      console.log('🔐 Obteniendo token de administrador...');
      
      const response = await axios.post(`${this.strapiUrl}/admin/login`, {
        email: this.adminEmail,
        password: this.adminPassword
      });
      
      this.adminToken = response.data.data.token;
      console.log('✅ Token de administrador obtenido');
      return true;
    } catch (error) {
      console.error('❌ Error obteniendo token de administrador:', error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Configura permisos públicos para las APIs
   */
  async configurePublicPermissions() {
    console.log('🔧 Configurando permisos públicos...');

    const contentTypes = [
      'business-plans',
      'zones', 
      'categories',
      'businesses',
      'offers',
      'ads'
    ];

    try {
      // Obtener roles
      const rolesResponse = await axios.get(`${this.strapiUrl}/admin/users-permissions/roles`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.adminToken}`
        }
      });

      console.log('📋 Respuesta de roles:', JSON.stringify(rolesResponse.data, null, 2));

      // Encontrar el rol público
      const roles = rolesResponse.data.data || rolesResponse.data;
      const publicRole = roles.find(role => role.type === 'public');
      if (!publicRole) {
        console.log('❌ No se encontró el rol público');
        return false;
      }

      console.log(`📋 Configurando permisos para el rol público (ID: ${publicRole.id})`);

      // Configurar permisos para cada content type
      for (const contentType of contentTypes) {
        const permissions = {
          find: true,
          findOne: true,
          create: false,
          update: false,
          delete: false
        };

        console.log(`📝 Configurando permisos para ${contentType}:`, permissions);

        // Actualizar permisos usando la API de administración
        await axios.put(`${this.strapiUrl}/admin/users-permissions/roles/${publicRole.id}`, {
          name: publicRole.name,
          description: publicRole.description,
          type: 'public',
          permissions: {
            [contentType]: permissions
          }
        }, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.adminToken}`
          }
        });

        console.log(`✅ Permisos configurados para ${contentType}`);
      }

      return true;
    } catch (error) {
      console.error('❌ Error configurando permisos:', error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Verifica que las APIs estén accesibles
   */
  async testAPIAccess() {
    console.log('🧪 Verificando acceso a las APIs...');

    const endpoints = [
      '/api/business-plans',
      '/api/zones',
      '/api/categories', 
      '/api/businesses',
      '/api/offers',
      '/api/ads'
    ];

    let allWorking = true;

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${this.strapiUrl}${endpoint}`);
        console.log(`✅ ${endpoint} - Status: ${response.status} (${response.data.data?.length || 0} registros)`);
      } catch (error) {
        if (error.response?.status === 403) {
          console.log(`⚠️  ${endpoint} - Permisos restringidos (403)`);
          allWorking = false;
        } else {
          console.log(`❌ ${endpoint} - Error: ${error.message}`);
          allWorking = false;
        }
      }
    }

    return allWorking;
  }

  /**
   * Ejecuta la configuración completa
   */
  async configure() {
    console.log('🚀 Iniciando configuración automática de permisos de Strapi...');
    
    // Intentar obtener token de administrador
    const tokenObtained = await this.getAdminToken();
    
    if (tokenObtained) {
      // Configurar permisos automáticamente
      const permissionsSet = await this.configurePublicPermissions();
      
      if (permissionsSet) {
        console.log('🎉 Permisos configurados automáticamente!');
        await this.testAPIAccess();
      } else {
        console.log('⚠️  Error configurando permisos automáticamente');
        this.showManualInstructions();
      }
    } else {
      console.log('⚠️  No se pudo obtener token de administrador');
      this.showManualInstructions();
    }
  }

  /**
   * Muestra instrucciones manuales
   */
  showManualInstructions() {
    console.log('\n📋 INSTRUCCIONES MANUALES:');
    console.log('1. Ir a http://localhost:1337/admin');
    console.log('2. Hacer login con: ajacs1104@gmail.com / 17dtv0027C');
    console.log('3. Ir a Settings > Users & Permissions Plugin > Roles');
    console.log('4. Editar el rol "Public"');
    console.log('5. Para cada Content Type, habilitar:');
    console.log('   ✅ find (encontrar múltiples)');
    console.log('   ✅ findOne (encontrar uno)');
    console.log('   ❌ create (crear)');
    console.log('   ❌ update (actualizar)');
    console.log('   ❌ delete (eliminar)');
    console.log('6. Guardar los cambios');
    console.log('\n🎯 Content Types a configurar:');
    console.log('   - business-plans');
    console.log('   - zones');
    console.log('   - categories');
    console.log('   - businesses');
    console.log('   - offers');
    console.log('   - ads');
    
    console.log('\n⏳ Después de configurar los permisos, ejecuta:');
    console.log('   npm run populate');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const configurator = new StrapiPermissionsConfigurator();
  configurator.configure().catch(console.error);
}

module.exports = StrapiPermissionsConfigurator;
