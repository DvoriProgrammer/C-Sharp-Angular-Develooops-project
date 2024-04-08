import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkUserGuard } from './check-user.guard';

describe('checkUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
