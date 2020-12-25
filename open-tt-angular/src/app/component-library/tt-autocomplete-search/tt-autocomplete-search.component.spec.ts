import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtAutocompleteSearchComponent } from './tt-autocomplete-search.component';

describe('TtAutocompleteSearchComponent', () => {
  let component: TtAutocompleteSearchComponent;
  let fixture: ComponentFixture<TtAutocompleteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtAutocompleteSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtAutocompleteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
