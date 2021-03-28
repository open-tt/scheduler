import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtLabeledEditComponent } from './tt-labeled-edit.component';

describe('TtLabeledEditComponent', () => {
  let component: TtLabeledEditComponent;
  let fixture: ComponentFixture<TtLabeledEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtLabeledEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtLabeledEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
