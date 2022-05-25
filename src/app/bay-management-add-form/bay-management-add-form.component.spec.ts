import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BayManagementAddFormComponent } from './bay-management-add-form.component';

describe('BayManagementAddFormComponent', () => {
  let component: BayManagementAddFormComponent;
  let fixture: ComponentFixture<BayManagementAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BayManagementAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BayManagementAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
