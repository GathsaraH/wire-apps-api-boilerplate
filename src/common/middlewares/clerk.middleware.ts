import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createClerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  private clerkClient = createClerkClient({
    secretKey: this.configService.get('app.clerkSecretKey'),
  });

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const session = await this.clerkClient.verifyToken(token);
      req['user'] = session.claims;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
