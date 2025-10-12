/**
 * pending-business controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::pending-business.pending-business', ({ strapi }) => ({
  async find(ctx) {
    // Asegurar que siempre se incluyan las relaciones
    if (!ctx.query.populate) {
      ctx.query.populate = { category: true, zone: true, business_plan: true, logo: true };
    }
    return await super.find(ctx);
  },

  async findOne(ctx) {
    // Asegurar que siempre se incluyan las relaciones
    if (!ctx.query.populate) {
      ctx.query.populate = { category: true, zone: true, business_plan: true, logo: true };
    }
    return await super.findOne(ctx);
  },

  async update(ctx) {
    const { id } = ctx.params;
    let { data } = ctx.request.body;

    console.log("UPDATE called with id:", id);
    console.log("UPDATE data:", JSON.stringify(data));

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

    console.log("Cleaned data:", JSON.stringify(cleanedData));
    console.log("Validation status:", cleanedData.validation_status);

    // Si el validation_status está cambiando a "approved", crear el negocio automáticamente
    if (cleanedData.validation_status === 'approved') {
      console.log("Status is approved, creating business...");
      // Obtener el pending business actual usando documentId
      const pendingBusiness = await strapi.documents('api::pending-business.pending-business').findOne({
        documentId: id,
        populate: ['category', 'zone', 'business_plan', 'logo']
      });

      if (pendingBusiness) {
        console.log("Pending business found:", JSON.stringify(pendingBusiness));

        // Preparar datos para crear el negocio
        const businessData: any = {
          name: pendingBusiness.name,
          description: pendingBusiness.description || '',
          email: pendingBusiness.email,
          phone: pendingBusiness.phone,
          website: pendingBusiness.website || '',
          address: pendingBusiness.address,
          is_active: true,
          is_verified: true,
          featured: false,
          supports_delivery: false,
          delivery_fee: 0
        };

        // Agregar relaciones si existen (usando documentId para Strapi v5)
        if ((pendingBusiness as any).category?.documentId) {
          businessData.category = {
            connect: [(pendingBusiness as any).category.documentId]
          };
        }

        if ((pendingBusiness as any).zone?.documentId) {
          businessData.zone = {
            connect: [(pendingBusiness as any).zone.documentId]
          };
        }

        if ((pendingBusiness as any).business_plan?.documentId) {
          businessData.plan = {
            connect: [(pendingBusiness as any).business_plan.documentId]
          };
        }

        // Agregar logo si existe
        if ((pendingBusiness as any).logo?.documentId) {
          businessData.main_image = {
            connect: [(pendingBusiness as any).logo.documentId]
          };
        }

        console.log("Business data to create:", JSON.stringify(businessData));

        try {
          // Crear el negocio usando Document Service API
          const newBusiness = await strapi.documents('api::business.business').create({
            data: businessData,
            populate: ['category', 'zone', 'plan', 'main_image']
          });

          console.log("Business created successfully:", JSON.stringify(newBusiness));

          // Actualizar el pending business con la fecha de revisión
          cleanedData.reviewed_at = new Date().toISOString();
          ctx.request.body.data = cleanedData;
        } catch (error) {
          console.error("Error creating business:", error);
          throw error; // Re-throw para que el usuario vea el error
        }
      } else {
        console.log("Pending business NOT found with documentId:", id);
      }
    }

    // Llamar al update original
    return await super.update(ctx);
  },

  async create(ctx) {
    console.log("CONTEXT: ", JSON.stringify(ctx.request.body));
    console.log("FILES: ", JSON.stringify(ctx.request.files));

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

      console.log("DATA", JSON.stringify(data));

      // Preparar los datos para crear el negocio pendiente
      const pendingBusinessData: any = {
        name: data.name,
        description: data.description || '',
        email: data.email,
        phone: data.phone,
        website: data.website || '',
        address: data.address,
        custom_category_name: data.custom_category_name || '',
        submitted_at: data.submitted_at || new Date().toISOString(),
        validation_status: data.validation_status || 'pending'
      };

      // Manejar relaciones - Strapi v5 necesita conectar por documentId
      if (data.category) {
        const categoryId = typeof data.category === 'string' ? parseInt(data.category) : data.category;
        if (!isNaN(categoryId)) {
          // Obtener el documentId de la categoría usando su ID numérico
          const category = await strapi.entityService.findOne('api::category.category', categoryId);
          if (category && (category as any).documentId) {
            pendingBusinessData.category = {
              connect: [(category as any).documentId]
            };
          }
        }
      }

      if (data.zone) {
        const zoneId = typeof data.zone === 'string' ? parseInt(data.zone) : data.zone;
        if (!isNaN(zoneId)) {
          const zone = await strapi.entityService.findOne('api::zone.zone', zoneId);
          if (zone && (zone as any).documentId) {
            pendingBusinessData.zone = {
              connect: [(zone as any).documentId]
            };
          }
        }
      }

      if (data.business_plan) {
        const planId = typeof data.business_plan === 'string' ? parseInt(data.business_plan) : data.business_plan;
        if (!isNaN(planId)) {
          const plan = await strapi.entityService.findOne('api::business-plan.business-plan', planId);
          if (plan && (plan as any).documentId) {
            pendingBusinessData.business_plan = {
              connect: [(plan as any).documentId]
            };
          }
        }
      }

      // Validar campos requeridos
      if (!pendingBusinessData.name || !pendingBusinessData.email || !pendingBusinessData.phone || !pendingBusinessData.address) {
        return ctx.badRequest('Missing required fields: name, email, phone, address');
      }

      // Crear el negocio pendiente
      const entity = await strapi.entityService.create('api::pending-business.pending-business', {
        data: pendingBusinessData,
        populate: ['category', 'zone', 'business_plan', 'logo']
      });

      // Si hay un archivo de logo, asociarlo
      if (ctx.request.files && ctx.request.files.logo) {
        const logoFile = ctx.request.files.logo;

        // Subir el archivo usando el plugin de upload de Strapi
        const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
          data: {
            refId: entity.id,
            ref: 'api::pending-business.pending-business',
            field: 'logo'
          },
          files: logoFile
        });

        // Recargar la entidad con el logo asociado
        const updatedEntity = await strapi.entityService.findOne('api::pending-business.pending-business', entity.id, {
          populate: ['category', 'zone', 'business_plan', 'logo']
        });

        return { data: updatedEntity };
      }

      return { data: entity };
    } catch (error) {
      console.error('Error creating pending business:', error);
      ctx.throw(500, error.message || 'Internal Server Error');
    }
  },

  async approve(ctx) {
    try {
      const { id } = ctx.params;

      // Obtener el negocio pendiente
      const pendingBusiness = await strapi.entityService.findOne('api::pending-business.pending-business', id, {
        populate: ['category', 'zone', 'business_plan', 'logo']
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
        is_active: true,
        is_verified: true,
        featured: false
      };

      // Agregar relaciones si existen (usando documentId para Strapi v5)
      if ((pendingBusiness as any).category?.documentId) {
        businessData.category = {
          connect: [(pendingBusiness as any).category.documentId]
        };
      }

      if ((pendingBusiness as any).zone?.documentId) {
        businessData.zone = {
          connect: [(pendingBusiness as any).zone.documentId]
        };
      }

      if ((pendingBusiness as any).business_plan?.documentId) {
        businessData.plan = {
          connect: [(pendingBusiness as any).business_plan.documentId]
        };
      }

      // Agregar logo si existe
      if ((pendingBusiness as any).logo?.documentId) {
        businessData.main_image = {
          connect: [(pendingBusiness as any).logo.documentId]
        };
      }

      const newBusiness = await strapi.entityService.create('api::business.business', {
        data: businessData,
        populate: ['category', 'zone', 'plan', 'main_image']
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
