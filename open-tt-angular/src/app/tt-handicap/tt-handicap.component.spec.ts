import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtHandicapComponent } from './tt-handicap.component';

describe('TtHandicapComponent', () => {
  let component: TtHandicapComponent;
  let fixture: ComponentFixture<TtHandicapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtHandicapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtHandicapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
