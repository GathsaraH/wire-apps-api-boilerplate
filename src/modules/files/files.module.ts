import { FileConfig, FileDriver } from "@/core/configs/files/file-config.type";
import fileConfig from "@/core/configs/files/file.config";
import { Module } from "@nestjs/common";
import { FilesLocalModule } from "./local/files.module";
import { FilesS3Module } from "./s3/files.module";
import { FilesS3PresignedModule } from "./s3-presigned/files.module";

const infrastructureUploaderModule =
  (fileConfig() as FileConfig).driver === FileDriver.LOCAL ? FilesLocalModule : (fileConfig() as FileConfig).driver === FileDriver.S3 ? FilesS3Module : FilesS3PresignedModule;

@Module({
  imports: [infrastructureUploaderModule],
  providers: [],
  exports: [],
})
export class FilesModule {}
