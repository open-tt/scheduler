import {TournamentService} from './tournament.service';
import {FakeHandicapTournamentApi} from './fake.data';
import {TestBed} from '@angular/core/testing';

describe('TournamentService', () => {
  let service: TournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decompose in factors', () => {
    const dataProvider = [
      {
        input: [9, 3, 5],
        output: [5, 4]
      }, {
        input: [9, 3, 4],
        output: [3, 3, 3]
      }, {
        input: [10, 3, 4],
        output: [4, 3, 3]
      }, {
        input: [11, 3, 4],
        output: [4, 4, 3]
      }, {
        input: [11, 3, 5],
        output: [5, 3, 3]
      }, {
        input: [4, 3, 5],
        output: [4]
      }, {
        input: [6, 3, 4],
        output: [3, 3]
      },
    ];
    dataProvider.forEach(data => {
      expect(
        FakeHandicapTournamentApi.decomposeInGroups(data.input[0], data.input[1], data.input[2])
      ).toEqual(data.output);
    });
  });

  // it('should create handicap tournament', () => {
  //   service.createNewHandicapTournament().subscribe(tour => {
  //     expect(tour.id).toBeInstanceOf(Number);
  //   });
  // });

  // it('should add player to tournament', () => {
  //   const player: Player = {
  //     id: 1,
  //     name: faker.name.findName(),
  //     rating: faker.random.number({min: 800, max: 2400}),
  //     USATTID: undefined,
  //   };
  //
  //   service.createNewHandicapTournament().subscribe(tour => {
  //     expect(tour.id).toBeInstanceOf(Number);
  //   });
  // });
});
