import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tt-actions-table',
  templateUrl: './tt-actions-table.component.html',
  styleUrls: ['./tt-actions-table.component.css'],
})
export class TtActionsTableComponent implements OnInit {
  @Input() headers: string[];
  @Input() data: string[][];
  constructor() {}

  ngOnInit(): void {}
}
