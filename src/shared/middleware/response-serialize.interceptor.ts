import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseSerialization implements NestInterceptor {
  constructor(public deleteKey: string[]) {}

  public intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((resBody) => {
        if (typeof resBody === 'object') {
          for (const key of this.deleteKey) {
            if (resBody.dataValues) {
              delete resBody.dataValues[key];
            } else {
              delete resBody[key];
            }
          }
        }

        return {
          data: resBody.dataValues ? resBody.dataValues : resBody,
          count: resBody?.count,
        };
      }),
    );
  }
}
