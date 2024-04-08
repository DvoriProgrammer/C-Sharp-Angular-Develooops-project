import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { addDailyQuestionGuard } from './add-daily-question.guard';

describe('addDailyQuestionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => addDailyQuestionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
