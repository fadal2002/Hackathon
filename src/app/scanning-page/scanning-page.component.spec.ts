import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanningPageComponent } from './scanning-page.component';

describe('ScanningPageComponent', () => {
  let component: ScanningPageComponent;
  let fixture: ComponentFixture<ScanningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanningPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
