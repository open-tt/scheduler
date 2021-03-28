import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTournamentGroupComponent } from './tt-tournament-group.component';

describe('TtTournamentGroupComponent', () => {
  let component: TtTournamentGroupComponent;
  let fixture: ComponentFixture<TtTournamentGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtTournamentGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtTournamentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
