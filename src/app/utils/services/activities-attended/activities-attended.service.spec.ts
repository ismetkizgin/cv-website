import { TestBed } from '@angular/core/testing';

import { ActivitiesAttendedService } from './activities-attended.service';

describe('ActivitiesAttendedService', () => {
  let service: ActivitiesAttendedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiesAttendedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
