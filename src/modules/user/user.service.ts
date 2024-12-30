import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UserService {
  async register(createUserDto: CreateUserDto): Promise<any> {
    // const user = new User();
    // user.id = this.users.length + 1;
    // user.username = createUserDto.username;
    // user.password = createUserDto.password;
    // this.users.push(user);
    // return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {}
}
