import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationType, RSVP } from '../models/reservation';
import { PlayerService } from '../services/player.service';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';
import { Player } from '../models/player';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-tt-reservations',
  templateUrl: './tt-reservations.component.html',
  styleUrls: ['./tt-reservations.component.scss'],
})
export class TtReservationsComponent implements OnInit {
  reservations: Reservation[];
  recipientRsvp = '...';
  RSVP_YES = RSVP.YES;
  RSVP_NO = RSVP.NO;
  RSVP_MAYBE = RSVP.MAYBE;

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
      });

    this.loggedInUserSubscription = this.userService
      .genLoggedInUser()
      .subscribe((user) => {
        this.reservationService.loadReservationsForUser(user.id);
      });

    if (this.userService.loggedInUser) {
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

  rsvpName(i: number): string {
    return RSVP[i];
  }

  hasReservations(): boolean {
    return this.reservations && this.reservations.length > 0;
  }

  onRsvpChange(r: Reservation, $event: MatSelectChange): void {
    r.recipient_rsvp = $event.source.value;
    this.reservationService.updateReservation(r);
  }
}
