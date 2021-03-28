import { Component, OnInit } from '@angular/core';
import { LabeledContent } from '../component-library/tt-labeled-info-group/tt-labeled-info-group.component';

@Component({
  selector: 'app-tt-active-memberships',
  templateUrl: './tt-active-memberships.component.html',
  styleUrls: ['./tt-active-memberships.component.css'],
})
export class TtActiveMembershipsComponent implements OnInit {
  membershipSummary: LabeledContent[];
  membershipsHeaders: string[];
  membershipsData: string[][];
  constructor() {
    this.membershipSummary = [
      new LabeledContent('total', '120'),
      new LabeledContent('active', '98'),
      new LabeledContent('expiring soon', '14'),
    ];

    this.membershipsHeaders = ['Name', 'Expiration'];
    this.membershipsData = [
      ['Jon Doe', '01-10-2021'],
      ['Juan Vargas', '01-20-2021'],
      ['Xing Lin', '04-01-2021'],
      ['Yany Tang', '08-20-2022'],
    ];
  }

  ngOnInit(): void {}
}
