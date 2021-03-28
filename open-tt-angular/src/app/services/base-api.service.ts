import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/**
 * This class is used to handle auth in a common place rather than on every call to http.
 */
@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(private http: HttpClient) {}

  post<T>(path: string, params: {} = {}, body: {} = {}): Observable<T> {
    const url = environment.tournament_api_url + path;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpOptions = {
      headers,
      params,
    };
    return this.http.post<T>(url, body, httpOptions);
  }

  get<T>(path: string, params: {} = {}): Observable<T> {
    const url = environment.tournament_api_url + path;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpOptions = {
      headers,
      params,
    };
    return this.http.get<T>(url, httpOptions);
  }

  delete<T>(path: string, params: {} = {}): Observable<T> {
    const url = environment.tournament_api_url + path;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpOptions = {
      headers,
      params,
    };
    return this.http.delete<T>(url, httpOptions);
  }
}
