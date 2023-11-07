import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { minioConfig } from './minio.config';

@Module({
  imports: [
    MinioModule.register({
      endPoint: minioConfig.MINIO_ENDPOINT,
      port: minioConfig.MINIO_PORT,
      useSSL: false,
      accessKey: minioConfig.MINIO_ACCESSKEY,
      secretKey: minioConfig.MINIO_SECRETKEY,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
