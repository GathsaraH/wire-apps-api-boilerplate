import { Module } from "@nestjs/common";
import { ClerkMiddleware } from "@/modules/auth/clerk/clerk.middleware";
import { ClerkService } from "./clerk.service";
import { SerialLoggerModule } from "@/core/logging/serial-logger.module";

@Module({
  imports: [SerialLoggerModule],
  controllers: [],
  providers: [ClerkService, ClerkMiddleware],
  exports: [ClerkService],
})
export class ClerkModule {}
