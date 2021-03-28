import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTournamentMatchComponent } from './tt-tournament-match.component';

describe('TournamentMatchComponent', () => {
  let component: TtTournamentMatchComponent;
  let fixture: ComponentFixture<TtTournamentMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtTournamentMatchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtTournamentMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
