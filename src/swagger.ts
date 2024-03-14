// src/swagger.ts

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';


export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('NestJS Cloudinary ')
    .setDescription('API Documentation for uploading images to Cloudinary using NestJS')
    .setVersion('1.0')
    .addTag('images')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
