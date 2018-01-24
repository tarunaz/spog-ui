import { TestBed, inject } from '@angular/core/testing';

import { SystemDetailsApiService } from './system-details-api.service';

describe('DashboardapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemDetailsApiService]
    });
  });

  it('should be created', inject([SystemDetailsApiService], (service: SystemDetailsApiService) => {
    expect(service).toBeTruthy();
  }));
});
