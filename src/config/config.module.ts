// src/config/config.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import cloudinaryConfig from './cloudinary.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cloudinaryConfig],
    }),
  ],
})
export class AppConfigModule {}
