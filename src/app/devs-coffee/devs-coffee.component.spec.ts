import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevsCoffeeComponent } from './devs-coffee.component';

describe('DevsCoffeeComponent', () => {
  let component: DevsCoffeeComponent;
  let fixture: ComponentFixture<DevsCoffeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevsCoffeeComponent]
    });
    fixture = TestBed.createComponent(DevsCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
