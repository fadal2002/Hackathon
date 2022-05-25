import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerRegistrationComponent } from './scanner-registration.component';

describe('ScannerRegistrationComponent', () => {
  let component: ScannerRegistrationComponent;
  let fixture: ComponentFixture<ScannerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
