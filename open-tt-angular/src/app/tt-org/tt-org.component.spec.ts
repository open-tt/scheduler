import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtOrgComponent } from './tt-org.component';

describe('TtOrgComponent', () => {
  let component: TtOrgComponent;
  let fixture: ComponentFixture<TtOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
