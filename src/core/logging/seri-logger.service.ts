import { Injectable, LoggerService } from '@nestjs/common';
import pino from 'pino';
import { PinoConfig } from './pino.config';

@Injectable()
export class SerialLoggerService implements LoggerService {
  private readonly logger = pino(PinoConfig);

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error({ message, trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
