import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uebung3LocationComponent } from './uebung-3-location.component';

describe('Uebung3LocationComponent', () => {
  let component: Uebung3LocationComponent;
  let fixture: ComponentFixture<Uebung3LocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Uebung3LocationComponent]
    });
    fixture = TestBed.createComponent(Uebung3LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
