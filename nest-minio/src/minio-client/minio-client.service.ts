import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { minioConfig } from './minio.config';
import * as crypto from 'crypto';
import { BufferedFile } from 'src/file-upload/file.model';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;

  get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  async uploadSingle(
    file: BufferedFile,
    baseBucket: string = minioConfig.MINIO_BUCKET,
  ) {
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    const validExtensions = ['.jpeg', '.jpg', '.png'];
    if (!validExtensions.includes(ext.toLowerCase())) {
      throw new BadRequestException('File must jpeg / png / jpg!');
    }

    const temp_fileName = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_fileName)
      .digest('hex');

    const fileName = hashedFileName + ext;
    const fileBuffer = file.buffer;

    return new Promise((resolve, reject) => {
      this.client.putObject(baseBucket, fileName, fileBuffer, (err) => {
        if (err) {
          reject(new InternalServerErrorException('Error uploading file...'));
        }

        resolve({ message: 'File uploaded successfully' });
      });
    });
  }

  async uploadMany(
    files: BufferedFile[],
    baseBucket: string = minioConfig.MINIO_BUCKET,
  ) {
    const uploadResults = [];

    for (const file of files['image']) {
      const validExtensions = ['.jpeg', '.jpg', '.png'];
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
      );

      if (!validExtensions.includes(ext.toLowerCase())) {
        throw new BadRequestException(
          'File must be in .jpeg, .jpg, or .png format!',
        );
      }

      const temp_fileName = Date.now().toString();
      const hashedFileName = crypto
        .createHash('md5')
        .update(temp_fileName)
        .digest('hex');
      const fileName = hashedFileName + ext;
      const fileBuffer = file.buffer;

      // Upload objek
      const uploadResult = await new Promise((resolve, reject) => {
        this.client.putObject(baseBucket, fileName, fileBuffer, (err) => {
          if (err) {
            reject(new BadRequestException('Error uploading file...'));
          } else {
            resolve({ message: 'File uploaded successfully' });
          }
        });
      });

      uploadResults.push(uploadResult);
    }

    return uploadResults;
  }
}
