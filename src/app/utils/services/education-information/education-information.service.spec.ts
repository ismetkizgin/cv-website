import { TestBed } from '@angular/core/testing';

import { EducationInformationService } from './education-information.service';

describe('EducationInformationService', () => {
  let service: EducationInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
