import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtReservationCardSmallComponent } from './tt-reservation-card-small.component';

describe('TtReservationCardSmallComponent', () => {
  let component: TtReservationCardSmallComponent;
  let fixture: ComponentFixture<TtReservationCardSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtReservationCardSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtReservationCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
