import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tt-info-card',
  templateUrl: './tt-info-card.component.html',
  styleUrls: ['./tt-info-card.component.css']
})
export class TtInfoCardComponent implements OnInit {
  line1: string;
  line2: string;
  line3: string;
  constructor() {
    this.line1 = 'adult';
    this.line2 = '1 month';
    this.line3 = '$50';
  }

  ngOnInit(): void {
  }

}
