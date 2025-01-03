import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    description: "The email of the User",
    example: "user@gmail.com",
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  name: string;

  @ApiProperty({
    description: "The password of the User",
    example: "password",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
