import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../../models/tournament';
import { PlayerService } from '../../services/player.service';
import { TtMatchResultDialogComponent } from '../tt-match-result-dialog/tt-match-result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-tt-tournament-match',
  templateUrl: './tt-tournament-match.component.html',
  styleUrls: ['./tt-tournament-match.component.scss'],
})
export class TtTournamentMatchComponent implements OnInit {
  @Input() match: Match;
  constructor(
    public dialog: MatDialog,
    public playerService: PlayerService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {}

  hasPlayers(): boolean {
    return this.validPlayer1() || this.validPlayer2();
  }

  /**
   * Has only one player
   */
  isIncomplete(): boolean {
    return (this.hasPlayers() && !this.validPlayer1()) || !this.validPlayer2();
  }

  validPlayer1(): boolean {
    return this.match.player1_id > 0 && this.match.player2_id > 0;
  }

  validPlayer2(): boolean {
    return this.match.player2_id > 0 && this.match.player2_id > 0;
  }

  openDialog(): void {
    if (!this.match) {
      return;
    }

    const dialogRef = this.dialog.open(TtMatchResultDialogComponent, {
      width: '90%',
      data: this.match,
    });

    dialogRef.afterClosed().subscribe((updatedMatch: Match) => {
      if (!updatedMatch) {
        return;
      }
      this.tournamentService.updateSingleMatch(updatedMatch);
    });
  }
}
