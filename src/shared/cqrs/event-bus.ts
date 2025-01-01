import { Injectable } from '@nestjs/common';

@Injectable()
export class EventBus {
  private handlers = new Map<string, any>();

  publish(event: any): void {
    const handlers = this.handlers.get(event.constructor.name) || [];
    handlers.forEach((handler: any) => handler.handle(event));
  }

  subscribe(eventName: string, handler: any) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName).push(handler);
  }
}
