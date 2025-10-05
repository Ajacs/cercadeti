#!/usr/bin/env node

/**
 * Script para publicar todos los registros en Strapi
 * Los registros necesitan estar publicados para ser accesibles públicamente
 */

const axios = require('axios');

class StrapiRecordPublisher {
  constructor() {
    this.strapiUrl = 'http://localhost:1337';
    this.adminToken = null;
    // Solo para desarrollo - NO usar en producción
    this.adminEmail = 'ajacs1104@gmail.com';
    this.adminPassword = '17dtv0027C';
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
   * Publica todos los registros de un content type
   */
  async publishContentType(contentType, name) {
    console.log(`\n📝 Publicando ${name}...`);
    
    try {
      // Obtener todos los registros no publicados
      const response = await axios.get(`${this.strapiUrl}/content-manager/collection-types/${contentType}?publicationState=preview`, {
        headers: {
          'Authorization': `Bearer ${this.adminToken}`
        }
      });

      const records = response.data.results || [];
      let publishedCount = 0;
      let errorCount = 0;

      for (const record of records) {
        try {
          // Publicar el registro
          await axios.post(`${this.strapiUrl}/content-manager/collection-types/${contentType}/${record.id}/actions/publish`, {}, {
            headers: {
              'Authorization': `Bearer ${this.adminToken}`
            }
          });
          
          publishedCount++;
          console.log(`   ✅ ${record.name || record.title || `ID ${record.id}`}`);
        } catch (error) {
          errorCount++;
          console.log(`   ❌ Error publicando ${record.name || record.title || `ID ${record.id}`}: ${error.response?.data?.error?.message || error.message}`);
        }
      }

      console.log(`📊 ${name}: ${publishedCount} publicados, ${errorCount} errores`);
      return { publishedCount, errorCount };
    } catch (error) {
      console.log(`❌ Error obteniendo registros de ${name}: ${error.message}`);
      return { publishedCount: 0, errorCount: 1 };
    }
  }

  /**
   * Ejecuta la publicación completa
   */
  async publish() {
    console.log('🚀 Iniciando publicación de registros en Strapi...');
    
    // Obtener token de administrador
    const tokenObtained = await this.getAdminToken();
    if (!tokenObtained) {
      console.log('❌ No se puede continuar sin token de administrador');
      return;
    }

    console.log('\n🎉 Iniciando publicación de registros...');

    // Publicar cada content type
    const results = {
      'api::business-plan.business-plan': await this.publishContentType('api::business-plan.business-plan', 'Business Plans'),
      'api::zone.zone': await this.publishContentType('api::zone.zone', 'Zones'),
      'api::category.category': await this.publishContentType('api::category.category', 'Categories'),
      'api::business.business': await this.publishContentType('api::business.business', 'Businesses'),
      'api::offer.offer': await this.publishContentType('api::offer.offer', 'Offers'),
      'api::ad.ad': await this.publishContentType('api::ad.ad', 'Ads')
    };

    // Resumen final
    console.log('\n📊 RESUMEN FINAL:');
    let totalPublished = 0;
    let totalErrors = 0;
    
    Object.entries(results).forEach(([key, result]) => {
      totalPublished += result.publishedCount;
      totalErrors += result.errorCount;
      console.log(`   ${key}: ${result.publishedCount} publicados, ${result.errorCount} errores`);
    });

    console.log(`\n🎯 TOTAL: ${totalPublished} registros publicados, ${totalErrors} errores`);
    
    if (totalErrors === 0) {
      console.log('\n🎉 ¡Publicación completada exitosamente!');
    } else {
      console.log('\n⚠️  Publicación completada con algunos errores');
    }

    // Verificar que los datos estén accesibles públicamente
    console.log('\n🧪 Verificando acceso público a los datos...');
    await this.verifyPublicAccess();
  }

  /**
   * Verifica que los datos estén accesibles públicamente
   */
  async verifyPublicAccess() {
    const endpoints = [
      '/api/business-plans',
      '/api/zones',
      '/api/categories', 
      '/api/businesses',
      '/api/offers',
      '/api/ads'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${this.strapiUrl}${endpoint}`);
        console.log(`✅ ${endpoint} - ${response.data.data?.length || 0} registros disponibles`);
      } catch (error) {
        console.log(`❌ ${endpoint} - Error: ${error.message}`);
      }
    }
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const publisher = new StrapiRecordPublisher();
  publisher.publish().catch(console.error);
}

module.exports = StrapiRecordPublisher;
