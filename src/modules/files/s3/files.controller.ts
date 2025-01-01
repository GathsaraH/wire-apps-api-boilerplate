import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { FilesS3Service } from './files.service';
import { FileUpdateResponseDto } from '../dto/file-upload-response.dto';

@ApiTags('Files')
@Controller({
  path: 'files',
})
export class FilesS3Controller {
  constructor(private readonly filesService: FilesS3Service) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.MulterS3.File,
  ): Promise<FileUpdateResponseDto> {
    return this.filesService.create(file);
  }
}
