import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtHomeComponent } from './tt-home.component';

describe('TtHomeComponent', () => {
  let component: TtHomeComponent;
  let fixture: ComponentFixture<TtHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
