import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tt-labeled-info',
  templateUrl: './tt-labeled-info.component.html',
  styleUrls: ['./tt-labeled-info.component.scss']
})
export class TtLabeledInfoComponent implements OnInit {
  @Input() label: string;
  @Input() content: string;
  constructor() { }

  ngOnInit(): void {
  }

}
