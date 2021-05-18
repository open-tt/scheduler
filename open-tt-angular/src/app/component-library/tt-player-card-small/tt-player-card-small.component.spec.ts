import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtPlayerCardSmallComponent } from './tt-player-card-small.component';

describe('TtPlayerCardSmallComponent', () => {
  let component: TtPlayerCardSmallComponent;
  let fixture: ComponentFixture<TtPlayerCardSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtPlayerCardSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtPlayerCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
