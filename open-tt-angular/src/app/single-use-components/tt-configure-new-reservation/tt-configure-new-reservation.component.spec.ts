import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtConfigureNewReservationComponent } from './tt-configure-new-reservation.component';

describe('TtConfigureNewReservationComponent', () => {
  let component: TtConfigureNewReservationComponent;
  let fixture: ComponentFixture<TtConfigureNewReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtConfigureNewReservationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtConfigureNewReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
