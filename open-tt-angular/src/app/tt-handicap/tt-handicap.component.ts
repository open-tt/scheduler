import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../models/player';
import {MatSelectChange} from '@angular/material/select';
import {MatDialog} from '@angular/material/dialog';
import {CreatePlayerDialogComponent} from '../component-library/create-player-dialog/create-player-dialog.component';
import {HandicapTournament, TournamentGroup, TournamentStage} from '../models/tournament';
import {FakeUserData} from '../services/fake.data';
import {TournamentService} from '../services/tournament.service';
import {Subscription} from 'rxjs';
import {group} from '@angular/animations';


@Component({
  selector: 'app-tt-handicap',
  templateUrl: './tt-handicap.component.html',
  styleUrls: ['./tt-handicap.component.scss']
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

  fakePlayerUniverse: Player[];

  constructor(
    public dialog: MatDialog,
    public tournamentService: TournamentService,
  ) {
    this.fakePlayerUniverse = new FakeUserData().players;
  }

  ngOnInit(): void {
    this.tournamentHistorySubscription =
      this.tournamentService.getTournamentHistory().subscribe(
        tournaments => {
          this.tournamentHistory = tournaments;
        }
      );
    this.selectedTournamentSubscription =
      this.tournamentService.getSelectedTournament().subscribe(
        handicap => {
          this.selectedTournament = handicap;
        }
      );

    this.tournamentService.refreshHistory();
    this.tournamentService.refreshSelected();
  }

  ngOnDestroy(): void {
    this.tournamentHistorySubscription.unsubscribe();
    this.selectedTournamentSubscription.unsubscribe();
  }

  inClassifiers(): boolean {
    return this.selectedTournament.stage <= TournamentStage.CLASSIFICATION;
  }

  canCreateGroups(): boolean {
    return (
      this.selectedTournament &&
      this.selectedTournament.players &&
      this.selectedTournament.players.length >= this.tournamentService.DEFAULT_MIN_PLAYERS_PER_GROUP &&
      this.selectedTournament.stage === TournamentStage.REGISTRATION
    );
  }

  canCreatePlayoffs(): boolean {
    return this.selectedTournament &&
      this.selectedTournament.groups &&
      this.selectedTournament.groups.length > 0 &&
      this.selectedTournament.stage === TournamentStage.CLASSIFICATION;
  }

  openDialog(player: Player): void {
    const dialogRef = this.dialog.open(CreatePlayerDialogComponent, {
      width: '250px',
      data: player
    });

    dialogRef.afterClosed().subscribe((result: Player) => {
      this.tournamentService.createPlayerForTournament(result);
    });
  }

  onDropdownChange(change: MatSelectChange): void {
    this.tournamentService.selectTournament(change.value);
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

  hasEnded(): boolean {
    return this.selectedTournament && this.selectedTournament.ended;
  }

  shouldDisableGroups(): boolean {
    return !this.selectedTournament ||
      this.selectedTournament.stage < TournamentStage.CLASSIFICATION;
  }

  shouldDisablePlayoffs(): boolean {
    return !this.selectedTournament || this.selectedTournament.stage < TournamentStage.PLAYOFFS;
  }

  totalParticipants(): number {
    return this.selectedTournament.players ? this.selectedTournament.players.length : 0;
  }
}
