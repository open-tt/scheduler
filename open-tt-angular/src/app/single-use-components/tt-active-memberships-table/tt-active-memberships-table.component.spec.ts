import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtActiveMembershipsTableComponent } from './tt-active-memberships-table.component';

describe('TtActiveMembershipsTableComponent', () => {
  let component: TtActiveMembershipsTableComponent;
  let fixture: ComponentFixture<TtActiveMembershipsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtActiveMembershipsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtActiveMembershipsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
