import {
  AfterContentInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Player } from '../../models/player';
import { TournamentService } from '../../services/tournament.service';
import { Observable, Subscription } from 'rxjs';
import { HandicapTournament } from '../../models/tournament';

@Component({
  selector: 'app-tt-player-handicap-table',
  templateUrl: './tt-player-handicap-table.component.html',
  styleUrls: ['./tt-player-handicap-table.component.scss'],
})
export class TtPlayerHandicapTableComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'rating', 'handicap'];
  dataSource: MatTableDataSource<Player>;
  tournamentSubscription: Subscription;

  // When enableSimpleView is true, only display Name and Rating columns
  @Input() enableSimpleView = false;
  @Input() enablePagination = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tournamentService: TournamentService) {
    this.dataSource = new MatTableDataSource<Player>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.tournamentSubscription = this.tournamentService
      .genSelectedTournament()
      .subscribe((t) => {
        this.dataSource = new MatTableDataSource<Player>(t.players);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnInit(): void {
    if (this.enableSimpleView) {
      this.displayedColumns = ['name', 'rating'];
    }
  }

  onRemovePlayer(player: Player): void {
    this.tournamentService.removePlayer(player);
  }

  isInWaitingList(player: Player): boolean {
    return this.tournamentService.isPlayerInWatingList(player);
  }

  isRemovable(player: Player): boolean {
    return this.tournamentService.isPlayerRemovable(player);
  }
}
