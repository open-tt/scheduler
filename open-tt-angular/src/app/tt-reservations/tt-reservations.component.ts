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
  sentInvitations: Reservation[] = [];
  receivedInvitations: Reservation[] = [];
  recipientRsvp = '...';
  RSVP_YES = RSVP.YES;
  RSVP_NO = RSVP.NO;
  RSVP_MAYBE = RSVP.MAYBE;

  displayedColumns = ['host', 'recipient', 'date', 'start', 'end', 'note'];
  invitationSubscription: Subscription;
  loggedInUserSubscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private userService: UserService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.invitationSubscription = this.reservationService
      .genReservations()
      .subscribe((reservations: Reservation[]) => {
        const sent: Reservation[] = [];
        const received: Reservation[] = [];
        reservations.forEach((r) => {
          if (r.host === this.userService.loggedInUser.name) {
            sent.push(r);
          } else {
            received.push(r);
          }
        });
        this.receivedInvitations = received;
        this.sentInvitations = sent;
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

  rsvpName(i: number): string {
    return RSVP[i];
  }

  hasReservations(): boolean {
    return this.sentInvitations && this.sentInvitations.length > 0;
  }

  onRsvpChange(r: Reservation, $event: MatSelectChange): void {
    r.recipient_rsvp = $event.source.value;
    this.reservationService.updateReservation(r);
  }
}
