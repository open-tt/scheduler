import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtGroupPlayerComponent } from './tt-group-player.component';

describe('TtGroupPlayerComponent', () => {
  let component: TtGroupPlayerComponent;
  let fixture: ComponentFixture<TtGroupPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtGroupPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtGroupPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
