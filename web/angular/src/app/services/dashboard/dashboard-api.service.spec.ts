import { TestBed, inject } from '@angular/core/testing';

import { DashboardApiService } from './dashboard-api.service';

describe('DashboardapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardApiService]
    });
  });

  it('should be created', inject([DashboardApiService], (service: DashboardApiService) => {
    expect(service).toBeTruthy();
  }));
});
