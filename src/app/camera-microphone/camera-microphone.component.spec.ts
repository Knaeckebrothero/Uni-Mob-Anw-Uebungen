import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraMicrophoneComponent } from './camera-microphone.component';

describe('CameraMicrophoneComponent', () => {
  let component: CameraMicrophoneComponent;
  let fixture: ComponentFixture<CameraMicrophoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraMicrophoneComponent]
    });
    fixture = TestBed.createComponent(CameraMicrophoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
