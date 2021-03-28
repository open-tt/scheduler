import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtMatchResultCellComponent } from './tt-match-result-cell.component';

describe('TtMatchResultCellComponent', () => {
  let component: TtMatchResultCellComponent;
  let fixture: ComponentFixture<TtMatchResultCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtMatchResultCellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtMatchResultCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
