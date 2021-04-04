import { Component, Input, OnInit } from '@angular/core';
import { GroupPlayerSummary } from '../../models/tournament';

@Component({
  selector: 'app-tt-group-player',
  templateUrl: './tt-group-player.component.html',
  styleUrls: ['./tt-group-player.component.css'],
})
export class TtGroupPlayerComponent implements OnInit {
  @Input() name: string;
  @Input() summary: GroupPlayerSummary;

  constructor() {}

  ngOnInit(): void {}
}
