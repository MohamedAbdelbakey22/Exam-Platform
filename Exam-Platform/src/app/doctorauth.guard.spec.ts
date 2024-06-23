import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { doctorauthGuard } from './doctorauth.guard';

describe('doctorauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => doctorauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
