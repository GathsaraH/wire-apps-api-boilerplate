import { BadRequestException, Global, Module, NotFoundException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { PublicPrismaService } from "./public-prisma.service";
import { TenantPrismaService } from "./tenant-prisma.service";
import { IRequestWithProps } from "@/common/types/request-with-props";
import { PrimaryPrismaService } from "./primary-prisma.service";

@Global()
@Module({
  exports: [PublicPrismaService, TenantPrismaService, PrimaryPrismaService],
  providers: [
    {
      provide: PrimaryPrismaService,
      scope: Scope.DEFAULT,
      useClass: PrimaryPrismaService,
    },
    {
      provide: PublicPrismaService,
      scope: Scope.DEFAULT,
      useClass: PublicPrismaService,
    },
    {
      provide: TenantPrismaService,
      scope: Scope.REQUEST,
      inject: [REQUEST],
      useFactory: (request: IRequestWithProps) => {
        const { tenant } = request;

        if (!tenant) throw new BadRequestException("Invalid tenant code.");

        const { tenantCode, datasourceUrl } = tenant;

        if (datasourceUrl) {
          throw new NotFoundException("This tenant has no datasource.");
        }

        return new TenantPrismaService(datasourceUrl).withQueryExtensions(tenantCode);
      },
    },
  ],
})
export class DatabaseModule {}
