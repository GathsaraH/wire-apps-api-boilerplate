import { Body, Controller, Post } from '@nestjs/common';
import {  ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FilesS3PresignedService } from './files.service';
import { FileUploadDto } from '../dto/file.dto';
import { FileUpdateResponseDto } from '../dto/file-upload-response.dto';

@ApiTags('Files')
@Controller({
  path: 'files',
})
export class FilesS3PresignedController {
  constructor(private readonly filesService: FilesS3PresignedService) {}

  @ApiCreatedResponse({
    type: FileUpdateResponseDto,
  })
  @Post('upload')
  async uploadFile(@Body() file: FileUploadDto) {
    return this.filesService.create(file);
  }
}
