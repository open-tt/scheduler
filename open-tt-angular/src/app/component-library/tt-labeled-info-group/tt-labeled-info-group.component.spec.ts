import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtLabeledInfoGroupComponent } from './tt-labeled-info-group.component';

describe('TtLabeledInfoGroupComponent', () => {
  let component: TtLabeledInfoGroupComponent;
  let fixture: ComponentFixture<TtLabeledInfoGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtLabeledInfoGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtLabeledInfoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
