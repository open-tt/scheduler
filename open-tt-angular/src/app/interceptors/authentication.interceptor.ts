import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.getAuthTokenCookie();

    console.log('token');
    console.log(token);
    if (token !== null) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.cookieService.clearAuthToken();
              this.router.navigate(['/']);
            }
          }
        }
      )
    );
  }
}
