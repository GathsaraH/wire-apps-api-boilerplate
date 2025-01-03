import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient as PublicPrismaClient, Prisma } from "@prisma-public/prisma/client";

@Injectable()
export class PublicPrismaService extends PublicPrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "event",
          level: "error",
        },
        {
          emit: "event",
          level: "info",
        },
        {
          emit: "event",
          level: "warn",
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on("query" as never, (e: Prisma.QueryEvent) => {
      Logger.debug("Query: " + e.query);
      Logger.debug("Params: " + e.params);
      Logger.debug("Duration: " + e.duration + "ms");
    });

    await this.$connect();
  }
}
