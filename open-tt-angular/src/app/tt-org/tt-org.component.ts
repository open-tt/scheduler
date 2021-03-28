import { Component, OnInit } from '@angular/core';
import { LabeledContent } from '../component-library/tt-labeled-info-group/tt-labeled-info-group.component';
import { ComponentMode } from '../utils/enums';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tt-org',
  templateUrl: './tt-org.component.html',
  styleUrls: ['./tt-org.component.css'],
})
export class TtOrgComponent implements OnInit {
  /* Used to select different views of this component
   * ComponentMode.CREATE: to create a new org. All subcomponents are editable
   * ComponentMode.SHOW: show info. non editable.
   * ComponentMode.SHOW: to Edit the editable subcomponents
   */
  mode = ComponentMode.CREATE;

  contactInfo: LabeledContent[];
  facilityInfo: LabeledContent[];
  scheduleInfo: LabeledContent[];

  contactInfoLabels: string[][];
  facilityInfoLabels: string[][];
  scheduleInfoLabels: string[][];

  constructor(private route: ActivatedRoute) {
    this.contactInfo = [
      new LabeledContent('phone number', '(123) 123-1233'),
      new LabeledContent('email', 'spttc@gmail.com'),
      new LabeledContent('manager', 'Pedro Garzon'),
    ];

    this.facilityInfo = [
      new LabeledContent('USATT Rating', '4 stars'),
      new LabeledContent('Ceiling Height', '25 ft'),
      new LabeledContent('Total Tables', '19'),
    ];

    this.scheduleInfo = [
      new LabeledContent('Monday', '8 am - 10 pm'),
      new LabeledContent('Tuesday', '8 am - 10 pm'),
      new LabeledContent('Wednesday', '8 am - 10 pm'),
      new LabeledContent('Thursday', '8 am - 10 pm'),
      new LabeledContent('Friday', '8 am - 10 pm'),
      new LabeledContent('Saturday', '8 am - 10 pm'),
      new LabeledContent('Sunday', '8 am - 10 pm'),
    ];

    this.contactInfoLabels = [
      ['phone number', 'ex: 7864435152'],
      ['email', 'ex: cdoub@gmail.com'],
      ['manager', 'ex: Carlos Doub'],
    ];
    this.facilityInfoLabels = [
      ['USATT Rating', 'ех: 4 stars'],
      ['Ceiling Height', 'ex: 22 ft'],
      ['Total Tables', 'ex: 6'],
    ];
    this.scheduleInfoLabels = [
      ['Monday', 'ex: 8am - 10pm'],
      ['Tuesday', 'ex: 8am - 10pm'],
      ['Wednesday', 'ex: 8am - 10pm'],
      ['Thursday', 'ex: 8am - 10pm'],
      ['Friday', 'ex: 8am - 10pm'],
      ['Saturday', 'ex: 8am - 10pm'],
      ['Sunday', 'ex: 8am - 10pm'],
    ];
  }

  ngOnInit(): void {}

  isModeShow(): boolean {
    return this.mode === ComponentMode.SHOW;
  }

  isModeCreate(): boolean {
    return this.mode === ComponentMode.CREATE;
  }

  swapMode(): void {
    if (this.mode === ComponentMode.SHOW) {
      this.mode = ComponentMode.CREATE;
    } else {
      this.mode = ComponentMode.SHOW;
    }
  }
}
