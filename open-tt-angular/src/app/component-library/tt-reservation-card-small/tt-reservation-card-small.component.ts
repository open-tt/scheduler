import { Component, Input, OnInit } from '@angular/core';
import { Reservation, RSVP } from '../../models/reservation';

@Component({
  selector: 'app-tt-reservation-card-small',
  templateUrl: './tt-reservation-card-small.component.html',
  styleUrls: ['./tt-reservation-card-small.component.scss'],
})
export class TtReservationCardSmallComponent implements OnInit {
  @Input() reservation: Reservation;
  @Input() locked = false;

  constructor() {}

  ngOnInit(): void {}

  rsvpOptions(): string[] {
    return Object.values(RSVP);
  }

  recipientFirstName(recipient: string): string {
    return recipient.split(' ')[0];
  }
}
