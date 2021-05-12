import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Reservation } from '../models/reservation';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: Reservation[] = [];
  reservationsSubject: Subject<Reservation[]>;

  constructor(
    private http: HttpClient,
    private flashMessagesService: FlashMessagesService
  ) {
    this.reservationsSubject = new Subject<Reservation[]>();
  }

  genReservations(): Observable<Reservation[]> {
    return this.reservationsSubject.asObservable();
  }

  loadReservationsForUser(userId: number): void {
    const httpOptions = {
      params: {
        host: userId.toString(),
      },
    };
    this.http
      .get<Reservation[]>('/reservations', httpOptions)
      .subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
        this.reservationsSubject.next(reservations);
      });
  }

  playerInvitation(data: any): void {
    // this.reservations.push(reservation);
    // this.flashMessagesService.show('Reservation created successfully.', {
    //   cssClass: 'alert-success',
    //   timeout: 4000,
    // });
    console.log(data);
    this.http.post<Reservation>('/reservations', data).subscribe(
      (r: Reservation) => {
        this.flashMessagesService.show('Reservation created successfully.');
      },
      (error) => {
        this.flashMessagesService.show('Fail to create reservation: ' + error);
      }
    );
  }
}
