import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Match, TournamentGroup } from '../models/tournament';
import { Player } from '../models/player';
import { MatchService } from './match.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  subjects: Map<number, Subject<TournamentGroup>[]>;

  constructor(private matchService: MatchService) {}

  genSubscription(id: number): Observable<TournamentGroup> {
    return this.subjects[id].asObservable();
  }

  matchFor(g: TournamentGroup, p1: number, p2: number): Match {
    return g.matches.find(
      (m: Match) => m.player1_id === p1 && m.player2_id === p2
    );
  }

  matchScore(g: TournamentGroup, p1: number, p2: number): number[] {
    if (p1 === p2) {
      return undefined;
    }
    const match = g.matches.find((m: Match) => {
      return (
        (m.player1_id === p1 && m.player2_id === p2) ||
        (m.player1_id === p2 && m.player2_id === p1)
      );
    });
    return [match.player1_count_sets_won, match.player2_count_sets_won];
  }

  isOver(g: TournamentGroup): boolean {
    if (!g.matches || g.matches.length === 0) {
      return false;
    }
    for (const match of g.matches) {
      if (!match.is_over) {
        return false;
      }
    }
    return true;
  }

  areSameGroup(a: TournamentGroup, b: TournamentGroup): boolean {
    if (a.players.length !== b.players.length) {
      return false;
    }
    const ids: number[] = a.players.map((pID: number) => pID);
    for (const gpID of b.players) {
      if (!ids.includes(gpID)) {
        return false;
      }
    }
    return true;
  }
}
