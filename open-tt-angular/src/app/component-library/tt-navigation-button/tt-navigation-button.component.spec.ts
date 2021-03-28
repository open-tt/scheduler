import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtNavigationButtonComponent } from './tt-navigation-button.component';

describe('TtNavigationButtonComponent', () => {
  let component: TtNavigationButtonComponent;
  let fixture: ComponentFixture<TtNavigationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtNavigationButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtNavigationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
