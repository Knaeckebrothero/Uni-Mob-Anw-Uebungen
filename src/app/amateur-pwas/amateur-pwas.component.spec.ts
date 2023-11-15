import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmateurPwasComponent } from './amateur-pwas.component';

describe('AmateurPwasComponent', () => {
  let component: AmateurPwasComponent;
  let fixture: ComponentFixture<AmateurPwasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmateurPwasComponent]
    });
    fixture = TestBed.createComponent(AmateurPwasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
