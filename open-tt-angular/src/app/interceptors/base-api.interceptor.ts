import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(`OLD url = ${request.url}`);
    const modified = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
      url: environment.tournament_api_url + request.url,
    });
    console.log(`NEW url = ${modified.url}`);
    return next.handle(modified);
  }
}
