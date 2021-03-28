import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tt-simple-button',
  templateUrl: './tt-simple-button.component.html',
  styleUrls: ['./tt-simple-button.component.css'],
})
export class TtSimpleButtonComponent implements OnInit {
  @Input() title: string;
  @Output() action = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.action.emit([]);
  }
}
