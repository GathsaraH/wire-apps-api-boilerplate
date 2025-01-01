import { FileType } from "@/common/types/file";
import { HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";

@Injectable()
export class FilesS3Service {
  constructor() {}

  create(file: Express.MulterS3.File): Promise<{ file: FileType | any }> {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: "selectFile",
        },
      });
    }

    return {
      // Can store key and return it
      file: {},
    };
  }
}
