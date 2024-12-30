import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { SerialLoggerService } from '@/core/logging/seri-logger.service';
import { ApiResponse } from '@/common/response/api-response';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private logger: SerialLoggerService) {}
  async userRegister(createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      this.logger.log('Registering user');
      return createUserDto as unknown as ApiResponse<User>;
    } catch (error) {
      this.logger.error('Error registering user', error);
      throw new HttpException(
        error.message ?? 'Error in userRegister',
        error.status ?? 500,
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {}
}
