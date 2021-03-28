import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../models/player';
import { delay, map } from 'rxjs/operators';
import { FakeUserData } from './fake.data';
import { HandicapTournament } from '../models/tournament';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ReservationApi } from '../utils/reservation_api';
import { CookieService } from './cookie.service';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  PLAYERS_API = '/players';

  constructor(private http2: HttpClient, private http: BaseApiService) {}

  createNewPlayer(name: string, rating: number): Observable<Player> {
    const body = {
      name,
      rating,
    };
    return this.http.post<Player>('/players', body);
  }
}
