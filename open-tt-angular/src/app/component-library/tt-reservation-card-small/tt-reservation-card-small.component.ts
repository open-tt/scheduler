import { Component, Input, OnInit } from '@angular/core';
import { Reservation, RSVP } from '../../models/reservation';
import { MatRadioChange } from '@angular/material/radio';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-tt-reservation-card-small',
  templateUrl: './tt-reservation-card-small.component.html',
  styleUrls: ['./tt-reservation-card-small.component.scss'],
})
export class TtReservationCardSmallComponent implements OnInit {
  @Input() reservation: Reservation;
  @Input() hostMode = false;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {}

  rsvpOptions(): string[] {
    return Object.values(RSVP);
  }

  recipientFirstName(): string {
    let name;
    if (this.hostMode) {
      name = this.reservation.recipient;
    } else {
      name = this.reservation.host;
    }
    return name.split(' ')[0];
  }

  recipientRating(): string {
    if (this.hostMode) {
      return this.reservation.recipient_rating.toString();
    } else {
      return this.reservation.host_rating.toString();
    }
  }

  recipientProfileImage(): string {
    if (this.hostMode) {
      return this.reservation.recipient_profile_image;
    } else {
      return this.reservation.host_profile_image;
    }
  }

  updateRsvp($event: MatRadioChange): void {
    this.reservation.recipient_rsvp = $event.value;
    this.reservationService.updateReservation(this.reservation);
  }
}
