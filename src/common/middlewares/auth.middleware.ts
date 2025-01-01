import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ClerkMiddleware } from '../../modules/auth/clerk/clerk.middleware';
import { ConfigService } from '@nestjs/config';
import { AuthProviderEnum } from '../constants/auth-providers';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly clerkMiddleware: ClerkMiddleware,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authService: AuthProviderEnum =
      this.configService.get('app.authService',{ infer: true });

    switch (authService) {
      case AuthProviderEnum.CLERK:
        await this.clerkMiddleware.use(req, res, next);
      case AuthProviderEnum.NO_AUTH:
        next();
        break;
      default:
        throw new UnauthorizedException('Unsupported authentication service');
    }
  }
}
