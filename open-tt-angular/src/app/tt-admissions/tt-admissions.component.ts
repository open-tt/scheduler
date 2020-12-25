import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tt-admissions',
  templateUrl: './tt-admissions.component.html',
  styleUrls: ['./tt-admissions.component.css']
})
export class TtAdmissionsComponent implements OnInit {
  admissionsHeaders: string[];
  admissionsData: string[][];

  reservationsHeaders: string[];
  reservationsData: string[][];
  constructor() {
    this.admissionsHeaders = ['Title', 'Duration', 'Price'];
    this.admissionsData = [
      ['Adult', '1 month', '$50'],
      ['Adult', '3 month', '$120'],
      ['Family of 2', '1 month', '$90'],
      ['Family of 3', '1 month', '$120'],
    ];

    this.reservationsHeaders = ['Unit', 'Duration', 'Price'];
    this.reservationsData = [
      ['Robot', '1 hour', '$6'],
      ['Table', '1 hour', '$10'],
    ];
  }

  ngOnInit(): void {
  }
}
