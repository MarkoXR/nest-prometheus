import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotImplementedException,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { requestsCounterName } from './requests-counter.config';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric(requestsCounterName) private requestCounter: Counter<string>,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(tap(() => this.incrementCounter(context)));
  }

  private incrementCounter(context: ExecutionContext) {
    if (context.getType() === 'http') {
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest();
      const response = httpContext.getResponse();
      const method = request.method;
      const path = request.path;
      const status = response.statusCode;

      this.requestCounter.inc({ method, path, status });
      return;
    }
    throw new NotImplementedException();
  }
}
