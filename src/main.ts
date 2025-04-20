import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './common/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.port;
  const apiPrefix = configService.apiPrefix;
  const apiVersion = configService.apiVersion;
  const globalPrefix = `${apiPrefix}/${apiVersion}`;

  // Apply global prefix for all routes
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS
  app.enableCors();

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Setup Swagger documentation
  if (configService.isDevelopment) {
    const config = new DocumentBuilder()
      .setTitle('Confluence 2.0 API')
      .setDescription('The Confluence 2.0 API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  }

  // Start the server
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/${globalPrefix}`);
  
  if (configService.isDevelopment) {
    console.log(`Swagger documentation is available at: http://localhost:${port}/${globalPrefix}/docs`);
  }
}
bootstrap();
