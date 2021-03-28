import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tt-configure-new-reservation',
  templateUrl: './tt-configure-new-reservation.component.html',
  styleUrls: ['./tt-configure-new-reservation.component.css'],
})
export class TtConfigureNewReservationComponent implements OnInit {
  membershipDurations: string[];
  constructor() {
    this.membershipDurations = ['1 Month', '2 Months'];
  }

  ngOnInit(): void {}

  onSubmitNewMembership(f: NgForm): void {}
}
