import { TestBed } from '@angular/core/testing';

import { MemberShipsService } from './member-ships.service';

describe('MemberShipsService', () => {
  let service: MemberShipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberShipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
