import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtPlayerHandicapTableComponent } from './tt-player-handicap-table.component';

describe('TtPlayerHandicapTableComponent', () => {
  let component: TtPlayerHandicapTableComponent;
  let fixture: ComponentFixture<TtPlayerHandicapTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtPlayerHandicapTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtPlayerHandicapTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
