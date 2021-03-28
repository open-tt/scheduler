import { Component, Input, OnInit } from '@angular/core';
import { LabeledContent } from '../tt-labeled-info-group/tt-labeled-info-group.component';

@Component({
  selector: 'app-tt-labeled-edit-group',
  templateUrl: './tt-labeled-edit-group.component.html',
  styleUrls: ['./tt-labeled-edit-group.component.css'],
})
export class TtLabeledEditGroupComponent implements OnInit {
  @Input() title: string;
  @Input() labels: string[][]; // labels for the edit texts
  constructor() {}

  ngOnInit(): void {}
}
