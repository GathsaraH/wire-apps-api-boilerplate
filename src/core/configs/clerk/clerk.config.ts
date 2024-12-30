import { registerAs } from '@nestjs/config';

import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import validateConfig from '@/utils/validate-config';
import { AuthProviderEnum } from '@/common/constants/auth-providers';
import { ClerkConfig } from './clerk-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  CLERK_SECRET_KEY: string;

  @IsString()
  @IsOptional()
  CLERK_PUBLISHABLE_KEY: string;

  @IsEnum(AuthProviderEnum)
  @IsNotEmpty()
  AUTH_SERVICE: AuthProviderEnum;
}

export default registerAs<ClerkConfig>('clerk', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    authService: process.env.AUTH_SERVICE as AuthProviderEnum,
  };
});
