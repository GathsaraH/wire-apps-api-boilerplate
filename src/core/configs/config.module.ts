import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { DatabaseModule } from './database/database.module';
import fileConfig from './files/file.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
  ],
})
export class AppConfigModule {}
