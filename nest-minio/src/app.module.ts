import { Module } from '@nestjs/common';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [MinioClientModule, FileUploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
