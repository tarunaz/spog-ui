import { TestBed, inject } from '@angular/core/testing';

import { AseCornerService } from './ase-corner.service';

describe('AseCornerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AseCornerService]
    });
  });

  it('should be created', inject([AseCornerService], (service: AseCornerService) => {
    expect(service).toBeTruthy();
  }));
});
