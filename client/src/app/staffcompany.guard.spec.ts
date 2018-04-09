import { TestBed, async, inject } from '@angular/core/testing';

import { StaffcompanyGuard } from './staffcompany.guard';

describe('StaffcompanyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffcompanyGuard]
    });
  });

  it('should ...', inject([StaffcompanyGuard], (guard: StaffcompanyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
