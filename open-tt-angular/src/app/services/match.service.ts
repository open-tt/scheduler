import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { environment } from '../../environments/environment';
import { Match, MatchSet } from '../models/tournament';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor() {}

  areSameMatch(a: Match, b: Match): boolean {
    return a.player1 === b.player1 && a.player2 === b.player2;
  }

  player1Won(m: Match): boolean {
    const wonBy1 = this.player1Sets(m);
    const wonBy2 = this.player2Sets(m);

    return wonBy1.length > wonBy2.length && wonBy1.length >= 3;
  }

  finished(m: Match): boolean {
    const wonBy1 = this.player1Sets(m);
    const wonBy2 = this.player2Sets(m);

    return wonBy1.length >= 3 || wonBy2.length >= 3;
  }

  player1Sets(m: Match): MatchSet[] {
    return m.sets.filter((set) => set.player1Won());
  }

  player2Sets(m: Match): MatchSet[] {
    return m.sets.filter((set) => !set.player1Won());
  }
}
