import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


// swagger
export const buildSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('WireApps API')
    .setDescription('This is the API for the WireApps API')
    .setVersion('1.0')
    .addTag('LMS')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    });

  // Add server URLs based on the environment
  if (process.env.NODE_ENV === 'development') {
    config.addServer('https://www.wireapps.co.uk/', 'Localhost');
  } else {
    config.addServer(process.env.PUBLIC_URL, 'Public Dev');
  }

  return SwaggerModule.createDocument(app, config.build());
};

export const setupSwagger = (app) => {
  const document = buildSwagger(app);
  SwaggerModule.setup('docs', app, document);
};