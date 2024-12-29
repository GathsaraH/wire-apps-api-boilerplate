import { registerAs } from '@nestjs/config';
import { applicationConfig } from './config';

export default registerAs('app', () => ({
  // General Config
  nodeEnv: applicationConfig.nodeEnv,
  name: applicationConfig.appName,
  port: applicationConfig.port,
  apiPrefix: applicationConfig.apiPrefix,
  fallbackLanguage: applicationConfig.appFallBackLanguage,
  frontendUrl: applicationConfig.frontendUrl,
  // Database Config
  database: {
    host: applicationConfig.database.host,
    url: applicationConfig.database.url,
  },
  // Mail Config
  mail: {
    host: applicationConfig.mail.host,
    port: applicationConfig.mail.port,
    email: applicationConfig.mail.email,
    password: applicationConfig.mail.password,
  },
}));
