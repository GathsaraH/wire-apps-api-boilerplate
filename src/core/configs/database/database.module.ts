import {
  BadRequestException,
  Global,
  Module,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PublicPrismaService } from './public-prisma.service';
import { TenantPrismaService } from './tenant-prisma.service';
import { IRequestWithProps } from 'src/common/types/request-with-props';

@Global()
@Module({
  exports: [PublicPrismaService, TenantPrismaService],
  providers: [
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

        if (!tenant) throw new BadRequestException('Invalid tenant code.');

        const { tenantCode, datasourceUrl } = tenant;

        if (datasourceUrl) {
          throw new NotFoundException('This tenant has no datasource.');
        }

        return new TenantPrismaService(datasourceUrl).withQueryExtensions(
          tenantCode,
        );
      },
    },
  ],
})
export class DatabaseConfig {}