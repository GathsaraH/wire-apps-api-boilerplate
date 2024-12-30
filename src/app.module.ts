import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './core/configs/config.module';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { ResponseLoggingInterceptor } from '@common/interceptors/response-logging.interceptor';
import { TransformResponseInterceptor } from '@common/interceptors/transform-response.interceptor';
import { SerialLoggerModule } from './core/logging/serial-logger.module';
import { UserModule } from './modules/user/user.module';
import { UuidInterceptor } from './common/interceptors/uuid.interceptor';
import { ClerkModule } from './modules/auth/clerk/clerk.module';

@Module({
  imports: [
    AppConfigModule,
    TerminusModule,
    SerialLoggerModule,
    UserModule,
    ClerkModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UuidInterceptor,
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

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('*');
//   }
// }
