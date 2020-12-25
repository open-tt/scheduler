import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtInfoCardComponent } from './tt-info-card.component';

describe('TtInfoCardComponent', () => {
  let component: TtInfoCardComponent;
  let fixture: ComponentFixture<TtInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
