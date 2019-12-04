import { TestBed } from '@angular/core/testing';

import { AccessUserService } from './access-user.service';

describe('AccessUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessUserService = TestBed.get(AccessUserService);
    expect(service).toBeTruthy();
  });
});
