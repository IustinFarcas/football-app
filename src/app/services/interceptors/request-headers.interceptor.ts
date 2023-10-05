import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestHeaderInterceptor implements HttpInterceptor {
  apiKey: string = 'a5e82426e1b657f078bba9ea5aa31c54';
  apiHost: string = 'v3.football.api-sports.io';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        'x-rapidapi-host': this.apiHost,
        'x-rapidapi-key': this.apiKey,
      },
    });
    return next.handle(request);
  }
}
