/**
 * pending-business router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::pending-business.pending-business', {
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
