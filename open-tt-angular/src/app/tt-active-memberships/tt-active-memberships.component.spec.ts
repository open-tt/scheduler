import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtActiveMembershipsComponent } from './tt-active-memberships.component';

describe('TtActiveMembershipsComponent', () => {
  let component: TtActiveMembershipsComponent;
  let fixture: ComponentFixture<TtActiveMembershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtActiveMembershipsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtActiveMembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
