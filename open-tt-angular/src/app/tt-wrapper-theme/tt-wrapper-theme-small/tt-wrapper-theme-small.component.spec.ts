import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtWrapperThemeSmallComponent } from './tt-wrapper-theme-small.component';

describe('TtWrapperThemeSmallComponent', () => {
  let component: TtWrapperThemeSmallComponent;
  let fixture: ComponentFixture<TtWrapperThemeSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtWrapperThemeSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtWrapperThemeSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
