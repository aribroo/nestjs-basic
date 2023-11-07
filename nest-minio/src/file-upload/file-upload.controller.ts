import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  UploadedFiles,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { BufferedFile } from './file.model';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    const result = await this.fileUploadService.uploadSingle(image);
    return { data: result };
  }

  @Post('many')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  async uploadMany(@UploadedFiles() images: BufferedFile[]) {
    const result = await this.fileUploadService.uploadMany(images);
    return { data: result };
  }
}
