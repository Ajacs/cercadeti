#!/usr/bin/env node

/**
 * Script para configurar Strapi completamente
 * Incluye configuración de permisos y población de datos
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class StrapiSetup {
  constructor() {
    this.strapiUrl = 'http://localhost:1337';
    this.adminToken = null;
  }

  /**
   * Espera a que Strapi esté disponible
   */
  async waitForStrapi(maxAttempts = 30) {
    console.log('⏳ Esperando a que Strapi esté disponible...');
    
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await axios.get(`${this.strapiUrl}/admin`);
        if (response.status === 200) {
          console.log('✅ Strapi está disponible');
          return true;
        }
      } catch (error) {
        console.log(`⏳ Intento ${i + 1}/${maxAttempts} - Esperando...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('❌ Strapi no está disponible después de esperar');
    return false;
  }

  /**
   * Crea un usuario administrador si no existe
   */
  async createAdminUser() {
    try {
      console.log('👤 Verificando usuario administrador...');
      
      // Intentar hacer login con credenciales por defecto
      const loginResponse = await axios.post(`${this.strapiUrl}/admin/login`, {
        email: 'admin@strapi.io',
        password: 'admin123'
      });
      
      this.adminToken = loginResponse.data.data.token;
      console.log('✅ Usuario administrador encontrado');
      return true;
    } catch (error) {
      console.log('⚠️  Usuario administrador no encontrado, necesitas crearlo manualmente');
      console.log('📋 Instrucciones:');
      console.log('1. Ve a http://localhost:1337/admin');
      console.log('2. Crea una cuenta de administrador');
      console.log('3. Ejecuta este script nuevamente');
      return false;
    }
  }

  /**
   * Configura permisos públicos para las APIs
   */
  async configurePermissions() {
    if (!this.adminToken) {
      console.log('❌ No hay token de administrador disponible');
      return false;
    }

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
        headers: { Authorization: `Bearer ${this.adminToken}` }
      });

      // Encontrar el rol público
      const publicRole = rolesResponse.data.find(role => role.type === 'public');
      if (!publicRole) {
        console.log('❌ No se encontró el rol público');
        return false;
      }

      // Configurar permisos para cada content type
      for (const contentType of contentTypes) {
        const permissions = {
          find: true,
          findOne: true,
          create: false,
          update: false,
          delete: false
        };

        await axios.put(`${this.strapiUrl}/admin/users-permissions/roles/${publicRole.id}`, {
          permissions: {
            [contentType]: permissions
          }
        }, {
          headers: { Authorization: `Bearer ${this.adminToken}` }
        });

        console.log(`✅ Permisos configurados para ${contentType}`);
      }

      return true;
    } catch (error) {
      console.error('❌ Error configurando permisos:', error.message);
      return false;
    }
  }

  /**
   * Poblar Strapi con datos de prueba
   */
  async populateData() {
    console.log('📊 Poblando Strapi con datos de prueba...');

    try {
      // Cargar datos de prueba
      const seedDataPath = path.join(__dirname, '../database/seed/seed-data.json');
      const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

      // Poblar business plans
      for (const plan of seedData.business_plans) {
        await axios.post(`${this.strapiUrl}/api/business-plans`, {
          data: plan
        });
        console.log(`✅ Business plan creado: ${plan.name}`);
      }

      // Poblar zonas
      for (const zone of seedData.zones) {
        await axios.post(`${this.strapiUrl}/api/zones`, {
          data: zone
        });
        console.log(`✅ Zona creada: ${zone.name}`);
      }

      // Poblar categorías
      for (const category of seedData.categories) {
        await axios.post(`${this.strapiUrl}/api/categories`, {
          data: category
        });
        console.log(`✅ Categoría creada: ${category.name}`);
      }

      // Poblar negocios
      for (const business of seedData.businesses) {
        await axios.post(`${this.strapiUrl}/api/businesses`, {
          data: business
        });
        console.log(`✅ Negocio creado: ${business.name}`);
      }

      // Poblar ofertas
      for (const offer of seedData.offers) {
        await axios.post(`${this.strapiUrl}/api/offers`, {
          data: offer
        });
        console.log(`✅ Oferta creada: ${offer.name}`);
      }

      // Poblar anuncios
      for (const ad of seedData.ads) {
        await axios.post(`${this.strapiUrl}/api/ads`, {
          data: ad
        });
        console.log(`✅ Anuncio creado: ${ad.name}`);
      }

      console.log('🎉 Todos los datos han sido poblados exitosamente');
      return true;
    } catch (error) {
      console.error('❌ Error poblando datos:', error.message);
      return false;
    }
  }

  /**
   * Verificar que todo esté funcionando
   */
  async verifySetup() {
    console.log('🧪 Verificando configuración...');

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
        console.log(`✅ ${endpoint} - ${response.data.data?.length || 0} registros`);
      } catch (error) {
        console.log(`❌ ${endpoint} - Error: ${error.response?.status || error.message}`);
        allWorking = false;
      }
    }

    return allWorking;
  }

  /**
   * Ejecutar configuración completa
   */
  async setup() {
    console.log('🚀 Iniciando configuración completa de Strapi...\n');

    // 1. Esperar a que Strapi esté disponible
    const strapiReady = await this.waitForStrapi();
    if (!strapiReady) {
      console.log('❌ No se puede continuar sin Strapi');
      return false;
    }

    // 2. Crear usuario administrador
    const adminReady = await this.createAdminUser();
    if (!adminReady) {
      console.log('❌ No se puede continuar sin usuario administrador');
      return false;
    }

    // 3. Configurar permisos
    const permissionsSet = await this.configurePermissions();
    if (!permissionsSet) {
      console.log('⚠️  Continuando sin permisos configurados...');
    }

    // 4. Poblar datos
    const dataPopulated = await this.populateData();
    if (!dataPopulated) {
      console.log('⚠️  Continuando sin datos poblados...');
    }

    // 5. Verificar configuración
    const setupWorking = await this.verifySetup();

    if (setupWorking) {
      console.log('\n🎉 ¡Configuración de Strapi completada exitosamente!');
      console.log('🌐 Panel de administración: http://localhost:1337/admin');
      console.log('🔗 APIs disponibles:');
      console.log('   - http://localhost:1337/api/businesses');
      console.log('   - http://localhost:1337/api/categories');
      console.log('   - http://localhost:1337/api/zones');
      console.log('   - http://localhost:1337/api/business-plans');
      console.log('   - http://localhost:1337/api/offers');
      console.log('   - http://localhost:1337/api/ads');
    } else {
      console.log('\n⚠️  Configuración completada con algunos problemas');
      console.log('Revisa los errores anteriores y configura manualmente si es necesario');
    }

    return setupWorking;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const setup = new StrapiSetup();
  setup.setup().catch(console.error);
}

module.exports = StrapiSetup;
