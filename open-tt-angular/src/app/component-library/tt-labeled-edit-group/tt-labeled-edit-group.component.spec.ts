import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtLabeledEditGroupComponent } from './tt-labeled-edit-group.component';

describe('TtLabeledEditGroupComponent', () => {
  let component: TtLabeledEditGroupComponent;
  let fixture: ComponentFixture<TtLabeledEditGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtLabeledEditGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtLabeledEditGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
