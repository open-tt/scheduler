import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationApi } from '../utils/reservation_api';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  loadReservationsForUser(
    apiToken: string,
    userId: number
  ): Observable<Reservation[]> {
    const url = ReservationApi.Paths.getManyReservations();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${apiToken}`)
      .set('Content-Type', 'application/json');
    const httpOptions = {
      headers,
      params: {
        user_id: userId.toString(),
      },
    };
    return this.http
      .get<ReservationApi.ReservationResponse>(url, httpOptions)
      .pipe(
        map((reservationResponse) => {
          return reservationResponse.reservations;
        })
      );
  }
}
