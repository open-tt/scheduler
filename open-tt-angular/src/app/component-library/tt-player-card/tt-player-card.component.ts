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

  subtitle(): string {
    if (this.player?.tt_profile?.homeclub) {
      return this.player?.tt_profile?.homeclub;
    }
    return '-';
  }

  image(): string {
    if (this.player?.profile_img) {
      return this.player?.profile_img;
    }
    return 'https://www.kindpng.com/picc/m/429-4291136_table-tennis-png-download-ping-pong-icon-png.png';
  }
}
