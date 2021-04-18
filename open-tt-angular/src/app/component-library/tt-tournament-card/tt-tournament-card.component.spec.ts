import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTournamentCardComponent } from './tt-tournament-card.component';

describe('TtTournamentCardComponent', () => {
  let component: TtTournamentCardComponent;
  let fixture: ComponentFixture<TtTournamentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtTournamentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtTournamentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
