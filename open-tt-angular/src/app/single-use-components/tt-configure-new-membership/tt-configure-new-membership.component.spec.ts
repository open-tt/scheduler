import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtConfigureNewMembershipComponent } from './tt-configure-new-membership.component';

describe('TtConfigureNewMembershipComponent', () => {
  let component: TtConfigureNewMembershipComponent;
  let fixture: ComponentFixture<TtConfigureNewMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtConfigureNewMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtConfigureNewMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
