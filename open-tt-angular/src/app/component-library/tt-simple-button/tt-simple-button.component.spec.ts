import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtSimpleButtonComponent } from './tt-simple-button.component';

describe('TtSimpleButtonComponent', () => {
  let component: TtSimpleButtonComponent;
  let fixture: ComponentFixture<TtSimpleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtSimpleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtSimpleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
