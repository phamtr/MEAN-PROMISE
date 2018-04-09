import { TestBed, async, inject } from '@angular/core/testing';

import { LogincompanyGuard } from './logincompany.guard';

describe('LogincompanyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogincompanyGuard]
    });
  });

  it('should ...', inject([LogincompanyGuard], (guard: LogincompanyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
