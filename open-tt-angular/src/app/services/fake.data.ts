import {HandicapTournament, Match, MatchSet, TournamentGroup, TournamentStage} from '../models/tournament';
import {delay} from 'rxjs/operators';
import {Player} from '../models/player';
import * as faker from 'faker';
import {NgttMatch} from '../component-library/tt-tournament-match/tt-tournament-match.component';
import {NgttRound, NgttTournament} from 'ng-tournament-tree';

export class FakeHandicapTournamentApi {
  static playerDatabase: Player[] = [];
  static NEXT_TOURNAMENT_ID = 1;
  static NEXT_PLAYER_ID = 1;
  static createNewHandicapTournament(): HandicapTournament {
    delay(1000);
    const id = this.NEXT_TOURNAMENT_ID;
    this.NEXT_TOURNAMENT_ID += 1;
    return {
      id: this.NEXT_TOURNAMENT_ID,
      date: new Date(),
      players: [],
      groups: [],
      waitingList: [],
      stage: TournamentStage.REGISTRATION,
      playoff: undefined,
      ended: false,
      inprogress: false,
    };
  }
  static getPlayer(playerID): Player {
    delay(1000);
    return this.playerDatabase.find(player => player.id === playerID);
  }
  static createPlayer(name: string, rating: number, usattid: string): Player {
    delay(1000);
    const id = this.NEXT_PLAYER_ID;
    this.NEXT_PLAYER_ID += 1;
    const player: Player = {
      id,
      name,
      rating,
      USATTID: usattid,
      handicap: FakeUserData.calcHandicap(rating),
    };
    this.playerDatabase.push(player);
    return player;
  }
  static decomposeInGroups(total: number, min: number, max: number): number[] {
    if (total < min) {
      return [];
    }
    if (total >= min && total <= max) {
      return [total];
    }
    for (let i = max; i >= min; i--) {
      const arr = FakeHandicapTournamentApi.decomposeInGroups(total - i, min, max);
      if (arr.length > 0) {
        return [i].concat(arr);
      }
    }
    return [];
  }
}

export class FakeUserData {
  public players: Player[] = [];
  constructor() {
    for ( let i = 1; i <= 30; i++) {
      const rating = faker.random.number({min: 800, max: 2400});
      this.players.push(
        {
          id: i,
          name: faker.name.findName(),
          userID: faker.internet.email(),
          rating,
          handicap: FakeUserData.calcHandicap(rating)
        }
      );
    }
  }

  static calcHandicap(rating: number): number {
    return -1 * Math.round(
      Math.max(
        Math.min(
          8,
          (rating - 1900) / 100
        ),
        -8
      )
    );
  }
}

export const round1: NgttMatch[] = [
  {
    player1: 'Lester Hartmann',
    player2: 'Sarah Botsford',
  }, {
    player1: 'Mike Rolfson',
    player2: '',
  }, {
    player1: 'Brendan Okuneva',
    player2: '',
  }, {
    player1: 'Mary Abshire',
    player2: '',
  }, {
    player1: 'Joan Langosh Dvm',
    player2: '',
  }, {
    player1: 'Tyrone Hettinger',
    player2: '',
  }, {
    player1: 'Donald Kunze',
    player2: '',
  }, {
    player1: 'Karen Herman',
    player2: 'Pat Berge',
  }
];

export const round2: NgttMatch[] = [
  {
    player1: 'Lester Hartmann',
    player2: 'Mike Rolfson',
  }, {
    player1: 'Brendan Okuneva',
    player2: 'Mary Abshire',
  }, {
    player1: 'Joan Langosh Dvm',
    player2: 'Tyrone Hettinger',
  }, {
    player1: 'Donald Kunze',
    player2: 'Karen Herman',
  }
];

export const round3: NgttMatch[] = [
  {
    player1: 'Lester Hartmann',
    player2: 'Mary Abshire',
  }, {
    player1: 'Joan Langosh Dvm',
    player2: 'Karen Herman',
  }
];

export const testRounds: NgttRound[] = [
  {
    type: 'Winnerbracket',
    matches: round1
  }, {
    type: 'Winnerbracket',
    matches: round2
  }, {
    type: 'Winnerbracket',
    matches: round3
  }, {
    type: 'Final',
    matches: [{
      player1: 'Lester Hartmann',
      player2: 'Joan Langosh Dvm',
    }]
  }
];

