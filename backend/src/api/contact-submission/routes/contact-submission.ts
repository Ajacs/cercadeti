/**
 * contact-submission router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact-submission.contact-submission', {
  config: {
    find: {
      middlewares: [],
    },
    findOne: {
      middlewares: [],
    },
    create: {
      middlewares: [],
    },
    update: {
      middlewares: [],
    },
    delete: {
      middlewares: [],
    },
  },
});

// Rutas personalizadas
export const customRoutes = {
  routes: [
    {
      method: 'POST',
      path: '/contact-submissions/:id/mark-read',
      handler: 'contact-submission.markAsRead',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/contact-submissions/:id/mark-replied',
      handler: 'contact-submission.markAsReplied',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
