import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tt-user-membership',
  templateUrl: './tt-user-membership.component.html',
  styleUrls: ['./tt-user-membership.component.css']
})
export class TtUserMembershipComponent implements OnInit {

  actionStatement: string; // What has the user done.
  constructor() {
    this.actionStatement = 'You have selected';
  }

  ngOnInit(): void {
  }

}
