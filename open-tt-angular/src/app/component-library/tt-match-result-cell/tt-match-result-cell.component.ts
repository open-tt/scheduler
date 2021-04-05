import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../../models/tournament';
import { MatDialog } from '@angular/material/dialog';
import { TtMatchResultDialogComponent } from '../tt-match-result-dialog/tt-match-result-dialog.component';
import { environment } from '../../../environments/environment';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-tt-match-result-cell',
  templateUrl: './tt-match-result-cell.component.html',
  styleUrls: ['./tt-match-result-cell.component.scss'],
})
export class TtMatchResultCellComponent implements OnInit {
  @Input() match: Match;
  @Input() selfMatch = false;
  @Input() winningScore = environment.default_winning_score;
  @Input() editable = true;

  // Disables individual set scores
  simpleView = false;

  constructor(
    public dialog: MatDialog,
    public tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    if (!this.match) {
      return;
    }
  }

  matchStyle(): string {
    // debugger;
    if (!this.match) {
      return '';
    }

    if (this.match.is_over && this.match.player1_won) {
      return this.match.inverted ? 'looserColorText' : 'winnerColorText';
    } else if (this.match.is_over) {
      return this.match.inverted ? 'winnerColorText' : 'looserColorText';
    }
    return '';
  }

  openDialog(): void {
    if (!this.match || !this.editable) {
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
