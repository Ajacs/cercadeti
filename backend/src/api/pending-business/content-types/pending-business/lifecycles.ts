/**
 * Lifecycle callbacks for pending-business
 * Automatically creates a business when status changes to 'approved'
 */

export default {
  async beforeUpdate(event) {
    const { data, where } = event.params;

    // Solo proceder si el validation_status está cambiando a 'approved'
    if (data.validation_status === 'approved') {
      // Obtener el negocio pendiente completo con sus relaciones
      const pendingBusiness = await strapi.db.query('api::pending-business.pending-business').findOne({
        where: { id: where.id },
        populate: ['category', 'zone', 'business_plan']
      });

      if (!pendingBusiness) {
        return;
      }

      // Verificar si ya fue procesado
      if ((pendingBusiness as any).validation_status === 'approved') {
        return;
      }

      try {
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

        // Crear el negocio
        await strapi.db.query('api::business.business').create({
          data: businessData,
          populate: ['category', 'zone', 'plan']
        });

        // Actualizar el pending business con la fecha de revisión
        data.reviewed_at = new Date().toISOString();

      } catch (error) {
        throw error;
      }
    }
  },

  async afterUpdate(event) {
    // Lifecycle completed
  }
};
