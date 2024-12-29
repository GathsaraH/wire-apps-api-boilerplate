import { registerAs } from '@nestjs/config';
import { applicationConfigs } from './configs';

export default registerAs('app', () => ({
  // General Config
  nodeEnv: applicationConfigs.nodeEnv,
  name: applicationConfigs.appName,
  port: applicationConfigs.port,
  apiPrefix: applicationConfigs.apiPrefix,
  fallbackLanguage: applicationConfigs.appFallBackLanguage,
  frontendUrl: applicationConfigs.frontendUrl,
  // Database Config
  database: {
    host: applicationConfigs.database.host,
    url: applicationConfigs.database.url,
  },
  // Mail Config
  mail: {
    host: applicationConfigs.mail.host,
    port: applicationConfigs.mail.port,
    email: applicationConfigs.mail.email,
    password: applicationConfigs.mail.password,
  },
}));
