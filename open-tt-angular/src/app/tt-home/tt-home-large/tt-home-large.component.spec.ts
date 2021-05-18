import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtHomeLargeComponent } from './tt-home-large.component';

describe('TtHomeLargeComponent', () => {
  let component: TtHomeLargeComponent;
  let fixture: ComponentFixture<TtHomeLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtHomeLargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtHomeLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
