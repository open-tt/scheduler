import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtCoachCardComponent } from './tt-coach-card.component';

describe('TtCoachCardComponent', () => {
  let component: TtCoachCardComponent;
  let fixture: ComponentFixture<TtCoachCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtCoachCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtCoachCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
