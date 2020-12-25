import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tt-labeled-info-group',
  templateUrl: './tt-labeled-info-group.component.html',
  styleUrls: ['./tt-labeled-info-group.component.scss']
})
export class TtLabeledInfoGroupComponent implements OnInit {
  @Input() title: string;
  @Input() pairs: LabeledContent[];
  constructor() {}

  ngOnInit(): void {
  }

}

export class LabeledContent {
  label: string;
  content: string;
  constructor(label, content) {
    this.label = label;
    this.content = content;
  }
}
