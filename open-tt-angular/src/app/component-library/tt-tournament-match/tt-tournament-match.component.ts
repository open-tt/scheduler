import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tt-tournament-match',
  templateUrl: './tt-tournament-match.component.html',
  styleUrls: ['./tt-tournament-match.component.scss']
})
export class TtTournamentMatchComponent implements OnInit {

  @Input() match: NgttMatch;
  constructor() { }

  ngOnInit(): void {

  }

  hasPlayers(): boolean {
    return this.validPlayer1() || this.validPlayer2();
  }

  /**
   * Has only one player
   */
  isIncomplete(): boolean {
    const a = this.hasPlayers() &&
      !this.validPlayer1() || !this.validPlayer2();
    return a;
  }

  validPlayer1(): boolean {
    return !!this.match.player1 && this.match.player1 !== '';
  }

  validPlayer2(): boolean {
    return !!this.match.player2 && this.match.player2 !== '';
  }

}

export interface NgttMatch {
  player1: string;
  player2: string;
}
