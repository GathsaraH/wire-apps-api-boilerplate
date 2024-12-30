import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// swagger
export const buildSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('WireApps API')
    .setDescription('This is the API for the WireApps API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    });

  // Add server URLs based on the environment

  config.addServer(
    process.env.BACKEND_DOMAIN,
    process.env.NODE_ENV === 'development' ? 'Development' : 'Production',
  );

  return SwaggerModule.createDocument(app, config.build());
};

export const setupSwagger = (app) => {
  const document = buildSwagger(app);
  SwaggerModule.setup('docs', app, document);
};
