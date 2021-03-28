import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tt-configure-new-membership',
  templateUrl: './tt-configure-new-membership.component.html',
  styleUrls: ['./tt-configure-new-membership.component.css'],
})
export class TtConfigureNewMembershipComponent implements OnInit {
  membershipDurations: string[];
  constructor() {
    this.membershipDurations = ['1 Month', '2 Months'];
  }

  ngOnInit(): void {}

  onSubmitNewMembership(f: NgForm): void {}
}
