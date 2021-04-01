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
import { tap } from 'rxjs/operators';
import { TournamentStage } from '../models/tournament';

@Injectable()
export class ResponseMappingInterceptor implements HttpInterceptor {
  iso8601 = /^\d{4}-\d\d-\d\d(T\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/;

  constructor() {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const body = event.body;
            this.convertToDate(body);
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      )
    );
  }

  /**
   * Looks for dates recursively in objects and replace
   * their string values with Date objects.
   */
  convertToDate(body): void {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.isIso8601(value)) {
        body[key] = new Date(value);
      } else if (
        typeof value === 'string' &&
        this.isTournamentStage(key, value)
      ) {
        body[key] = TournamentStage[value.toUpperCase()];
      } else if (typeof value === 'object') {
        this.convertToDate(value);
      }
    }
  }

  isTournamentStage(key: string, value: string): boolean {
    return (
      key.includes('stage') &&
      TournamentStage[value.toUpperCase()] !== undefined
    );
  }

  isIso8601(value): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    return this.iso8601.test(value);
  }
}
