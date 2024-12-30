import { SetMetadata } from '@nestjs/common';

export const CommandHandler = (commandName: string): ClassDecorator => {
  return SetMetadata('commandName', commandName);
};
