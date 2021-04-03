import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../../models/tournament';
import { MatDialog } from '@angular/material/dialog';
import { TtMatchResultDialogComponent } from '../tt-match-result-dialog/tt-match-result-dialog.component';
import { environment } from '../../../environments/environment';
import { GroupService } from '../../services/group.service';
import { TournamentService } from '../../services/tournament.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tt-match-result-cell',
  templateUrl: './tt-match-result-cell.component.html',
  styleUrls: ['./tt-match-result-cell.component.css'],
})
export class TtMatchResultCellComponent implements OnInit {
  @Input() match: Match;
  // @Input() group: TournamentGroup;
  // @Input() player1: number;
  // @Input() player2: number;
  @Input() selfMatch = false;
  @Input() winningScore = environment.default_winning_score;

  // Disables individual set scores
  simpleView = false;

  constructor(
    public dialog: MatDialog,
    public tournamentService: TournamentService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    if (!this.match) {
      return;
    }
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
