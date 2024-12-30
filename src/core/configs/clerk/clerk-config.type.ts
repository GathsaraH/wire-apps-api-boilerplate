import { AuthProviderEnum } from '@/common/constants/auth-providers';

export type ClerkConfig = {
  clerkSecretKey: string;
  clerkPublishableKey: string;
  authService: AuthProviderEnum;
};
