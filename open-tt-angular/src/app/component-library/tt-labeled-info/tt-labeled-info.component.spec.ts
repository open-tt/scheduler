import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtLabeledInfoComponent } from './tt-labeled-info.component';

describe('TtLabeledInfoComponent', () => {
  let component: TtLabeledInfoComponent;
  let fixture: ComponentFixture<TtLabeledInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtLabeledInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtLabeledInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
