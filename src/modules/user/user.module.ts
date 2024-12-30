import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SerialLoggerModule } from '@/core/logging/serial-logger.module';
import { ClerkModule } from '../auth/clerk/clerk.module';

@Module({
  imports: [SerialLoggerModule,ClerkModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
