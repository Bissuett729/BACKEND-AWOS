import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class getParamInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        try {
            const request = context.switchToHttp().getRequest();
            request.params._order = request.params._order === 'true' ? true : request.params._order === 'false' ? false : null;
            request.params._since = parseInt(request.params._since, 10);
            request.params._limit = parseInt(request.params._limit, 10);
            request.params._active = request.params._active === 'true' ? true : request.params._active === 'false' ? false : null;
            return next.handle();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
