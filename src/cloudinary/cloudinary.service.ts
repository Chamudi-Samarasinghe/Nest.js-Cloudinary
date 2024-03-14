

// src/cloudinary/cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Multer } from 'multer';


@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('cloudinary.cloudName'),
      api_key: this.configService.get('cloudinary.apiKey'),
      api_secret: this.configService.get('cloudinary.apiSecret'),
    });
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      return result;
    } catch (error) {
      throw new Error('Error uploading image to Cloudinary');
    }
  }

  async getAllImages() {
    try {
      const result = await cloudinary.search.expression('resource_type:image').execute();
      return result.resources;
    } catch (error) {
      throw new Error('Error retrieving images from Cloudinary');
    }
  }

  async getImageById(id: string) {
    try {
      const result = await cloudinary.api.resource(id);
      return result;
    } catch (error) {
      throw new Error('Error retrieving image from Cloudinary');
    }
  }

  async updateImage(id: string, file: Express.Multer.File) {
    try {
      const result = await cloudinary.uploader.upload(file.path, { public_id: id });
      return result;
    } catch (error) {
      throw new Error('Error updating image on Cloudinary');
    }
  }

  async deleteImage(id: string) {
    try {
      const result = await cloudinary.uploader.destroy(id);
      return result;
    } catch (error) {
      throw new Error('Error deleting image from Cloudinary');
    }
  }
}
