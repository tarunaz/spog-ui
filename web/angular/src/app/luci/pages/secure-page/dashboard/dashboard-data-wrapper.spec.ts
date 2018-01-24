import { TestBed, inject } from '@angular/core/testing';

import { DashboardDataWrapper } from './dashboard-data-wrapper';

describe('DashboardDataWrapper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardDataWrapper]
    });
  });

  it('should be created', inject([DashboardDataWrapper], (service: DashboardDataWrapper) => {
    expect(service).toBeTruthy();
  }));
});
