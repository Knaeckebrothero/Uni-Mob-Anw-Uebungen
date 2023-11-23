import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryStatusComponent } from './battery-status.component';

describe('BatteryStatusComponent', () => {
  let component: BatteryStatusComponent;
  let fixture: ComponentFixture<BatteryStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatteryStatusComponent]
    });
    fixture = TestBed.createComponent(BatteryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
