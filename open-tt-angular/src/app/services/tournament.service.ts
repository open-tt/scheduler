import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {
  HandicapTournament,
  TournamentGroup,
  TournamentStage,
} from '../models/tournament';
import {
  FakeHandicapTournamentApi,
  FakeTournamentData,
  testRounds,
} from './fake.data';
import { Player } from '../models/player';
import { NgttTournament } from 'ng-tournament-tree';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlayerService } from './player.service';
import { catchError } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  TOURNAMENTS_PATH = 'tournaments';
  PLAYERS_PATH = 'players';
  GROUPS_PATH = 'groups';
  PLAYOFFS_PATH = 'playoffs';
  DEFAULT_MIN_PLAYERS_PER_GROUP = 3;
  DEFAULT_MAX_PLAYERS_PER_GROUP = 4;

  private tournamentHistory: HandicapTournament[];
  private tournamentHistorySubject: Subject<HandicapTournament[]>;

  private selectedTournament: HandicapTournament = null;
  private selectedTournamentSubject: Subject<HandicapTournament>;

  private groupSubjects: Map<number, Subject<TournamentGroup>>;

  // private selectedTournamentPlayers: Player[];
  // private selectedTournamentPlayersSubject: Subject<Player[]>;
  // private selectedTournamentIsClosedSubject: Subject<boolean>;
  // private selectedTournamentGroupsSubject: Subject<TournamentGroup[]>;
  // private selectedTournamentGroupSubject: Subject<TournamentGroup>;
  // private selectedTournamentPlayoffsSubject: Subject<NgttTournament>;
  // private selectedTournament: HandicapTournament;

  constructor(
    private http2222: HttpClient,
    private playerService: PlayerService,
    private http: BaseApiService
  ) {
    this.tournamentHistorySubject = new Subject<HandicapTournament[]>();
    this.selectedTournamentSubject = new Subject<HandicapTournament>();
    // this.selectedTournamentPlayersSubject = new Subject<Player[]>();
    // this.selectedTournamentIsClosedSubject = new Subject<boolean>();
    // this.selectedTournamentGroupsSubject = new Subject<TournamentGroup[]>();
    // this.selectedTournamentGroupSubject = new Subject<TournamentGroup>();
    // this.selectedTournamentPlayoffsSubject = new Subject<NgttTournament>();

    // this.notifySelectedTournamentUpdates();
  }

  getGroupSubscription(id: number): Observable<TournamentGroup> {
    return this.groupSubjects[id].asObservable();
  }

  addGroupSubject(group: TournamentGroup): void {
    this.groupSubjects.set(group.id, new Subject<TournamentGroup>());
  }

  // Getters and Setters
  genTournamentHistory(): Observable<HandicapTournament[]> {
    return this.tournamentHistorySubject.asObservable();
  }

  genSelectedTournament(): Observable<HandicapTournament> {
    return this.selectedTournamentSubject.asObservable();
  }

  setSelectedTournament(tournament: HandicapTournament): void {
    this.selectedTournament = tournament;
    if (this.selectedTournament.groups) {
      for (const g of this.selectedTournament.groups) {
        this.addGroupSubject(g);
      }
    }
    this.selectedTournamentSubject.next(tournament);
  }

  getPlayers(): Player[] {
    return this.selectedTournament !== null
      ? this.selectedTournament.players
      : [];
  }

  // getSelectedTournamentGroups(): Observable<TournamentGroup[]> {
  //   return this.selectedTournamentGroupsSubject.asObservable();
  // }
  //
  // getGroup(): Observable<TournamentGroup> {
  //   return this.selectedTournamentGroupSubject.asObservable();
  // }
  //

  //
  // getIsSelectedTournamentClosed(): Observable<boolean> {
  //   return this.selectedTournamentIsClosedSubject.asObservable();
  // }
  //
  // // ------------------------- Utilities --------------------- //
  // // --------------------------------------------------------- //
  // /** Subscribe to this Observable in components to listen
  //  * for changes to activeTournament
  //  */
  // findIncompleteGroup(): TournamentGroup {
  //   return this.selectedTournament.groups.find(
  //     (g) => g.players.length < this.DEFAULT_MAX_PLAYERS_PER_GROUP
  //   );
  // }
  //
  // Boolean calculations
  isPlayerInWatingList(player: Player): boolean {
    return this.selectedTournament.waitingList?.includes(player);
  }

  isPlayerRemovable(player: Player): boolean {
    return (
      this.selectedTournament.stage === TournamentStage.REGISTRATION ||
      (this.selectedTournament.stage === TournamentStage.CLASSIFICATION &&
        this.isPlayerInWatingList(player))
    );
  }

  isClassificationComplete(): boolean {
    if (this.selectedTournament.stage < TournamentStage.CLASSIFICATION) {
      return false;
    }

    for (const g of this.selectedTournament.groups) {
      if (!g.isOver()) {
        return false;
      }
    }
    return true;
  }

  hasActiveTournament(): boolean {
    if (!this.tournamentHistory) {
      return false;
    }
    for (const tour of this.tournamentHistory) {
      if (tour.stage < TournamentStage.PLAYOFFS) {
        return true;
      }
    }
    return false;
  }

  //
  // // ----------------- Void Subscription Triggers ------------ //
  // // --------------------------------------------------------- //
  // /** Change the selected tournament and send update through the subject
  //  */
  // selectTournament(tournament: HandicapTournament): void {
  //   this.selectedTournament = tournament;
  //   this.notifySelectedTournamentUpdates();
  // }
  //
  // ------------------------ HTTP Actions --------------------- //
  // --------------------------------------------------------- //
  /** Create new Handicap tournament.
   * Add it to the list of tournaments.
   * Set selectedTournament to the new tournament and notify.
   */
  createNewHandicapTournament(): void {
    this.http
      .post<HandicapTournament>('/tournaments')
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        this.http
          .get<HandicapTournament[]>('/tournaments')
          .subscribe((history) => {
            this.tournamentHistory = history;
            this.tournamentHistorySubject.next(history);
            this.setSelectedTournament(history[0]);
          });
      });
  }

  /**
   * Creates a player using PlayerService and adds it to the current
   * tournament. Notify.
   */
  createPlayerForTournament(unsavedPlayer: Player): void {
    if (!unsavedPlayer) {
      return;
    }
    this.playerService
      .createNewPlayer(unsavedPlayer.name, unsavedPlayer.rating)
      .subscribe((p: Player) => {
        this.addPlayerToTournament(this.selectedTournament, p);
      });
  }

  createGroupsForSelectedTournament(): void {
    if (this.selectedTournament.stage >= TournamentStage.CLASSIFICATION) {
      throw new Error(
        '001: Cannot create groups for this tournament. Its in progress.'
      );
    }
    const totalPlayers = this.selectedTournament.players.length;
    if (totalPlayers < this.DEFAULT_MIN_PLAYERS_PER_GROUP) {
      throw new Error(
        '002: Cannot create groups for this tournament. Not enough players.'
      );
    }
    this.http
      .post<HandicapTournament>(
        `${environment.tournament_api_url}/${this.TOURNAMENTS_PATH}/${this.selectedTournament.id}/${this.GROUPS_PATH}`,
        {}
      )
      .pipe(catchError(this.handleError))
      .subscribe(this.setSelectedTournament);
  }

  createPlayoffsForSelectedTournament(): void {
    if (this.selectedTournament.playoff) {
      alert(
        'This tournament already has playoffs. This function should not be called. Report to developer.'
      );
      return;
    }
    this.http
      .post<HandicapTournament>(
        `${environment.tournament_api_url}/${this.TOURNAMENTS_PATH}/${this.selectedTournament.id}/${this.PLAYOFFS_PATH}`,
        {}
      )
      .pipe(catchError(this.handleError))
      .subscribe(this.setSelectedTournament);
  }

  addPlayerToTournament(t: HandicapTournament, p: Player): void {
    this.http
      .post<HandicapTournament>(
        `${environment.tournament_api_url}/${this.TOURNAMENTS_PATH}/${t.id}/${this.PLAYERS_PATH}`,
        {
          player_ids: [p.id],
        }
      )
      .pipe(catchError(this.handleError))
      .subscribe(this.setSelectedTournament);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Load all tournaments from backend.
   * Context needs to be passed explicitly because this is
   * intended to be a callback function.
   */
  private loadTournamentsCallback(context: TournamentService): void {
    context.http
      .get<HandicapTournament[]>('/tournaments')
      .subscribe((history) => {
        context.tournamentHistory = history;
        context.tournamentHistorySubject.next(history);
        context.setSelectedTournament(history[0]);
      });
  }

  /**
   * Public version of loadTournamentsCallback that does not need
   * to be called with context
   */
  reloadTournamentsAsync(): void {
    this.loadTournamentsCallback(this);
  }

  // /** Add players to selectedTournament and notify
  //  */
  addPlayerToSelectedHandicapTournament(player: Player): void {
    if (!this.selectedTournament) {
      alert(`No tournament selected. Create one.`);
      return;
    }
    if (this.selectedTournament.stage > TournamentStage.CLASSIFICATION) {
      alert(`Cannot add player after Group Stage`);
      return;
    }
    this.addPlayerToTournament(this.selectedTournament, player);
  }

  //
  // /** Remove player from selectedTournament and notify
  //  */
  removePlayer(player: Player): void {
    // Look for player in waiting list first
    const waitingListIndex = this.selectedTournament.waitingList.indexOf(
      player
    );
    if (waitingListIndex >= 0) {
      this.selectedTournament.waitingList.splice(waitingListIndex, 1);
      return;
    }

    // Prevent removing after classification stage
    if (this.selectedTournament.stage >= TournamentStage.CLASSIFICATION) {
      alert('Cannot remove player when tournament in progress');
      return;
    }
    const index = this.selectedTournament.players.indexOf(player);
    this.selectedTournament.players.splice(index, 1);

    this.selectedTournamentSubject.next(this.selectedTournament);
  }

  deleteTournament(id: number): void {
    this.http
      .delete(`/tournaments/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe(() => this.loadTournamentsCallback(this));
  }

  deleteActiveTournament(): void {
    if (!this.selectedTournament) {
      alert('No tournament selected');
      return;
    }
    if (this.selectedTournament.stage >= TournamentStage.CLASSIFICATION) {
      alert('Cannot remove tournament in progress');
      return;
    }
    this.deleteTournament(this.selectedTournament.id);
  }

  updateMatchResult(g: TournamentGroup): void {
    for (let i = 0; i < this.selectedTournament.groups.length; i++) {
      if (this.selectedTournament.groups[i].equals(g)) {
        this.selectedTournament.groups[i] = g;
        this.selectedTournamentSubject.next(this.selectedTournament);
      }
    }
  }

  //
  // refreshHistory(): void {
  //   this.tournamentHistorySubject.next(this.tournamentHistory);
  // }
  //
  // refreshSelected(): void {
  //   this.selectedTournamentSubject.next(this.selectedTournament);
  // }
  //
  // selectedTournamentPlayers(): Player[] {
  //   return this.selectedTournament ? this.selectedTournament.players : [];
  // }

  // ------------------------- Notifiers --------------------- //
  // --------------------------------------------------------- //
  // notifySelectedTournamentUpdates(
  //   shouldNotify: {
  //     tournament?: true;
  //     players?: true;
  //     isClosed?: true;
  //     group?: true;
  //     groups?: true;
  //     playoffs?: true;
  //     history?: true;
  //   } = {
  //     tournament: true,
  //     players: true,
  //     isClosed: true,
  //     group: true,
  //     groups: true,
  //     playoffs: true,
  //     history: true,
  //   },
  //   g?: TournamentGroup
  // ): void {
  //   if (shouldNotify.tournament) {
  //     this.selectedTournamentSubject.next(this.selectedTournament);
  //   }
  //   if (shouldNotify.players) {
  //     this.selectedTournamentPlayersSubject.next(
  //       this.selectedTournament.players
  //     );
  //   }
  //   if (shouldNotify.group && !!g) {
  //     this.selectedTournamentGroupSubject.next(g);
  //   }
  //   if (shouldNotify.groups) {
  //     this.selectedTournamentGroupsSubject.next(this.selectedTournament.groups);
  //   }
  //   if (shouldNotify.playoffs) {
  //     this.selectedTournamentPlayoffsSubject.next(
  //       this.selectedTournament.playoff
  //     );
  //   }
  //   if (shouldNotify.history) {
  //     this.tournamentHistorySubject.next(this.tournamentHistory);
  //   }
  // }
}
