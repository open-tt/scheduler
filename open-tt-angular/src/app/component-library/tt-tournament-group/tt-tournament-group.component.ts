import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Match, TournamentGroup } from '../../models/tournament';
import { Player } from '../../models/player';
import { Subscription } from 'rxjs';
import { TournamentService } from '../../services/tournament.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-tt-tournament-group',
  templateUrl: './tt-tournament-group.component.html',
  styleUrls: ['./tt-tournament-group.component.scss'],
})
export class TtTournamentGroupComponent implements OnInit {
  static DEFAULT_COLUMNS: string[] = ['alias', 'name'];

  @Input() title: string;
  @Input() group: TournamentGroup;

  dataSource: MatTableDataSource<Player>;
  subscription: Subscription;
  displayedColumns = [];

  constructor(
    private tournamentService: TournamentService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    if (!this.group) {
      throw new Error('group is required for tt-tournament-group');
    }
    const pp = this.tournamentService.groupPlayers(this.group);
    this.dataSource = new MatTableDataSource<Player>(pp);

    this.subscription = this.tournamentService
      .getGroupSubscription(this.group.id)
      .subscribe((group: TournamentGroup) => {
        if (group.id === this.group.id) {
          this.group = group;
          const playersList = this.tournamentService.groupPlayers(this.group);
          this.dataSource = new MatTableDataSource<Player>([...playersList]);
          this.displayedColumns = this.generateDisplayColumns();
        }
      });
    this.displayedColumns = this.generateDisplayColumns();
  }

  findMatch(p1: number, p2: number): Match {
    let m = this.groupService.matchFor(this.group, p1, p2);
    if (!m) {
      m = this.groupService.matchFor(this.group, p2, p1);
      if (!m) {
        return m;
      }
      // Return copy of the match with the inverted variable set to flip score in UI
      // Cannot set inverted in original match bc it will update previous ref to that object.
      return {
        id: m.id,
        player1_id: m.player1_id,
        player2_id: m.player2_id,
        player1_count_sets_won: m.player1_count_sets_won,
        player2_count_sets_won: m.player2_count_sets_won,
        player1_won: m.player1_won,
        is_over: m.is_over,
        match_sets: m.match_sets,
        inverted: true,
        fake: false,
      };
    }

    return m;
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
}
