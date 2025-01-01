import { SetMetadata } from "@nestjs/common";

export const QueryHandler = (queryName: string): ClassDecorator => {
  return SetMetadata("queryName", queryName);
};
