import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tt-disclaimer-and-action',
  templateUrl: './tt-disclaimer-and-action.component.html',
  styleUrls: ['./tt-disclaimer-and-action.component.css'],
})
export class TtDisclaimerAndActionComponent implements OnInit {
  actionStatement: string; // What action has the user taken.
  actionSubject: string; // On what object has the user taken this action.
  constructor() {
    this.actionStatement = 'You have selected';
    this.actionSubject = 'Adult membership for 1 Month';
  }

  ngOnInit(): void {}
}
