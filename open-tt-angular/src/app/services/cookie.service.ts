import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private authToken: string;

  constructor() {
    this.authToken = null;
  }

  hardReloadAuthTokenCookie(): string {
    this.authToken = this.getCookie(Cookie.USER_AUTH_TOKEN);
    return this.authToken;
  }

  clearAuthToken(): void {
    this.deleteCookie(Cookie.USER_AUTH_TOKEN);
    this.authToken = null;
  }

  getAuthTokenCookie(): string {
    if (
      this.authToken !== null &&
      this.authToken !== '' &&
      this.authToken !== undefined
    ) {
      return this.authToken;
    }
    this.authToken = this.getCookie(Cookie.USER_AUTH_TOKEN);
    return this.authToken;
  }

  setAuthTokenCookie(token: string): void {
    this.setCookie(Cookie.USER_AUTH_TOKEN, token);
  }

  hasLoggedInUser(): boolean {
    if (this.authToken !== null) {
      return true;
    }

    const token = this.getAuthTokenCookie();
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

  removeUserToken(): void {
    this.deleteCookie(Cookie.USER_AUTH_TOKEN);
    this.authToken = '';
  }
}

class Cookie {
  static USER_AUTH_TOKEN = 'user_auth_token';
  static LOGGED_IN = 'logged_in';
}
