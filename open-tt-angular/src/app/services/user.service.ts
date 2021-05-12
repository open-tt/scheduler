import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserApi } from '../utils/user_api';
import { map, switchMap } from 'rxjs/operators';
import { ReservationService } from './reservation.service';
import { CookieService } from './cookie.service';
import { Tournament } from '../models/tournament';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInUser: Player;
  userApiToken: string;
  loggedInUserSubject: Subject<Player>;

  constructor(
    private http: HttpClient,
    private reservationService: ReservationService,
    private coockieService: CookieService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {
    this.loggedInUserSubject = new Subject<Player>();
  }

  genLoggedInUser(): Observable<Player> {
    return this.loggedInUserSubject.asObservable();
  }

  hasLoggedInUser(): boolean {
    return !!this.userApiToken && this.userApiToken !== '';
  }

  login(userID: string, pin: number): void {
    const data = {
      email: userID,
      password: pin,
    };
    this.http
      .post<UserApi.AuthResponse>('/authenticate', data)
      .subscribe((a) => {
        this.userApiToken = a.auth_token;
        this.coockieService.setAuthTokenCookie(this.userApiToken);
        this.loadUser();
        this.router.navigate(['/home']);
      });
  }

  logout(): void {
    this.userApiToken = '';
    this.coockieService.setAuthTokenCookie(this.userApiToken);
    this.loggedInUser = undefined;
    // TODO: Should I reload or re-route?
  }

  signup(name: string, userID: string, pin: number): void {
    const data = {
      name,
      email: userID,
      password: pin.toString(),
      password_confirmation: pin.toString(),
      is_enabled: true,
    };

    this.http
      .post<UserApi.CreateUserResponse>('/users', data)
      .subscribe((user) => {
        this.userApiToken = user.token;
        this.coockieService.setAuthTokenCookie(this.userApiToken);
        this.loadUser();
      });
  }

  public loadUser(): void {
    console.log('Loading User...');
    this.http.get<UserApi.GetCurrentUserResponse>('/current_user').subscribe(
      (resp) => {
        this.loggedInUser = resp.user;
        this.loggedInUserSubject.next(this.loggedInUser);
        console.log('User Loaded---');
      },
      (e) => {
        console.error(e);
      }
    );
  }

  // TODO: This is not working yet
  updatePlayer(p: Player): void {
    this.http
      .put<Player>(`/users/${this.loggedInUser.id}/tt_profile`, p)
      .subscribe((updatedPlayer) => {
        this.loggedInUser = updatedPlayer;
        this.loggedInUserSubject.next(updatedPlayer);
        this.flashMessageService.show('Updated Profile Info', {
          cssClass: 'alert-success',
          timeout: 4000,
        });
      });
  }

  changePassword(
    password: string,
    newPassword: string,
    passwordConfirmation: string
  ): void {
    const payload = {
      password,
      newPassword,
      passwordConfirmation,
    };

    this.http
      .patch(`/users/${this.loggedInUser.id}/password`, payload)
      .subscribe(
        (r) => {
          this.flashMessageService.show('Updated Password', {
            cssClass: 'alert-success',
            timeout: 4000,
          });
        },
        (response) => {
          this.flashMessageService.show(
            'Failed password change: ' + response.error.errors,
            {
              cssClass: 'alert-danger',
              timeout: 4000,
            }
          );
        }
      );
  }
}
