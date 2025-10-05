/**
 * pending-business controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::pending-business.pending-business', ({ strapi }) => ({
  async find(ctx) {
    // Asegurar que siempre se incluyan las relaciones
    if (!ctx.query.populate) {
      ctx.query.populate = { category: true, zone: true, business_plan: true };
    }
    return await super.find(ctx);
  },

  async findOne(ctx) {
    // Asegurar que siempre se incluyan las relaciones
    if (!ctx.query.populate) {
      ctx.query.populate = { category: true, zone: true, business_plan: true };
    }
    return await super.findOne(ctx);
  },

  async update(ctx) {
    const { id } = ctx.params;
    let { data } = ctx.request.body;

    // Limpiar relaciones vacías que vienen como { connect: [], disconnect: [] }
    // Esto es un formato de Strapi v5 admin que causa problemas
    const cleanedData: any = { ...data };

    // Eliminar campos de relaciones si vienen con el formato connect/disconnect vacío
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] && typeof cleanedData[key] === 'object' &&
          'connect' in cleanedData[key] && 'disconnect' in cleanedData[key]) {
        // Si ambos arrays están vacíos, eliminar el campo
        if (cleanedData[key].connect.length === 0 && cleanedData[key].disconnect.length === 0) {
          delete cleanedData[key];
        }
      }
    });

    // Eliminar campos null o undefined innecesarios
    ['createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'documentId'].forEach(field => {
      if (cleanedData[field] === null || cleanedData[field] === undefined) {
        delete cleanedData[field];
      }
    });

    // Actualizar ctx.request.body con los datos limpios
    ctx.request.body.data = cleanedData;

    // Si el validation_status está cambiando a "approved", crear el negocio automáticamente
    if (cleanedData.validation_status === 'approved') {
      // Obtener el pending business actual usando documentId
      const pendingBusiness = await strapi.documents('api::pending-business.pending-business').findOne({
        documentId: id,
        populate: ['category', 'zone', 'business_plan']
      });

      if (pendingBusiness) {
        // Preparar datos para crear el negocio
        const businessData: any = {
          name: pendingBusiness.name,
          description: pendingBusiness.description || '',
          email: pendingBusiness.email,
          phone: pendingBusiness.phone,
          website: pendingBusiness.website || '',
          address: pendingBusiness.address,
          main_image_url: pendingBusiness.logo_url || '',
          is_active: true,
          is_verified: true,
          featured: false,
          supports_delivery: false,
          delivery_fee: 0
        };

        // Agregar relaciones si existen
        if ((pendingBusiness as any).category?.id) {
          businessData.category = (pendingBusiness as any).category.id;
        }

        if ((pendingBusiness as any).zone?.id) {
          businessData.zone = (pendingBusiness as any).zone.id;
        }

        if ((pendingBusiness as any).business_plan?.id) {
          businessData.plan = (pendingBusiness as any).business_plan.id;
        }

        try {
          // Crear el negocio usando Document Service API
          const newBusiness = await strapi.documents('api::business.business').create({
            data: businessData,
            populate: ['category', 'zone', 'plan']
          });

          // Actualizar el pending business con la fecha de revisión
          cleanedData.reviewed_at = new Date().toISOString();
          ctx.request.body.data = cleanedData;
        } catch (error) {
          throw error; // Re-throw para que el usuario vea el error
        }
      }
    }

    // Llamar al update original
    return await super.update(ctx);
  },

  async create(ctx) {
    try {
      // Obtener datos del request
      let data = ctx.request.body.data;

      // Si data viene como string (FormData), parsearlo
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          return ctx.badRequest('Invalid JSON in data field');
        }
      }

      if (!data) {
        return ctx.badRequest('Missing data in request body');
      }

      // Preparar los datos para crear el negocio pendiente
      const pendingBusinessData: any = {
        name: data.name,
        description: data.description || '',
        email: data.email,
        phone: data.phone,
        website: data.website || '',
        address: data.address,
        logo_url: data.logo_url || '',
        custom_category_name: data.custom_category_name || '',
        submitted_at: data.submitted_at || new Date().toISOString(),
        validation_status: data.validation_status || 'pending',
        // Relaciones - formato simple para Strapi v5
        category: data.category ? parseInt(data.category) : null,
        zone: data.zone ? parseInt(data.zone) : null,
        business_plan: data.business_plan ? parseInt(data.business_plan) : null
      };

      // Validar campos requeridos
      if (!pendingBusinessData.name || !pendingBusinessData.email || !pendingBusinessData.phone || !pendingBusinessData.address) {
        return ctx.badRequest('Missing required fields: name, email, phone, address');
      }

      const entity = await strapi.entityService.create('api::pending-business.pending-business', {
        data: pendingBusinessData,
        populate: ['category', 'zone', 'business_plan']
      });

      return { data: entity };
    } catch (error) {
      ctx.throw(500, error.message || 'Internal Server Error');
    }
  },

  async approve(ctx) {
    try {
      const { id } = ctx.params;
      
      // Obtener el negocio pendiente
      const pendingBusiness = await strapi.entityService.findOne('api::pending-business.pending-business', id, {
        populate: ['category', 'zone', 'business_plan']
      });

      if (!pendingBusiness) {
        return ctx.notFound('Pending business not found');
      }

      // Crear el negocio real
      const businessData: any = {
        name: pendingBusiness.name,
        description: pendingBusiness.description,
        email: pendingBusiness.email,
        phone: pendingBusiness.phone,
        website: pendingBusiness.website,
        address: pendingBusiness.address,
        main_image_url: pendingBusiness.logo_url,
        category: (pendingBusiness as any).category?.id || null,
        zone: (pendingBusiness as any).zone?.id || null,
        plan: (pendingBusiness as any).business_plan?.id || null,
        is_active: true,
        is_verified: true,
        featured: false
      };

      const newBusiness = await strapi.entityService.create('api::business.business', {
        data: businessData,
        populate: ['category', 'zone', 'plan']
      });

      // Actualizar el estado del negocio pendiente
      await strapi.entityService.update('api::pending-business.pending-business', id, {
        data: {
          validation_status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: ctx.state.user?.id || 'admin'
        }
      });

      return { 
        data: {
          pending: pendingBusiness,
          business: newBusiness,
          message: 'Business approved and created successfully'
        }
      };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async reject(ctx) {
    try {
      const { id } = ctx.params;
      const { reason } = ctx.request.body.data;

      const entity = await strapi.entityService.update('api::pending-business.pending-business', id, {
        data: {
          validation_status: 'rejected',
          rejection_reason: reason,
          reviewed_at: new Date().toISOString(),
          reviewed_by: ctx.state.user?.id || 'admin'
        }
      });

      return { data: entity };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
}));
