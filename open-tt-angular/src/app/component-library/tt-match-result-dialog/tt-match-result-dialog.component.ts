import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Player} from '../../models/player';
import {Match} from '../../models/tournament';

@Component({
  selector: 'app-tt-match-result-dialog',
  templateUrl: './tt-match-result-dialog.component.html',
  styleUrls: ['./tt-match-result-dialog.component.scss']
})
export class TtMatchResultDialogComponent {
  displayedColumns = ['player', 'sets'];
  sets: {
    player: Player,
    score: number
  }[];

  constructor(
    public dialogRef: MatDialogRef<TtMatchResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public match: Match,
  ) {
    this.sets = [
      {
        player: match.player1,
        score: match.setScore[0]
      }, {
        player: match.player2,
        score: match.setScore[1]
      }
    ];
  }

  sendResult(): void {
    this.match.setScore = [+this.sets[0].score, +this.sets[1].score];
    this.dialogRef.close(this.match);
  }
}
