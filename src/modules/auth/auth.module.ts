import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClerkMiddleware } from '@/common/middlewares/clerk.middleware';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, ClerkMiddleware],
})
export class AuthModule {}
