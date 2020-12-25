import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Player} from '../../models/player';
import {TournamentService} from '../../services/tournament.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tt-player-handicap-table',
  templateUrl: './tt-player-handicap-table.component.html',
  styleUrls: ['./tt-player-handicap-table.component.scss']
})
export class TtPlayerHandicapTableComponent implements OnInit, OnChanges, AfterContentInit {

  displayedColumns: string[] = ['index', 'name', 'rating', 'handicap'];
  dataSource: MatTableDataSource<Player>;
  activeTournamentPlayersSubscription: Subscription; // Listen to changes in service
  activeTournamentStateSubscription: Subscription; // Listen to changes in service
  isClasedTournament: boolean;

  // When enableSimpleView is true, only display Name and Rating columns
  @Input() enableSimpleView = false;
  @Input() enablePagination = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tournamentService: TournamentService) {
    this.dataSource = new MatTableDataSource<Player>(this.tournamentService.selectedTournamentPlayers());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.isClasedTournament = false;

    this.activeTournamentPlayersSubscription =
      this.tournamentService.getSelectedTournamentPlayers().subscribe(
        players => {
          this.onActiveTournamentPlayersUpdate(players);
        }
      );
    this.activeTournamentStateSubscription =
      this.tournamentService.getIsSelectedTournamentClosed().subscribe(
        isClosed => {
          this.onActiveTournamentStateUpdate(isClosed);
        }
      );
    // this.tournamentService.refreshStateSubscription();
  }

  onActiveTournamentPlayersUpdate(players: Player[]): void {
    this.dataSource = new MatTableDataSource<Player>(players);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onActiveTournamentStateUpdate(isClosed: boolean): void {
    this.isClasedTournament = isClosed;
    if (isClosed) {
      this.displayedColumns = ['index', 'name', 'rating', 'handicap'];
    } else {
      this.displayedColumns = ['index', 'name', 'rating', 'handicap', 'actions'];
    }
  }

  ngOnInit(): void {
    if (this.enableSimpleView) {
      this.displayedColumns = ['name', 'rating'];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = changes.dataSource.currentValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.isClasedTournament) {
      this.displayedColumns = ['index', 'name', 'rating', 'handicap'];
    } else {
      this.displayedColumns = ['index', 'name', 'rating', 'handicap', 'actions'];
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

  ngAfterContentInit(): void {

  }
}
