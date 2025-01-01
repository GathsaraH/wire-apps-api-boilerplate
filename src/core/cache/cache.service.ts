import { Injectable, Inject } from '@nestjs/common';
import { CacheStrategy } from './cache-strategy.interface';

@Injectable()
export class CacheService {
  constructor(@Inject('CACHE_STRATEGY') private cacheStrategy: CacheStrategy) {}

  async get(key: string): Promise<any> {
    return this.cacheStrategy.get(key);
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    await this.cacheStrategy.set(key, value, ttl);
  }
}
