// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Setup Swagger
  setupSwagger(app);

  await app.listen(3005);
}
bootstrap();


