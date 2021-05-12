import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationType, RSVP } from '../models/reservation';
import { PlayerService } from '../services/player.service';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';
import { Player } from '../models/player';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tt-reservations',
  templateUrl: './tt-reservations.component.html',
  styleUrls: ['./tt-reservations.component.css'],
})
export class TtReservationsComponent implements OnInit {
  reservations: Reservation[];

  displayedColumns = ['host', 'recipient', 'date', 'start', 'end', 'note'];
  reservationsSubscription: Subscription;
  loggedInUserSubscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private userService: UserService,
    private reservationService: ReservationService
  ) {
    this.reservations = [];
  }

  ngOnInit(): void {
    this.reservations = [];
    this.reservationsSubscription = this.reservationService
      .genReservations()
      .subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
        console.log('Updated res');
        console.log(this.reservations);
      });

    this.loggedInUserSubscription = this.userService
      .genLoggedInUser()
      .subscribe((user) => {
        console.log('User changed');
        this.reservationService.loadReservationsForUser(user.id);
      });

    if (this.userService.loggedInUser) {
      console.log('User exists');
      this.reservationService.loadReservationsForUser(
        this.userService.loggedInUser.id
      );
    }
  }

  // host(r: Reservation): string {
  //   return this.playerService.playerName(r.host);
  // }
  //
  // recipient(r: Reservation): string {
  //   return this.playerService.playerName(r.recipient);
  // }

  recipientRsvp(r: Reservation): string {
    return RSVP[r.recipient_rsvp];
  }

  hasReservations(): boolean {
    return this.reservations && this.reservations.length > 0;
  }
}
