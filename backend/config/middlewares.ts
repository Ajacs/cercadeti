export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        // Production domains
        'https://cercadeti.mx',
        'https://www.cercadeti.mx',
        // Vercel domains (use environment variable in production)
        process.env.FRONTEND_URL || 'https://*.vercel.app',
        // Allow all vercel preview deployments
        /https:\/\/.*\.vercel\.app$/,
      ].filter(Boolean)
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'global::populate-pending-business',
];
