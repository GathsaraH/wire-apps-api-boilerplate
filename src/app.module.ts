import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './core/configs/config.module';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { ResponseLoggingInterceptor } from '@common/interceptors/response-logging.interceptor';
import { TransformResponseInterceptor } from '@common/interceptors/transform-response.interceptor';

@Module({
  imports: [AppConfigModule, TerminusModule],
  controllers: [AppController],
  providers: [AppService,   {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseLoggingInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformResponseInterceptor,
  },
],
})
export class AppModule {}
