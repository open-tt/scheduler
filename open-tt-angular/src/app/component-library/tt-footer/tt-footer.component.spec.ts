import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtFooterComponent } from './tt-footer.component';

describe('FooterComponent', () => {
  let component: TtFooterComponent;
  let fixture: ComponentFixture<TtFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtFooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
