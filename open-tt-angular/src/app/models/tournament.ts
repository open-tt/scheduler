import {NgttTournament} from 'ng-tournament-tree';
import {Player} from './player';

export interface HandicapTournament {
  id: number;
  date: Date;
  players: Player[];
  groups: TournamentGroup[];
  playoff: NgttTournament;
  stage: TournamentStage;
  waitingList?: Player[];
  inprogress?: boolean;
  ended?: boolean;
}

export enum TournamentStage {
  REGISTRATION,
  CLASSIFICATION,
  PLAYOFFS,
  END
}

export class TournamentGroup {
  players: Player[];
  matches: Match[] = [];
  constructor(players: Player[], matches: Match[] = []) {
    this.players = players;
    this.matches = matches;
  }

  equals(group: TournamentGroup): boolean {
    if (this.players.length !== group.players.length) {
      return false;
    }
    const ids: number[] = this.players.map(p => p.id);
    for (const gp of group.players) {
      if (!ids.includes(gp.id)) {
        return false;
      }
    }
    return true;
  }

  standings(): number[] {
    const scores: number[] = [];
    this.players.forEach(_ => scores.push(0));
    this.matches.forEach(match => {
      let winner = match.player2;
      if (match.player1Won()) {
        winner = match.player1;
      }
      scores[this.players.indexOf(winner)] += 1;
    });
    return scores;
  }

  matchFor(p1: Player, p2: Player): Match {
    return this.matches.find(m => m.player1 === p1 && m.player2 === p2);
  }

  matchScore(p1: Player, p2: Player): number[] {
    const match = this.matches.find(m => m.player1 === p1 && m.player2 === p2);
    if (!match) {
      this.matches.push(new Match(p1, p2, []));
      return [0, 0];
    }
    const p1Sets = match.player1Sets().length;
    const p2Sets = match.player2Sets().length;
    return [p1Sets, p2Sets];
  }
}

export class Match {
  player1: Player;
  player2: Player;
  setScore: number[];
  sets: MatchSet[];

  constructor(p1: Player, p2: Player, sets: MatchSet[] = [], setScore: number[] = [0, 0]) {
    this.player1 = p1;
    this.player2 = p2;
    this.setScore = setScore;
    this.sets = sets;
  }

  equals(match: Match): boolean {
    return this.player1 === match.player1 && this.player2 === match.player2;
  }

  player1Won(): boolean {
    const wonBy1 = this.player1Sets();
    const wonBy2 = this.player2Sets();

    return wonBy1.length > wonBy2.length && wonBy1.length >= 3;
  }

  finished(): boolean {
    const wonBy1 = this.player1Sets();
    const wonBy2 = this.player2Sets();

    return (wonBy1.length >= 3 || wonBy2.length >= 3);
  }

  player1Sets(): MatchSet[] {
    return this.sets.filter(set => set.player1Won());
  }

  player2Sets(): MatchSet[] {
    return this.sets.filter(set => !set.player1Won());
  }

  getSetResultSummary(): string {
    let count1 = 0;
    let count2 = 0;
    this.sets.forEach(res => {
      if (res.player1Score > res.player2Score) {
        count1 += 1;
      } else {
        count2 += 1;
      }
    });
    return `${count1} - ${count2}`;
  }

  setsForPlayer(player: Player): number {
    if (player.id === this.player1.id) {
      return this.player1Sets().length;
    } else if (player.id === this.player2.id){
      return this.player2Sets().length;
    } else {
      throw new Error(`Player ${player.name} is not in this Match [${this.player1.name}, ${this.player2.name}]`);
    }
  }
}

export class MatchSet {
  player1Score: number;
  player2Score: number;

  constructor(p1: number, p2: number) {
    this.player1Score = p1;
    this.player2Score = p2;
  }

  player1Won(): boolean {
    return this.player1Score > this.player2Score &&
      this.player1Score >= 11;
  }

  finished(): boolean {
    return this.player1Score >= 11 || this.player2Score >= 11;
  }
}
