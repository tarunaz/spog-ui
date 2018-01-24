import { TestBed, inject } from '@angular/core/testing';

import { OrderstatusService } from './order-status.service';

describe('OrderstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderstatusService]
    });
  });

  it('should be created', inject([OrderstatusService], (service: OrderstatusService) => {
    expect(service).toBeTruthy();
  }));
  it('function should return something', inject([OrderstatusService], (service: OrderstatusService) => {
    expect(service.getOrderStatusService).toBeTruthy();
  }));
});
