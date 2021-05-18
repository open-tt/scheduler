import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtWrapperThemeLargeComponent } from './tt-wrapper-theme-large.component';

describe('TtWrapperThemeLargeComponent', () => {
  let component: TtWrapperThemeLargeComponent;
  let fixture: ComponentFixture<TtWrapperThemeLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtWrapperThemeLargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtWrapperThemeLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
