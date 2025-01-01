import { Injectable, Type } from "@nestjs/common";

@Injectable()
export class CommandBus {
  private handlers = new Map<string, any>();

  execute(command: any): any {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) {
      throw new Error(`No handler found for command: ${command.constructor.name}`);
    }
    return handler.handle(command);
  }

  register(commandName: string, handler: any) {
    this.handlers.set(commandName, handler);
  }

  private getHandler(command: any): Type<any> {
    return Reflect.getMetadata("commandHandler", command.constructor);
  }
}
