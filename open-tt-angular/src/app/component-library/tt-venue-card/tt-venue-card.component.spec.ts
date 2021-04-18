import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtVenueCardComponent } from './tt-venue-card.component';

describe('TtVenueCardComponent', () => {
  let component: TtVenueCardComponent;
  let fixture: ComponentFixture<TtVenueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtVenueCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtVenueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
