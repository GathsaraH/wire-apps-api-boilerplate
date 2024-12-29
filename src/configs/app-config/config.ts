// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const applicationConfig = {
  port: parseInt(process.env[`APP_PORT`], 10) || 3003,
  nodeEnv: process.env[`NODE_ENV`],
  appName: process.env[`APP_NAME`],
  apiPrefix: process.env[`API_PREFIX`] || 'api',
  appFallBackLanguage: process.env[`APP_FALLBACK_LANGUAGE`] || 'en',
  appHeaderLanguage: process.env[`APP_HEADER_LANGUAGE`],
  frontendUrl: process.env[`FRONTEND_URL`],
  database: {
    host: process.env[`DATABASE_HOST`],
    url: process.env[`DATABASE_URL`],
  },

  mail: {
    host: process.env[`MAILER_HOST`],
    port: process.env[`MAILER_PORT`],
    email: process.env[`MAILER_USER_EMAIL`],
    password: process.env[`MAILER_USER_PASSWORD`],
  },
};
