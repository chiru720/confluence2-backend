import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { SWAGGER_CONFIG } from './common/constants';
import { writeFileSync } from 'fs';
import { join } from 'path';

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
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.TITLE)
    .setDescription(SWAGGER_CONFIG.DESCRIPTION)
    .setVersion(SWAGGER_CONFIG.VERSION)
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Create OpenAPI JSON file path
  const outputPath = join(process.cwd(), 'openapi.json');
  
  // Check if we're only generating OpenAPI spec
  const isGenerateOnly = process.env.GENERATE_OPENAPI_ONLY === 'true';
  
  if (isGenerateOnly) {
    // Save OpenAPI JSON and exit
    writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf8' });
    console.log(`OpenAPI specification has been saved to: ${outputPath}`);
    await app.close();
    process.exit(0);
    return;
  }
  
  // Setup Swagger UI
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  
  // Create route for OpenAPI JSON
  app.use(`/${globalPrefix}/openapi.json`, (req, res) => {
    res.json(document);
  });
  
  // In development mode, save the OpenAPI JSON to a file
  if (configService.isDevelopment) {
    writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf8' });
    console.log(`OpenAPI specification has been saved to: ${outputPath}`);
  }

  // Start the server
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/${globalPrefix}`);
  
  console.log(`Swagger documentation is available at: http://localhost:${port}/${globalPrefix}/docs`);
  console.log(`OpenAPI JSON is available at: http://localhost:${port}/${globalPrefix}/openapi.json`);
}
bootstrap();