export class FakePlayerData {
  static createPlayers(total: number): Player[] {
    const players: Player[] = [];
    for (let i = 0; i < total; i++) {
      const rating = faker.random.number({min: 800, max: 2400});
      players.push({
        id: faker.random.number({min: 1, max: 1000000}),
        name: faker.name.findName(),
        userID: faker.internet.email(),
        rating,
        handicap: FakeUserData.calcHandicap(rating)
      });
    }
    return players;
  }

  static createGroups(players: Player[]): TournamentGroup[] {
    const groupSizes = FakeHandicapTournamentApi.decomposeInGroups(
      players.length,
      3,
      4
    );
    const groups: TournamentGroup[] = [];
    let groupPlayers: Player[] = [];
    let groupIndex = 0;
    players.forEach(player => {
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

    return groups;
  }

  static fixMatches(players: Player[]): Match[] {
    const matches: Match[] = [];
    players.forEach(p1 => {
      players.forEach(p2 => {
        if (p1.name !== p2.name) {
          const match: Match = new Match(
            p1,
            p2,
            FakePlayerData.fakeSets(),
          );
          matches.push(match);
        }
      });
    });
    return matches;
  }

  static fakeSets(): MatchSet[] {
    const sets: MatchSet[] = [];
    const losserScore = faker.random.number({min: 1, max: 9});
    for (let i = 0; i < 5; i++) {
      let set: MatchSet;
      if (faker.random.number({min: 1, max: 2}) === 1) {
        set = new MatchSet(11, losserScore);
      } else {
        set = new MatchSet(losserScore, 3);
      }
      sets.push(set);
    }
    return sets;
  }

  static createPlayoffs(groups: TournamentGroup[]): NgttTournament {
    return {
      rounds: testRounds,
    };
    const players: Player[] = [];
    groups.forEach(g => {
      players.push(g.players[0]);
      players.push(g.players[1]);
    });
    let base = 16;
    let totalRounds = 4;
    if (groups.length <= 4 && groups.length > 2) {
      base = 8;
      totalRounds = 3;
    } else if (groups.length === 2) {
      base = 4;
      totalRounds = 2;
    } else if (groups.length === 1) {
      base = 2;
      totalRounds = 1;
    }
    const rounds: NgttRound[] = [];
    for (let i = 0; i < totalRounds; i++) {
      const newRound: NgttRound = {
        type: i === totalRounds - 1 ? 'Final' : 'Winnerbracket',
        matches: [],
      };
      const matches: NgttMatch[] = [];
      for (let _ = 0; _ < base; _++) {
        matches.push(undefined);
      }
      const usedSet: Set<number> = new Set([-1]);
      players.forEach(p => {
        let num = -1;
        while (usedSet.has(num)) {
          num = faker.random.number({min: 0, max: base - 1});
          if (num === undefined) {
          }
        }
        usedSet.add(num);
        if (!matches[num]) {
          matches[num] = {
            player1: p.name,
            player2: undefined,
          };
        } else if (!matches[num].player2) {
          matches[num].player2 = p.name;
        }
      });
      base /= 2;
      newRound.matches = matches;
      rounds.push(newRound);
    }
    const playoffsData: NgttTournament = {
      rounds,
    };
    return playoffsData;
  }
}

export class FakeTournamentData {
  players1 = FakePlayerData.createPlayers(19);
  players2 = FakePlayerData.createPlayers(9);
  players3 = FakePlayerData.createPlayers(24);

  groups1 = FakePlayerData.createGroups(this.players1);
  groups2 = FakePlayerData.createGroups(this.players2);
  groups3 = FakePlayerData.createGroups(this.players3);
  tournaments: HandicapTournament[] = [
    {
      id: 1,
      date: new Date(new Date().setDate(new Date().getDate() - 21)),
      players: this.players1,
      groups: this.groups1,
      stage: TournamentStage.END,
      playoff: FakePlayerData.createPlayoffs(this.groups1),
      ended: true
    }, {
      id: 2,
      date: new Date(new Date().setDate(new Date().getDate() - 14)),
      players: this.players2,
      groups: this.groups2,
      stage: TournamentStage.END,
      playoff: FakePlayerData.createPlayoffs(this.groups2),
      ended: true
    }, {
      id: 3,
      date: new Date(new Date().setDate(new Date().getDate() - 7)),
      players: this.players3,
      groups: this.groups3,
      playoff: FakePlayerData.createPlayoffs(this.groups3),
      stage: TournamentStage.END,
      ended: true
    },
  ].reverse();
}
