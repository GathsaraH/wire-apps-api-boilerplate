import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { Transform } from "class-transformer";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fileConfig from "@/core/configs/files/file.config";
import { FileConfig, FileDriver } from "@/core/configs/files/file-config.type";
import appConfig from "@/core/configs/app.config";
import { AppConfig } from "@/core/configs/app-config.type";

export class FileType {
  @ApiProperty({
    type: String,
    example: "cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae",
  })
  @Allow()
  id: string;

  @ApiProperty({
    type: String,
    example: "https://example.com/path/to/file.jpg",
  })
  @Transform(
    ({ value }) => {
      if ((fileConfig() as FileConfig).driver === FileDriver.LOCAL) {
        return (appConfig() as AppConfig).backendDomain + value;
      } else if ([FileDriver.S3_PRESIGNED, FileDriver.S3].includes((fileConfig() as FileConfig).driver)) {
        const s3 = new S3Client({
          region: (fileConfig() as FileConfig).awsS3Region ?? "",
          credentials: {
            accessKeyId: (fileConfig() as FileConfig).accessKeyId ?? "",
            secretAccessKey: (fileConfig() as FileConfig).secretAccessKey ?? "",
          },
        });

        const command = new GetObjectCommand({
          Bucket: (fileConfig() as FileConfig).awsDefaultS3Bucket ?? "",
          Key: value,
        });

        return getSignedUrl(s3, command, { expiresIn: 3600 });
      }

      return value;
    },
    {
      toPlainOnly: true,
    },
  )
  path: string;
}
