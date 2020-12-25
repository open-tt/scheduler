import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TournamentGroup} from '../../models/tournament';
import {Player} from '../../models/player';
import {Subscription} from 'rxjs';
import {TournamentService} from '../../services/tournament.service';

@Component({
  selector: 'app-tt-tournament-group',
  templateUrl: './tt-tournament-group.component.html',
  styleUrls: ['./tt-tournament-group.component.scss']
})
export class TtTournamentGroupComponent implements OnInit {
  static DEFAULT_COLUMNS: string[] = ['alias', 'name'];

  @Input() title: string;
  @Input() group: TournamentGroup;

  dataSource: MatTableDataSource<Player>;
  displayedColumns = [];

  groupSubscription: Subscription; // Listen to changes in service

  constructor(
    private tournamentService: TournamentService,
  ) {
  }

  ngOnInit(): void {
    if (!this.group) {
      throw new Error('group is required for tt-tournament-group');
    }

    this.dataSource = new MatTableDataSource<Player>(this.group.players);

    this.groupSubscription =
      this.tournamentService.getGroup().subscribe(
        (group: TournamentGroup) => {
          if (group.equals(this.group)) {
            this.group = group;
            this.dataSource = new MatTableDataSource<Player>(this.group.players);
            this.displayedColumns = this.generateDisplayColumns();
          }
        }
      );
    this.displayedColumns = this.generateDisplayColumns();
  }

  generateDisplayColumns(): string[] {
    const columns: string[] = [...TtTournamentGroupComponent.DEFAULT_COLUMNS];
    for (let i = 0; i < this.group.players.length; i++) {
      columns.push(this.indexToLetter(i));
    }
    return columns;
  }

  indexToLetter(i: number): string {
    return String.fromCharCode(i + 65);
  }

  getResult(name1: string, name2: string): string {
    if (name1 === name2) {
      return '-';
    }

    return '3 - 2';

    const match = this.group.matches.find(
      res => (
        res.player1.name === name1 &&
        res.player2.name === name2
      ));
    if (match) {
      return match.getSetResultSummary();
    }
    return '';
  }
}
