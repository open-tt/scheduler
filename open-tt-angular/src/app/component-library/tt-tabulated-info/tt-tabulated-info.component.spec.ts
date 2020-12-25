import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTabulatedInfoComponent } from './tt-tabulated-info.component';

describe('TtTabulatedInfoComponent', () => {
  let component: TtTabulatedInfoComponent;
  let fixture: ComponentFixture<TtTabulatedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtTabulatedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtTabulatedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
