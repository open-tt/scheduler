import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationApi } from '../utils/reservation_api';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/reservation';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: Reservation[] = [];

  constructor(
    private http: HttpClient,
    private flashMessagesService: FlashMessagesService
  ) {}

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

  playerInvitation(reservation: Reservation): void {
    this.reservations.push(reservation);
    this.flashMessagesService.show('Reservation created successfully.', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
    // this.http.post<Reservation>('/reservations', reservation).subscribe(
    //   () => {
    //     this.flashMessagesService.show('Reservation created successfully.');
    //   },
    //   (error) => {
    //     this.flashMessagesService.show('Fail to create reservation: ' + error);
    //   }
    // );
  }
}
