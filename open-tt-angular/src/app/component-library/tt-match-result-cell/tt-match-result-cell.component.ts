import {Component, Input, OnInit} from '@angular/core';
import {Match, TournamentGroup} from '../../models/tournament';
import {Player} from '../../models/player';
import {MatDialog} from '@angular/material/dialog';
import {TournamentService} from '../../services/tournament.service';
import {TtMatchResultDialogComponent} from '../tt-match-result-dialog/tt-match-result-dialog.component';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tt-match-result-cell',
  templateUrl: './tt-match-result-cell.component.html',
  styleUrls: ['./tt-match-result-cell.component.css']
})
export class TtMatchResultCellComponent implements OnInit {
  @Input() group: TournamentGroup;
  @Input() player1: Player;
  @Input() player2: Player;
  @Input() winningScore = environment.default_winning_score;

  // Disables individual set scores
  @Input() simple = true;

  score: number[];
  groupSubscription: Subscription; // Listen to changes in service

  constructor(
    public dialog: MatDialog,
    public tournamentService: TournamentService,
  ) {
  }

  ngOnInit(): void {
    this.score = this.group.matchScore(this.player1, this.player2);
    this.groupSubscription =
      this.tournamentService.getGroup().subscribe(
        (group: TournamentGroup) => {
          if (group.equals(this.group)) {
            this.group = group;
            const match = this.group.matchFor(this.player1, this.player2);
            if (!!match) {
              this.score = match.setScore;
            }
          }
        }
      );
  }

  openDialog(): void {
    const match = this.group.matchFor(this.player1, this.player2);
    const dialogRef = this.dialog.open(TtMatchResultDialogComponent, {
      width: '90%',
      data: match
    });

    dialogRef.afterClosed().subscribe((result: Match) => {
      if (!result) {
        return;
      }
      const match2 = this.group.matchFor(this.player2, this.player1);
      match2.setScore = [...match.setScore].reverse();
      this.tournamentService.updateMatchResult(this.group);
    });
  }
}
