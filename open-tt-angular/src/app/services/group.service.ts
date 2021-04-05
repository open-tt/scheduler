import { Injectable } from '@angular/core';
import { Match, TournamentGroup } from '../models/tournament';
import { MatchService } from './match.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private matchService: MatchService) {}

  matchFor(g: TournamentGroup, p1: number, p2: number): Match {
    return g.matches.find(
      (m: Match) => m.player1_id === p1 && m.player2_id === p2
    );
  }

  /**
   * Find a match for 2 players in a group.
   * The order of the score we return is important.
   * Since we only store 1 version of the pair
   * (
   *    ex: we store (a, b) but not (b, a)
   * )
   * then we need to check for both cases (a, b) and (b, a)
   * by swapping them manually. We also need to swap the score
   * returned based on the ordering that we found the match so
   * that the input's p1 is always returned first.
   */
  matchScore(g: TournamentGroup, p1: number, p2: number): number[] {
    if (p1 === p2) {
      return undefined;
    }
    let match = g.matches.find(
      (m: Match) => m.player1_id === p1 && m.player2_id === p2
    );
    if (match) {
      return [match.player1_count_sets_won, match.player2_count_sets_won];
    }

    match = g.matches.find(
      (m: Match) => m.player1_id === p2 && m.player2_id === p1
    );
    return [match.player2_count_sets_won, match.player1_count_sets_won];
  }
}
