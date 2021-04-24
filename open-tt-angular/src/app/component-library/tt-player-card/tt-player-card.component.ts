import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'app-tt-player-card',
  templateUrl: './tt-player-card.component.html',
  styleUrls: ['./tt-player-card.component.css'],
})
export class TtPlayerCardComponent implements OnInit {
  @Input() player: Player = {
    id: 1,
    name: 'Eriel Marimon',
  };

  constructor() {}

  ngOnInit(): void {}
}
