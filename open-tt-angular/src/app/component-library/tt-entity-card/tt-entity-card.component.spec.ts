import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtEntityCardComponent } from './tt-entity-card.component';

describe('TtEntityCardComponent', () => {
  let component: TtEntityCardComponent;
  let fixture: ComponentFixture<TtEntityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtEntityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtEntityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
