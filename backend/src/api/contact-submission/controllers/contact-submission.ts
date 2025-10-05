/**
 * contact-submission controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contact-submission.contact-submission', ({ strapi }) => ({
  async create(ctx) {
    try {
      // Agregar timestamp de envío
      ctx.request.body.data.submitted_at = new Date().toISOString();
      ctx.request.body.data.status = 'new';

      const entity = await strapi.entityService.create('api::contact-submission.contact-submission', {
        data: ctx.request.body.data
      });

      return { data: entity };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async markAsRead(ctx) {
    try {
      const { id } = ctx.params;

      const entity = await strapi.entityService.update('api::contact-submission.contact-submission', id, {
        data: {
          status: 'read'
        }
      });

      return { data: entity };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async markAsReplied(ctx) {
    try {
      const { id } = ctx.params;

      const entity = await strapi.entityService.update('api::contact-submission.contact-submission', id, {
        data: {
          status: 'replied',
          replied_at: new Date().toISOString()
        }
      });

      return { data: entity };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
}));
