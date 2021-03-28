import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtActionsTableComponent } from './tt-actions-table.component';

describe('TtActionsTableComponent', () => {
  let component: TtActionsTableComponent;
  let fixture: ComponentFixture<TtActionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtActionsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtActionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
