import { TestBed } from '@angular/core/testing';

import { PersonalInformationService } from './personal-information.service';

describe('PersonalInformationService', () => {
  let service: PersonalInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
