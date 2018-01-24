import { TestBed, inject } from '@angular/core/testing';

import { ActiveiqService } from './activeiq.service';

describe('ActiveiqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveiqService]
    });
  });

  it('should be created', inject([ActiveiqService], (service: ActiveiqService) => {
    expect(service).toBeTruthy();
  }));
});
