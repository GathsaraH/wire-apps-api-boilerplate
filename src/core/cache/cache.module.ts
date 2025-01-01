import { Module } from "@nestjs/common";
import { CacheService } from "./cache.service";

@Module({
  providers: [CacheService, { provide: "CACHE_STRATEGY", useClass: CacheStorage }],
  exports: [CacheService],
})
export class CacheModule {}
