import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TournamentGroup } from '../../models/tournament';
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
  groupIsOver = false;

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
        if (this.groupService.areSameGroup(group, this.group)) {
          this.group = group;
          this.dataSource = new MatTableDataSource<Player>(
            this.tournamentService.groupPlayers(this.group)
          );
          this.displayedColumns = this.generateDisplayColumns();
          this.groupIsOver = this.groupService.isOver(this.group);
        }
      });
    this.displayedColumns = this.generateDisplayColumns();
    this.groupIsOver = this.groupService.isOver(this.group);
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
