import { FileType } from '@/common/types/file';
import { ApiProperty } from '@nestjs/swagger';

export class FileUpdateResponseDto {
  @ApiProperty({
    type: () => FileType,
  })
  file: FileType;
}
