import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtPlayerCardComponent } from './tt-player-card.component';

describe('TtPlayerCardComponent', () => {
  let component: TtPlayerCardComponent;
  let fixture: ComponentFixture<TtPlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtPlayerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtPlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
