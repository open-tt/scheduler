import { NgttTournament } from 'ng-tournament-tree';
import { Player } from './player';
import { TournamentService } from '../services/tournament.service';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

export interface HandicapTournament {
  id: number;
  scheduled_at: Date;
  players: Player[];
  groups: TournamentGroup[];
  playoff: NgttTournament;
  stage: TournamentStage;
  waitingList?: Player[];
}

export enum TournamentStage {
  REGISTRATION,
  CLASSIFICATION,
  PLAYOFFS,
  END,
}

export interface TournamentGroup {
  id: number;
  players: number[];
  matches: Match[];
}

export interface Match {
  id: number;
  player1_id: number;
  player2_id: number;
  player1_count_sets_won: number;
  player2_count_sets_won: number;
  is_over: boolean;
  sets: MatchSet[];
}

export class MatchSet {
  player1Score: number;
  player2Score: number;

  constructor(p1: number, p2: number) {
    this.player1Score = p1;
    this.player2Score = p2;
  }

  player1Won(): boolean {
    return this.player1Score > this.player2Score && this.player1Score >= 11;
  }

  finished(): boolean {
    return this.player1Score >= 11 || this.player2Score >= 11;
  }
}
