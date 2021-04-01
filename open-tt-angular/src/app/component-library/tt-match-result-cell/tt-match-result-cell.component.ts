import { Component, Input, OnInit } from '@angular/core';
import { Match, TournamentGroup } from '../../models/tournament';
import { Player } from '../../models/player';
import { MatDialog } from '@angular/material/dialog';
import { TournamentService } from '../../services/tournament.service';
import { TtMatchResultDialogComponent } from '../tt-match-result-dialog/tt-match-result-dialog.component';
import { environment } from '../../../environments/environment';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-tt-match-result-cell',
  templateUrl: './tt-match-result-cell.component.html',
  styleUrls: ['./tt-match-result-cell.component.css'],
})
export class TtMatchResultCellComponent implements OnInit {
  @Input() group: TournamentGroup;
  @Input() player1: number;
  @Input() player2: number;
  @Input() winningScore = environment.default_winning_score;

  // Disables individual set scores
  @Input() simple = true;

  score: number[] = [0, 0];

  constructor(
    public dialog: MatDialog,
    public tournamentService: TournamentService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.score = this.groupService.matchScore(
      this.group,
      this.player1,
      this.player2
    );
  }

  openDialog(): void {
    const match = this.groupService.matchFor(
      this.group,
      this.player1,
      this.player2
    );
    if (match === undefined) {
      return;
    }
    const dialogRef = this.dialog.open(TtMatchResultDialogComponent, {
      width: '90%',
      data: match,
    });

    dialogRef.afterClosed().subscribe((result: Match) => {
      if (!result) {
        return;
      }
      // const match2 = this.groupService.matchFor(
      //   this.group,
      //   this.player2,
      //   this.player1
      // );
      // match2.setScore = [...match.setScore].reverse();
      this.tournamentService.updateMatchResult(this.group);
    });
  }
}
