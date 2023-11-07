import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from './file.model';

@Injectable()
export class FileUploadService {
  constructor(private readonly minioClient: MinioClientService) {}

  async uploadSingle(image: BufferedFile): Promise<any> {
    return this.minioClient.uploadSingle(image);
  }

  async uploadMany(images: BufferedFile[]) {
    return this.minioClient.uploadMany(images);
  }
}
