import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tt-labeled-edit',
  templateUrl: './tt-labeled-edit.component.html',
  styleUrls: ['./tt-labeled-edit.component.css'],
})
export class TtLabeledEditComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  constructor() {}

  ngOnInit(): void {}
}
