/**
 * Middleware para asegurar que las relaciones de pending-business
 * siempre se incluyan en las respuestas del admin panel
 */

export default (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Solo aplicar a las rutas del content-manager para pending-business
    if (ctx.request.url.includes('api::pending-business.pending-business') &&
        ctx.request.url.includes('content-manager')) {

      // Si es una respuesta exitosa con datos
      if (ctx.response.status === 200 && ctx.response.body) {
        const body = ctx.response.body;

        // Función para enriquecer un pending-business con sus relaciones
        const enrichPendingBusiness = async (pb) => {
          if (!pb) return pb;

          try {
            // Obtener el pending-business con todas sus relaciones
            const enriched = await strapi.documents('api::pending-business.pending-business').findOne({
              documentId: pb.documentId,
              populate: {
                category: {
                  fields: ['id', 'name', 'documentId']
                },
                zone: {
                  fields: ['id', 'name', 'documentId']
                },
                business_plan: {
                  fields: ['id', 'name', 'documentId']
                }
              }
            });

            return enriched || pb;
          } catch (error) {
            // Error enriching pending-business
            return pb;
          }
        };

        // Si es una lista de pending-businesses
        if (body.results && Array.isArray(body.results)) {
          body.results = await Promise.all(
            body.results.map(enrichPendingBusiness)
          );
        }
        // Si es un solo pending-business
        else if (body.documentId) {
          const enriched = await enrichPendingBusiness(body);
          ctx.response.body = enriched;
        }
      }
    }
  };
};
