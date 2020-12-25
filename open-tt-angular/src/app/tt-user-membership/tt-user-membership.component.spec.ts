import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtUserMembershipComponent } from './tt-user-membership.component';

describe('TtUserMembershipComponent', () => {
  let component: TtUserMembershipComponent;
  let fixture: ComponentFixture<TtUserMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtUserMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtUserMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
