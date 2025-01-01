export interface CacheStrategy {
  get(key: string): Promise<any>;
  set(key: string, value: any, ttl: number): Promise<void>;
}
