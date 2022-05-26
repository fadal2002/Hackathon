import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BayManagementComponent } from './bay-management.component';

describe('BayManagementComponent', () => {
  let component: BayManagementComponent;
  let fixture: ComponentFixture<BayManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BayManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BayManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
