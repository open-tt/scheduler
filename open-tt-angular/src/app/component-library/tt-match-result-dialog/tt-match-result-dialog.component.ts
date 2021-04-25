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
  scoreboard: {
    name: string;
    set1: number;
    set2: number;
    set3: number;
    set4: number;
    set5: number;
  }[];

  foods: { value: string; viewValue: string }[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  scoreboardColumns = ['player', 'set1', 'set2', 'set3', 'set4', 'set5'];

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
    this.buildScoreboard();
  }

  buildScoreboard(): void {
    this.scoreboard = [
      {
        name: this.playerService.playerName(this.match.player1_id),
        set1:
          this.match.match_sets && this.match.match_sets.length > 0
            ? this.match.match_sets[0].player1_score
            : null,
        set2:
          this.match.match_sets && this.match.match_sets.length > 1
            ? this.match.match_sets[1].player1_score
            : null,
        set3:
          this.match.match_sets && this.match.match_sets.length > 2
            ? this.match.match_sets[2].player1_score
            : null,
        set4:
          this.match.match_sets && this.match.match_sets.length > 3
            ? this.match.match_sets[3].player1_score
            : null,
        set5:
          // this.match.match_sets[4].player1Score,
          this.match.match_sets && this.match.match_sets.length > 4
            ? this.match.match_sets[4].player1_score
            : null,
      },
      {
        name: this.playerService.playerName(this.match.player2_id),
        set1:
          this.match.match_sets && this.match.match_sets.length > 0
            ? this.match.match_sets[0].player2_score
            : null,
        set2:
          this.match.match_sets && this.match.match_sets.length > 1
            ? this.match.match_sets[1].player2_score
            : null,
        set3:
          this.match.match_sets && this.match.match_sets.length > 2
            ? this.match.match_sets[2].player2_score
            : null,
        set4:
          this.match.match_sets && this.match.match_sets.length > 3
            ? this.match.match_sets[3].player2_score
            : null,
        set5:
          this.match.match_sets && this.match.match_sets.length > 4
            ? this.match.match_sets[4].player2_score
            : null,
      },
    ];
  }

  playerName(id: number): string {
    return this.playerService.playerName(id);
  }

  sendResult(): void {
    this.scoreboardColumns.slice(1).forEach((col, index) => {
      if (this.match.match_sets.length === index) {
        this.match.match_sets.push({
          id: null,
          player1_score: 0,
          player2_score: 0,
        });
      }
      this.match.match_sets[index].player1_score = this.scoreboard[0][col];
      this.match.match_sets[index].player2_score = this.scoreboard[1][col];
    });

    for (let i = 0; i < this.match.match_sets.length; i++) {
      this.match.match_sets[i].player1_score = this.scoreboard[0][
        'set' + (i + 1)
      ];
      this.match.match_sets[i].player2_score = this.scoreboard[1][
        'set' + (i + 1)
      ];
    }
    this.dialogRef.close(this.match);
  }
}
