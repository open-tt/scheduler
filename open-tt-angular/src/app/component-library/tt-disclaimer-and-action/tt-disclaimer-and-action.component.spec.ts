import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtDisclaimerAndActionComponent } from './tt-disclaimer-and-action.component';

describe('TtDisclaimerAndActionComponent', () => {
  let component: TtDisclaimerAndActionComponent;
  let fixture: ComponentFixture<TtDisclaimerAndActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtDisclaimerAndActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtDisclaimerAndActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
