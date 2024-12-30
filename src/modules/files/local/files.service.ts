import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesLocalService {
  constructor(private readonly configService: ConfigService) {}

  async create(file: Express.Multer.File) {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: 'selectFile',
        },
      });
    }

    return {
      // We can save file key or path to database
    };
  }
}
