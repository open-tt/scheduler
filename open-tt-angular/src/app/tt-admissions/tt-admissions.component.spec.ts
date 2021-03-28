import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtAdmissionsComponent } from './tt-admissions.component';

describe('TtAdmissionsComponent', () => {
  let component: TtAdmissionsComponent;
  let fixture: ComponentFixture<TtAdmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtAdmissionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
