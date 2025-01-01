// query-bus.ts
import { Injectable, Type } from '@nestjs/common';

@Injectable()
export class QueryBus {
  private handlers = new Map<string, any>();

  execute(query: any): any {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) {
      throw new Error(`No handler found for query: ${query.constructor.name}`);
    }
    return handler.handle(query);
  }

  register(queryName: string, handler: any) {
    this.handlers.set(queryName, handler);
  }
  private getHandler(query: any): Type<any> {
    return Reflect.getMetadata('queryHandler', query.constructor);
  }
}
