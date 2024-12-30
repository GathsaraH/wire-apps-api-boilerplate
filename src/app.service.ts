import { Injectable } from '@nestjs/common';
import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  private prismaClient: PrismaClient;

  constructor(
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
  ) {
    this.prismaClient = new PrismaClient();
  }

  healthCheck() {
    return this.health.check([() => this.db.pingCheck('database', this.prismaClient)]);
  }
}