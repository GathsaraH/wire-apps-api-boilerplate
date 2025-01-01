import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user-dto";
import { SerialLoggerService } from "@/core/logging/seri-logger.service";
import { User } from "@prisma/client";
import { PrimaryPrismaService } from "@/core/configs/database/primary-prisma.service";
import { ClerkService } from "../auth/clerk/clerk.service";

@Injectable()
export class UserService {
  constructor(
    private logger: SerialLoggerService,
    private readonly publicPrisma: PrimaryPrismaService,
    private readonly clerkService: ClerkService,
  ) {}
  async userRegister(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log("Registering user", { context: createUserDto });
      const user = await this.publicPrisma.user.create({
        data: {
          email: createUserDto.email,

          name: createUserDto.name,
        },
      });
      // Create user in Clerk
      const clerkUser = await this.clerkService.register(createUserDto.email, createUserDto.password, createUserDto.name);
      this.logger.log(`User registered in CLERK`);
      // Update user in Prisma
      return await this.publicPrisma.user.update({
        where: { id: user.id },
        data: {
          clerkUserId: clerkUser.id,
        },
      });
    } catch (error) {
      this.logger.error("Error registering user", error);
      throw new HttpException(error.message ?? "Error in userRegister", error.status ?? 500);
    }
  }

  async login(): Promise<any> {}
}
