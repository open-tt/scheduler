import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlayerDialogComponent } from '../component-library/create-player-dialog/create-player-dialog.component';
import {
  HandicapTournament,
  TournamentGroup,
  TournamentStage,
} from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tt-handicap',
  templateUrl: './tt-handicap.component.html',
  styleUrls: ['./tt-handicap.component.scss'],
})
export class TtHandicapComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  // Selected tournament
  selectedTournament: HandicapTournament;

  // Subscriptions
  selectedTournamentSubscription: Subscription; // Listen to changes in service
  tournamentHistorySubscription: Subscription;
  selectedTournamentGroupsSubscription: Subscription;

  tournamentHistory: HandicapTournament[];
  groups: TournamentGroup[];

  registeredPlayers: Player[];

  constructor(
    public dialog: MatDialog,
    public tournamentService: TournamentService
  ) {
    this.registeredPlayers = [];
  }

  ngOnInit(): void {
    this.tournamentHistorySubscription = this.tournamentService
      .genTournamentHistory()
      .subscribe((tournaments) => {
        this.tournamentHistory = tournaments;
      });
    this.selectedTournamentSubscription = this.tournamentService
      .genSelectedTournament()
      .subscribe((handicap) => {
        this.selectedTournament = handicap;
        this.registeredPlayers = this.selectedTournament.players ?? [];
        console.log('Updated selected tournamnet');
        console.log('Updated players');
        console.log(this.registeredPlayers);
      });
    this.tournamentService.loadTournamentsAPI();
  }

  ngOnDestroy(): void {
    this.tournamentHistorySubscription.unsubscribe();
    this.selectedTournamentSubscription.unsubscribe();
  }

  inClassifiers(): boolean {
    return (
      this.selectedTournament &&
      this.selectedTournament.stage <= TournamentStage.CLASSIFICATION
    );
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

  firstTournament(): HandicapTournament {
    if (!this.tournamentHistory || this.tournamentHistory.length === 0) {
      return;
    }
    return this.tournamentHistory[0];
  }

  canCreatePlayoffs(): boolean {
    return (
      this.selectedTournament &&
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

  registerPlayer(tournament: HandicapTournament, player: Player): void {
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
      this.selectedTournament.stage < TournamentStage.PLAYOFFS
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
    return this.selectedTournament.stage < TournamentStage.CLASSIFICATION;
  }
}
