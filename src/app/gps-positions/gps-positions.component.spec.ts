import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsPositionsComponent } from './gps-positions.component';

describe('GpsPositionsComponent', () => {
  let component: GpsPositionsComponent;
  let fixture: ComponentFixture<GpsPositionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GpsPositionsComponent]
    });
    fixture = TestBed.createComponent(GpsPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
