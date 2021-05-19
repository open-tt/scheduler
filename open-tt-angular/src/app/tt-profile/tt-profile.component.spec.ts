import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtProfileComponent } from './tt-profile.component';

describe('TtProfileComponent', () => {
  let component: TtProfileComponent;
  let fixture: ComponentFixture<TtProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
