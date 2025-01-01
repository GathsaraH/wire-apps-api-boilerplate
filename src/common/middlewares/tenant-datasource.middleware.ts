import { PublicPrismaService } from "@/core/configs/database/public-prisma.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response } from "express";
import { IRequestWithProps } from "../types/request-with-props";

@Injectable()
export class TenantDatasourceMiddleware implements NestMiddleware {
  constructor(private readonly publicPrisma: PublicPrismaService) {}

  async use(request: IRequestWithProps, response: Response, next: () => void) {
    const tenantCode = request.headers["x-tenant-code"] as string;

    const tenant = await this.publicPrisma.tenant.findFirst({
      include: { datasource: true },
      where: { code: tenantCode },
    });

    request.tenant = {
      tenantCode: tenantCode,
      datasourceUrl: tenant?.datasource?.url,
    };

    next();
  }
}
