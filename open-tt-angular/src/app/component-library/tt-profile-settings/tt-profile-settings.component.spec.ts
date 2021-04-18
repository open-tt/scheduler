import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtProfileSettingsComponent } from './tt-profile-settings.component';

describe('TtProfileSettingsComponent', () => {
  let component: TtProfileSettingsComponent;
  let fixture: ComponentFixture<TtProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtProfileSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
