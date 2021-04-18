import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserApi } from '../utils/user_api';
import { map, switchMap } from 'rxjs/operators';
import { ReservationService } from './reservation.service';
import { CookieService } from './cookie.service';
import { Tournament } from '../models/tournament';

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
    private coockieService: CookieService
  ) {
    this.loggedInUserSubject = new Subject<Player>();
  }

  genLoggedInUser(): Observable<Player> {
    return this.loggedInUserSubject.asObservable();
  }

  hasLoggedInUser(): boolean {
    return !!this.userApiToken && this.userApiToken !== '';
  }

  login(userID: string, pin: number): Observable<boolean> {
    const data = {
      email: userID,
      password: pin,
    };
    const loggin$ = this.http.post<UserApi.AuthResponse>('/authenticate', data);
    return loggin$.pipe(
      switchMap((authResponse) => {
        this.userApiToken = authResponse.auth_token;
        this.coockieService.setAuthTokenCookie(this.userApiToken);
        return this.loadUser();
      })
    );
  }

  logout(): void {
    this.userApiToken = '';
    this.coockieService.setAuthTokenCookie(this.userApiToken);
    this.loggedInUser = undefined;
    // TODO: Should I reload or re-route?
  }

  signup(name: string, userID: string, pin: number): Observable<boolean> {
    const data = {
      name,
      email: userID,
      password: pin.toString(),
      password_confirmation: pin.toString(),
      is_enabled: true,
    };
    const signup$ = this.http.post<UserApi.CreateUserResponse>('/users', data);
    return signup$.pipe(
      switchMap((createUserResponse) => {
        this.userApiToken = createUserResponse.token;
        this.coockieService.setAuthTokenCookie(this.userApiToken);
        return this.loadUser();
      })
    );
  }

  public loadUser(): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userApiToken}`)
      .set('Content-Type', 'application/json');
    const httpOptions = {
      headers,
    };

    return this.http
      .get<UserApi.GetCurrentUserResponse>('/current_user', httpOptions)
      .pipe(
        map((resp) => {
          this.loggedInUser = resp.user;
          this.loggedInUserSubject.next(this.loggedInUser);

          // const forkJoinRequests = [];
          // const forkJoinResponse = {
          //   requestreservations$: undefined,
          // };
          // let indexCounter = 0;
          // if (environment.enable_reservations_service){
          //   const requestreservations$ =
          //     this.reservationService.loadReservationsForUser(
          //       this.userApiToken,
          //       this.loggedInUser.id
          //     );
          //   forkJoinRequests.push(requestreservations$);
          //   forkJoinResponse.requestreservations$ = indexCounter;
          //   indexCounter += 1;
          // }
          // const requestmemberships$ = TODO implement this request
          // if (forkJoinRequests.length > 0){
          //   forkJoin(forkJoinRequests).subscribe(
          //     results => {
          //
          //       // @ts-ignore TODO: Need to test this
          //       this.loggedInUser.reservations = results[forkJoinResponse.requestreservations$];
          //     },
          //     error => {
          //       this.loggedInUser.reservations = [];
          //     });
          // }
          return true;
        })
      );
  }

  // TODO: This is not working yet
  updatePlayer(p: Player): void {
    this.http
      .put<Player>(`/players/${this.loggedInUser.id}`, p)
      .subscribe((updatedPlayer) => {
        this.loggedInUser = updatedPlayer;
        this.loggedInUserSubject.next(updatedPlayer);
      });
  }
}
