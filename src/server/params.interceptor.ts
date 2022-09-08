import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ParamsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest() as Request;

    /* after executing the handler add missing request query and params */
    return next.handle().pipe(
      map((data) => {
        return {
          ...request.query,
          ...request.params,
          ...data,
        };
      }),
    );
  }
}
