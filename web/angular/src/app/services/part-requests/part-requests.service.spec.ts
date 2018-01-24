import { TestBed, inject } from '@angular/core/testing';

import { PartRequestsService } from './part-requests.service';

describe('PartRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartRequestsService]
    });
  });

  it('should be created', inject([PartRequestsService], (service: PartRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
