import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtLabeledInputTextComponent } from './tt-labeled-input-text.component';

describe('TtLabeledInputTextComponent', () => {
  let component: TtLabeledInputTextComponent;
  let fixture: ComponentFixture<TtLabeledInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtLabeledInputTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtLabeledInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
