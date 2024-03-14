// src/images/images.controller.ts

import { Controller, Post, UploadedFile, UseInterceptors, NotFoundException, BadRequestException, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiNotFoundResponse, ApiBadRequestResponse, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Multer } from 'multer';


@Controller('images')
@ApiTags('images')
export class ImagesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const result = await this.cloudinaryService.uploadImage(file);
    return result;
  }

  @Get()
  @ApiNotFoundResponse({ description: 'No images found' })
  async getAllImages() {
    const images = await this.cloudinaryService.getAllImages();
    if (!images) {
      throw new NotFoundException('No images found');
    }
    return images;
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Image ID' })
  @ApiNotFoundResponse({ description: 'Image not found' })
  async getImageById(@Param('id') id: string) {
    const image = await this.cloudinaryService.getImageById(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Image ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'New image file to replace the existing one',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.updateImage(id, file);
    return result;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Image ID' })
  async deleteImage(@Param('id') id: string) {
    const result = await this.cloudinaryService.deleteImage(id);
    return result;
  }
}
