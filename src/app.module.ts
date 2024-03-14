// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ImagesController } from './images/images.controller';
import { AppConfigModule } from './config/config.module'; // Import AppConfigModule

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './uploads',
    }),
    AppConfigModule, 
  ],
  controllers: [ImagesController],
  providers: [CloudinaryService],
})
export class AppModule {}

