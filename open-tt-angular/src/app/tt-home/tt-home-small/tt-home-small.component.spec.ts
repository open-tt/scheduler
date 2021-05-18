import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtHomeSmallComponent } from './tt-home-small.component';

describe('TtHomeSmallComponent', () => {
  let component: TtHomeSmallComponent;
  let fixture: ComponentFixture<TtHomeSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtHomeSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtHomeSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
