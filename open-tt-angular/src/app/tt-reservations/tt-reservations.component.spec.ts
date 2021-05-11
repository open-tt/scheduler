import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtReservationsComponent } from './tt-reservations.component';

describe('TtReservationsComponent', () => {
  let component: TtReservationsComponent;
  let fixture: ComponentFixture<TtReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
