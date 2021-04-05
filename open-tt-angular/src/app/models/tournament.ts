import { Player } from './player';

export interface Tournament {
  id: number;
  scheduled_at: Date;
  players: Player[];
  groups: TournamentGroup[];
  playoff: Playoff;
  stage: TournamentStage;
  waitingList?: Player[];
}

export enum TournamentStage {
  REGISTRATION,
  CLASSIFICATION,
  OPEN_PLAYOFFS,
  PLAYOFFS,
  END,
}

export interface GroupPlayerSummary {
  wins: number;
  loses: number;
  place: number;
}

export interface TournamentGroup {
  id: number;
  players: number[];
  matches: Match[];
  is_over: boolean;

  //
  players_summary: Map<number, GroupPlayerSummary>;
}

export interface Match {
  // Server side variables
  id: number;
  player1_id: number;
  player2_id: number;
  player1_count_sets_won: number;
  player2_count_sets_won: number;
  player1_won: boolean;
  is_over: boolean;
  match_sets: {
    id: number;
    player1_score: number;
    player2_score: number;
  }[];
  fake: boolean; // Mark fake matches created for purpose of bracket completion

  // Client side variables
  inverted: boolean;
}

export interface PlayoffRound {
  id: number;
  matches: Match[];
  players: Player[];
  winners: Player[];
  over: boolean;
}

export interface Playoff {
  id: number;
  rounds: PlayoffRound[];
  over: boolean;
  first: number;
  second: number;
  third: Player[];
}
