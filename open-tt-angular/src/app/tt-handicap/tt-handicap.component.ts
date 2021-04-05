import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlayerDialogComponent } from '../component-library/create-player-dialog/create-player-dialog.component';
import {
  PlayoffRound,
  Tournament,
  TournamentGroup,
  TournamentStage,
} from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { Subscription } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { NgttRound, NgttTournament } from 'ng-tournament-tree';

@Component({
  selector: 'app-tt-handicap',
  templateUrl: './tt-handicap.component.html',
  styleUrls: ['./tt-handicap.component.scss'],
})
export class TtHandicapComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  // Selected tournament
  selectedTournament: Tournament;

  // Subscriptions
  selectedTournamentSubscription: Subscription; // Listen to changes in service
  tournamentHistorySubscription: Subscription;
  playerUniverseSubscription: Subscription;
  selectedTournamentGroupsSubscription: Subscription;
  tournamentHistory: Tournament[];
  groups: TournamentGroup[];
  registeredPlayers: Player[];
  playerUniverse: Player[];
  selectedTab = 0;

  constructor(
    public dialog: MatDialog,
    public tournamentService: TournamentService,
    public playerService: PlayerService
  ) {
    this.registeredPlayers = [];
    this.playerUniverse = [];
  }

  ngOnInit(): void {
    this.playerUniverseSubscription = this.playerService
      .genPlayerUniverse()
      .subscribe((players: Player[]) => {
        this.playerUniverse = players;
      });
    this.tournamentHistorySubscription = this.tournamentService
      .genTournamentHistory()
      .subscribe((tournaments: Tournament[]) => {
        this.tournamentHistory = tournaments;
      });
    this.selectedTournamentSubscription = this.tournamentService
      .genSelectedTournament()
      .subscribe((handicap) => {
        this.selectedTournament = handicap;
        this.registeredPlayers = this.selectedTournament.players ?? [];
      });
    this.tournamentService.reloadTournamentsAsync();
    this.playerService.loadAllPlayers();
  }

  ngOnDestroy(): void {
    this.tournamentHistorySubscription.unsubscribe();
    this.selectedTournamentSubscription.unsubscribe();
  }

  selectActiveTab(): number {
    // Set the focused tab on load
    if (!this.shouldDisablePlayoffs()) {
      return 2;
    } else if (!this.shouldDisableGroups()) {
      return 1;
    } else {
      return 0;
    }
  }

  inClassifiers(): boolean {
    return (
      this.selectedTournament &&
      this.selectedTournament.stage <= TournamentStage.CLASSIFICATION
    );
  }

  inOpenPlayoffs(): boolean {
    return (
      this.selectedTournament &&
      this.selectedTournament.stage <= TournamentStage.OPEN_PLAYOFFS
    );
  }

  isMatchEditable(): boolean {
    return this.tournamentService.isGroupsEditable();
  }

  canCreateGroups(): boolean {
    return (
      this.selectedTournament &&
      this.selectedTournament.players &&
      this.selectedTournament.players.length >=
        this.tournamentService.DEFAULT_MIN_PLAYERS_PER_GROUP &&
      this.selectedTournament.stage === TournamentStage.REGISTRATION
    );
  }

  firstTournament(): Tournament {
    if (!this.tournamentHistory || this.tournamentHistory.length === 0) {
      return;
    }
    return this.tournamentHistory[0];
  }

  canCreatePlayoffs(): boolean {
    return (
      this.selectedTournament &&
      !this.selectedTournament.playoff &&
      this.tournamentService.isClassificationComplete()
    );
  }

  openDialog(player: Player): void {
    const dialogRef = this.dialog.open(CreatePlayerDialogComponent, {
      width: '250px',
      data: player,
    });

    dialogRef.afterClosed().subscribe((result: Player) => {
      this.tournamentService.createPlayerForTournament(result);
    });
  }

  onDropdownChange(change: MatSelectChange): void {
    this.tournamentService.setSelectedTournament(change.value);
  }

  addPlayer(player: Player): void {
    // If player exists (has an id), register it
    if (player.id) {
      this.registerPlayer(this.selectedTournament, player);
    } else {
      // Else, open Create Player Modal
      this.openDialog(player);
    }
  }

  registerPlayer(tournament: Tournament, player: Player): void {
    this.tournamentService.addPlayerToSelectedHandicapTournament(player);
  }

  onCreateGroup(): void {
    this.tournamentService.createGroupsForSelectedTournament();
  }

  onCreatePlayoffs(): void {
    this.tournamentService.createPlayoffsForSelectedTournament();
  }

  onCreateNewTournament(): void {
    this.tournamentService.createNewHandicapTournament();
  }

  shouldDisableGroups(): boolean {
    return (
      !this.selectedTournament ||
      this.selectedTournament.stage < TournamentStage.CLASSIFICATION
    );
  }

  shouldDisablePlayoffs(): boolean {
    return (
      !this.selectedTournament ||
      this.selectedTournament.stage < TournamentStage.OPEN_PLAYOFFS
    );
  }

  totalParticipants(): number {
    return this.selectedTournament.players
      ? this.selectedTournament.players.length
      : 0;
  }

  onDeleteNewTournament(): void {
    this.tournamentService.deleteActiveTournament();
  }

  canCreateNewTournament(): boolean {
    return !this.tournamentService.hasActiveTournament();
  }

  selectedTournamentIsActive(): boolean {
    return (
      this.selectedTournament &&
      this.selectedTournament.stage < TournamentStage.CLASSIFICATION
    );
  }

  buildNgttBrackets(): NgttTournament {
    const rounds: NgttRound[] = [];
    this.selectedTournament.playoff.rounds.forEach((r: PlayoffRound) => {
      rounds.push({
        type: r.matches.length === 1 ? 'Final' : 'Winnerbracket',
        matches: r.matches,
      });
    });
    return { rounds };
  }

  isTournamentOver(): boolean {
    return (
      this.selectedTournament &&
      this.selectedTournament.playoff &&
      this.selectedTournament.playoff.over
    );
  }
}
