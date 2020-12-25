import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HandicapTournament, TournamentGroup, TournamentStage} from '../models/tournament';
import {FakeHandicapTournamentApi, FakeTournamentData, testRounds} from './fake.data';
import {Player} from '../models/player';
import {NgttTournament} from 'ng-tournament-tree';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  DEFAULT_MIN_PLAYERS_PER_GROUP = 3;
  DEFAULT_MAX_PLAYERS_PER_GROUP = 4;

  // Store mapping date => tournament for all tournaments we load
  private tournamentHistorySubject: Subject<HandicapTournament[]>;
  private tournamentHistory: HandicapTournament[];

  private selectedTournamentSubject: Subject<HandicapTournament>;
  private selectedTournamentPlayersSubject: Subject<Player[]>;
  private selectedTournamentIsClosedSubject: Subject<boolean>;
  private selectedTournamentGroupsSubject: Subject<TournamentGroup[]>;
  private selectedTournamentGroupSubject: Subject<TournamentGroup>;
  private selectedTournamentPlayoffsSubject: Subject<NgttTournament>;
  private selectedTournament: HandicapTournament;

  constructor() {
    this.tournamentHistory = new FakeTournamentData().tournaments;
    this.tournamentHistorySubject = new Subject<HandicapTournament[]>();

    this.selectedTournament = this.tournamentHistory[0];
    this.selectedTournamentSubject = new Subject<HandicapTournament>();
    this.selectedTournamentPlayersSubject = new Subject<Player[]>();
    this.selectedTournamentIsClosedSubject = new Subject<boolean>();
    this.selectedTournamentGroupsSubject = new Subject<TournamentGroup[]>();
    this.selectedTournamentGroupSubject = new Subject<TournamentGroup>();
    this.selectedTournamentPlayoffsSubject = new Subject<NgttTournament>();

    this.notifySelectedTournamentUpdates();
  }

  // ------------------------ Observables -------------------- //
  // --------------------------------------------------------- //
  /** Subscribe to this Observable in components to listen
   * for changes to activeTournament
   */
  getSelectedTournament(): Observable<HandicapTournament> {
    return this.selectedTournamentSubject.asObservable();
  }

  /**
   * Subscribe to this Observable in components to listen
   * for changes to players
   */
  getSelectedTournamentPlayers(): Observable<Player[]> {
    return this.selectedTournamentPlayersSubject.asObservable();
  }

  getSelectedTournamentGroups(): Observable<TournamentGroup[]> {
    return this.selectedTournamentGroupsSubject.asObservable();
  }

  getGroup(): Observable<TournamentGroup> {
    return this.selectedTournamentGroupSubject.asObservable();
  }

  getTournamentHistory(): Observable<HandicapTournament[]> {
    return this.tournamentHistorySubject.asObservable();
  }

  getIsSelectedTournamentClosed(): Observable<boolean> {
    return this.selectedTournamentIsClosedSubject.asObservable();
  }
  // ------------------------- Utilities --------------------- //
  // --------------------------------------------------------- //
  /** Subscribe to this Observable in components to listen
   * for changes to activeTournament
   */
  findIncompleteGroup(): TournamentGroup {
    return this.selectedTournament.groups.find(g => g.players.length < this.DEFAULT_MAX_PLAYERS_PER_GROUP);
  }

  isPlayerInWatingList(player: Player): boolean {
    return this.selectedTournament.waitingList?.includes(player);
  }

  isPlayerRemovable(player: Player): boolean {
    return (
      this.selectedTournament.stage === TournamentStage.REGISTRATION ||
      (
        this.selectedTournament.stage === TournamentStage.CLASSIFICATION &&
        this.isPlayerInWatingList(player)
      )
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
    for (const tour of this.tournamentHistory) {
      if (tour.stage < TournamentStage.PLAYOFFS) {
        return true;
      }
    }
    return false;
  }

  // ----------------- Void Subscription Triggers ------------ //
  // --------------------------------------------------------- //
  /** Change the selected tournament and send update through the subject
   */
  selectTournament(tournament: HandicapTournament): void {
    this.selectedTournament = tournament;
    this.notifySelectedTournamentUpdates();
  }

  // ------------------------ HTTP Calls --------------------- //
  // --------------------------------------------------------- //
  /** Create new Handicap tournament.
   * Add it to the list of tournaments.
   * Set selectedTournament to the new tournament and notify.
   */
  createNewHandicapTournament(): void {
    // todo Replace with HTTP call to create Tournament
    this.selectedTournament = FakeHandicapTournamentApi.createNewHandicapTournament();
    this.tournamentHistory.unshift(this.selectedTournament);
    this.notifySelectedTournamentUpdates();
  }

  /**
   * Creates a player using PlayerService and adds it to the current
   * tournament. Notify.
   */
  createPlayerForTournament(unsavedPlayer: Player): void {
    if (!unsavedPlayer) {
      return;
    }
    const player = FakeHandicapTournamentApi.createPlayer(
      unsavedPlayer.name,
      unsavedPlayer.rating,
      unsavedPlayer.USATTID);
    this.addPlayerToSelectedHandicapTournament(player);
    this.notifySelectedTournamentUpdates();
  }

  createGroupsForSelectedTournament(): void {
    if (this.selectedTournament.stage >= TournamentStage.CLASSIFICATION) {
      throw new Error('001: Cannot create groups for this tournament. Its in progress.');
    }
    const totalPlayers = this.selectedTournament.players.length;
    if (totalPlayers < this.DEFAULT_MIN_PLAYERS_PER_GROUP) {
      throw new Error('002: Cannot create groups for this tournament. Not enough players.');
    }
    const groupSizes = FakeHandicapTournamentApi.decomposeInGroups(
      totalPlayers,
      this.DEFAULT_MIN_PLAYERS_PER_GROUP,
      this.DEFAULT_MAX_PLAYERS_PER_GROUP
    );
    const groups: TournamentGroup[] = [];
    let groupPlayers: Player[] = [];
    let groupIndex = 0;
    this.selectedTournament.players.forEach(player => {
      if (groupSizes[groupIndex] <= 0) {
        groups.push(new TournamentGroup(groupPlayers));
        groupPlayers = [];
        groupIndex += 1;
      }
      groupPlayers.push(player);
      groupSizes[groupIndex] -= 1;
    });
    if (groupPlayers.length > 0) {
      groups.push(new TournamentGroup(groupPlayers));
    }
    this.selectedTournament.groups = groups;
    this.selectedTournament.stage = TournamentStage.CLASSIFICATION;
    this.notifySelectedTournamentUpdates({tournament: true, groups: true, isClosed: true});
  }

  createPlayoffsForSelectedTournament(): void {
    if (this.selectedTournament.playoff) {
      alert('This tournament already has playoffs. This function should not be called. Report to developer.');
      return;
    }
    this.selectedTournament.playoff = {
      rounds: testRounds
    };
    this.selectedTournament.stage = TournamentStage.PLAYOFFS;
    this.notifySelectedTournamentUpdates({playoffs: true});
  }

  /** Add players to selectedTournament and notify
   */
  addPlayerToSelectedHandicapTournament(player: Player): void {
    if (!this.selectedTournament) {
      alert(`No tournament selected. Create one.`);
      return;
    }
    if (this.selectedTournament.stage > TournamentStage.CLASSIFICATION) {
      alert(`Cannot add player after Group Stage`);
      return;
    }
    if (this.selectedTournament.players.find(p => p.id === player.id)) {
      alert(`Player ${player.name} already in tournament. Not adding.`);
      return;
    }
    this.selectedTournament.players.push(player);

    // For tournaments already in the Classification Stage (Groups)
    // We need to add player to a group manually or to a waiting list
    // if all groups are full.
    // Create new group if waitingList is at least the minimum players required
    if (this.selectedTournament.stage === TournamentStage.CLASSIFICATION) {
      const g = this.findIncompleteGroup();
      if (!g) {
        this.selectedTournament.waitingList.push(player);
        if (this.selectedTournament.waitingList.length >= this.DEFAULT_MIN_PLAYERS_PER_GROUP) {
          const newGroup = new TournamentGroup(this.selectedTournament.waitingList);
          this.selectedTournament.groups.push(newGroup);
          this.selectedTournament.waitingList = [];
        } else {
          alert(`All groups are full, added ${player.name} to the waiting list. ${
            this.selectedTournament.waitingList.length
          } Players waiting.`);
        }
        this.notifySelectedTournamentUpdates({tournament: true});
      } else {
        g.players.push(player);
        this.notifySelectedTournamentUpdates({group: true}, g);
      }
    }
    this.notifySelectedTournamentUpdates({players: true});
  }

  /** Remove player from selectedTournament and notify
   */
  removePlayer(player): void {
    const waitingListIndex = this.selectedTournament.waitingList.indexOf(player);
    if (waitingListIndex >= 0) {
      this.selectedTournament.waitingList.splice(waitingListIndex, 1);
    }

    if (this.selectedTournament.stage >= TournamentStage.CLASSIFICATION) {
      alert('Cannot remove player when tournament in progress');
      return;
    }
    const index = this.selectedTournament.players.indexOf(player);
    this.selectedTournament.players.splice(index, 1);

    this.selectedTournamentPlayersSubject.next(this.selectedTournament.players);
  }

  deleteActiveTournament(): void {
    console.log('2');
    const index = this.tournamentHistory.findIndex(t => {
      console.log(t.stage === TournamentStage.REGISTRATION);
      return t.stage === TournamentStage.REGISTRATION;
    });
    if (index >= 0) {
      console.log('3');
      this.tournamentHistory.splice(index, 1);
      this.selectedTournament = this.tournamentHistory[0];
      this.notifySelectedTournamentUpdates({history: true, tournament: true, players: true});
    }
    console.log('4');
  }

  updateMatchResult(g: TournamentGroup): void {
    for (let i = 0; i < this.selectedTournament.groups.length; i++) {
      if (this.selectedTournament.groups[i].equals(g)) {
        this.selectedTournament.groups[i] = g;
        this.selectedTournamentGroupSubject.next(this.selectedTournament.groups[i]);
      }
    }
  }

  refreshHistory(): void {
    this.tournamentHistorySubject.next(this.tournamentHistory);
  }

  refreshSelected(): void {
    this.selectedTournamentSubject.next(this.selectedTournament);
  }

  selectedTournamentPlayers(): Player[] {
    return this.selectedTournament ? this.selectedTournament.players : [];
  }
  // ------------------------- Notifiers --------------------- //
  // --------------------------------------------------------- //
  notifySelectedTournamentUpdates(
    shouldNotify: {
      tournament?: true,
      players?: true,
      isClosed?: true,
      group?: true,
      groups?: true,
      playoffs?: true,
      history?: true
    } = {
      tournament: true,
      players: true,
      isClosed: true,
      group: true,
      groups: true,
      playoffs: true,
      history: true,
    },
    g?: TournamentGroup,
  ): void {
    if (shouldNotify.tournament) {
      this.selectedTournamentSubject.next(this.selectedTournament);
    }
    if (shouldNotify.players) {
      this.selectedTournamentPlayersSubject.next(this.selectedTournament.players);
    }
    if (shouldNotify.group && !!g) {
      this.selectedTournamentGroupSubject.next(g);
    }
    if (shouldNotify.groups) {
      this.selectedTournamentGroupsSubject.next(this.selectedTournament.groups);
    }
    if (shouldNotify.playoffs) {
      this.selectedTournamentPlayoffsSubject.next(this.selectedTournament.playoff);
    }
    if (shouldNotify.history) {
      this.tournamentHistorySubject.next(this.tournamentHistory);
    }
  }
}
