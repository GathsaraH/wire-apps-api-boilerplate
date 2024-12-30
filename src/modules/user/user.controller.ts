import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

@ApiTags('User Module')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    //type: any,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return this.userService.login(loginUserDto);
  }
}
