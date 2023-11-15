import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsHotCoffeeComponent } from './devs-hot-coffee.component';

describe('DevsHotCoffeeComponent', () => {
  let component: DevsHotCoffeeComponent;
  let fixture: ComponentFixture<DevsHotCoffeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevsHotCoffeeComponent]
    });
    fixture = TestBed.createComponent(DevsHotCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
