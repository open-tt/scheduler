import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtMatchResultDialogComponent } from './tt-match-result-dialog.component';

describe('TtMatchResultDialogComponent', () => {
  let component: TtMatchResultDialogComponent;
  let fixture: ComponentFixture<TtMatchResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtMatchResultDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtMatchResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
