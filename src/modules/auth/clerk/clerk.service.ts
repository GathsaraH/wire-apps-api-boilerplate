import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClerkClient, createClerkClient, User } from '@clerk/clerk-sdk-node';
import { SerialLoggerService } from '@/core/logging/seri-logger.service';

@Injectable()
export class ClerkService {
  private clerkClient: ClerkClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: SerialLoggerService,
  ) {
    this.clerkClient = createClerkClient({
      secretKey: this.configService.get('app.clerkSecretKey'),
    });
  }

  async register(
    email: string,
    password: string,
    firstName: string,
  ): Promise<User> {
    try {
      this.logger.log('Registering user');
      const user = await this.clerkClient.users.createUser({
        emailAddress: [email],
        password,
        firstName,
      });
      this.logger.log(`User registered: ${email}`);
      return user;
    } catch (error) {
      this.logger.error('Error registering user', error);
      throw new UnauthorizedException('Registration failed');
    }
  }
  async getSession(sessionId: string) {
    try {
      const session = await this.clerkClient.sessions.getSession(sessionId);
      this.logger.log(`User  logged in: ${sessionId}`);
      return session;
    } catch (error) {
      this.logger.error('Error logging in user', error.message);
      throw new UnauthorizedException('Login failed');
    }
  }
  async getUser(userId: string) {
    try {
      this.logger.log('Fetching user');
      const user = await this.clerkClient.users.getUser(userId);
      if (!user) {
        throw new NotFoundException('User  not found');
      }
      this.logger.log(`Fetched user: ${userId}`);
      return user;
    } catch (error) {
      this.logger.error('Error fetching user', error.message);
      throw new NotFoundException('User  not found');
    }
  }
  async updateUser(
    userId: string,
    updates: Partial<{
      email: string;
      password: string;
      firstName: string;
    }>,
  ) {
    try {
      this.logger.log('Updating user');
      const user = await this.clerkClient.users.updateUser(userId, updates);
      this.logger.log(`User  updated: ${userId}`);
      return user;
    } catch (error) {
      this.logger.error('Error updating user', error.message);
      throw new UnauthorizedException('Update failed');
    }
  }
  async deleteUser(userId: string) {
    try {
      this.logger.log('Deleting user');
      await this.clerkClient.users.deleteUser(userId);
      this.logger.log(`User  deleted: ${userId}`);
    } catch (error) {
      this.logger.error('Error deleting user', error.message);
      throw new UnauthorizedException('Deletion failed');
    }
  }
}
