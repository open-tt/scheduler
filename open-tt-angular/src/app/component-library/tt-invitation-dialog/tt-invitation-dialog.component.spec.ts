import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtInvitationDialogComponent } from './tt-invitation-dialog.component';

describe('TtInvitationDialogComponent', () => {
  let component: TtInvitationDialogComponent;
  let fixture: ComponentFixture<TtInvitationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtInvitationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtInvitationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
