import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  getAuthTokenCoockie(): string {
    return this.getCookie(Cookie.USER_AUTH_TOKEN);
  }

  setAuthTokenCoockie(token: string): void {
    this.setCookie(Cookie.USER_AUTH_TOKEN, token);
  }

  hasLoggedInUser(): boolean {
    const token = this.getCookie(Cookie.USER_AUTH_TOKEN);
    return !!token && token !== '';
  }

  setCookie(name: string, val: string): void {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Set it
    document.cookie =
      name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
  }

  getCookie(name: string): string {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  deleteCookie(name: string): void {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
  }
}

class Cookie {
  static USER_AUTH_TOKEN = 'user_auth_token';
  static LOGGED_IN = 'logged_in';
}
