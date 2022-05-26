import { TestBed } from '@angular/core/testing';

import { AddBayService } from './add-bay.service';

describe('AddBayService', () => {
  let service: AddBayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
