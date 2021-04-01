import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Match } from '../../models/tournament';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-tt-match-result-dialog',
  templateUrl: './tt-match-result-dialog.component.html',
  styleUrls: ['./tt-match-result-dialog.component.scss'],
})
export class TtMatchResultDialogComponent {
  displayedColumns = ['player', 'sets'];
  sets: {
    player: number;
    score: number;
  }[];

  constructor(
    public dialogRef: MatDialogRef<TtMatchResultDialogComponent>,
    private playerService: PlayerService,
    @Inject(MAT_DIALOG_DATA) public match: Match
  ) {
    this.sets = [
      {
        player: match.player1_id,
        score: match.player1_count_sets_won,
      },
      {
        player: match.player2_id,
        score: match.player2_count_sets_won,
      },
    ];
  }

  playerName(id: number): string {
    return this.playerService.playerName(id);
  }

  sendResult(): void {
    this.dialogRef.close(this.match);
  }
}
