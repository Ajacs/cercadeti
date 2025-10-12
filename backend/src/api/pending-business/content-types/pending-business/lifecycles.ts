/**
 * Lifecycle callbacks for pending-business
 * Automatically creates a business when status changes to 'approved'
 */

export default {
  async beforeUpdate(event) {
    const { data, where } = event.params;

    console.log("LIFECYCLE beforeUpdate called");
    console.log("Data:", JSON.stringify(data));
    console.log("Where:", JSON.stringify(where));

    // Solo proceder si el validation_status está cambiando a 'approved'
    if (data.validation_status === 'approved') {
      console.log("Status is approved, processing...");

      // Obtener el negocio pendiente completo con sus relaciones
      const pendingBusiness = await strapi.entityService.findOne(
        'api::pending-business.pending-business',
        where.id,
        {
          populate: ['category', 'zone', 'business_plan', 'logo']
        }
      );

      console.log("Pending business:", JSON.stringify(pendingBusiness));

      if (!pendingBusiness) {
        console.log("Pending business not found");
        return;
      }

      // Verificar si ya fue procesado
      if ((pendingBusiness as any).validation_status === 'approved') {
        console.log("Already approved, skipping");
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
          is_active: true,
          is_verified: true,
          featured: false,
          supports_delivery: false,
          delivery_fee: 0
        };

        // Agregar relaciones si existen (usando ID numérico para entityService)
        if ((pendingBusiness as any).category?.id) {
          businessData.category = (pendingBusiness as any).category.id;
        }

        if ((pendingBusiness as any).zone?.id) {
          businessData.zone = (pendingBusiness as any).zone.id;
        }

        if ((pendingBusiness as any).business_plan?.id) {
          businessData.plan = (pendingBusiness as any).business_plan.id;
        }

        // Agregar logo si existe
        if ((pendingBusiness as any).logo?.id) {
          businessData.main_image = (pendingBusiness as any).logo.id;
        }

        console.log("Creating business with data:", JSON.stringify(businessData));

        // Crear el negocio usando entityService (más estable que documents API)
        const newBusiness = await strapi.entityService.create('api::business.business', {
          data: businessData,
          populate: ['category', 'zone', 'plan', 'main_image']
        });

        console.log("Business created successfully:", JSON.stringify(newBusiness));

        // Actualizar el pending business con la fecha de revisión
        data.reviewed_at = new Date().toISOString();

      } catch (error) {
        console.error("Error in lifecycle:", error);
        throw error;
      }
    }
  },

  async afterUpdate(event) {
    console.log("LIFECYCLE afterUpdate called");
  }
};
