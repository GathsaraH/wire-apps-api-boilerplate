import { SerialLoggerService } from '@/core/logging/seri-logger.service';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  constructor(private logger: SerialLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const { method, url, body } = request;
        let bodyString: string;
        try {
          bodyString = JSON.stringify(body);
        } catch (error) {
          bodyString = 'Could not stringify body';
          this.logger.error('Error  request body', error);
        }
        this.logger.log(
          `${method} ${url} - ${duration}ms - Body: ${bodyString}`,
        );
      }),
    );
  }
}
