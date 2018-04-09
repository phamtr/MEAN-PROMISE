import { TestBed, inject } from '@angular/core/testing';

import { AdminguardService } from './adminguard.guard';

describe('AdminguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminguardService]
    });
  });

  it('should be created', inject([AdminguardService], (service: AdminguardService) => {
    expect(service).toBeTruthy();
  }));
});
