import { TestBed, inject } from '@angular/core/testing';

import { ContractserviceService } from './contractservice.service';

describe('ContractserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractserviceService]
    });
  });

  it('should be created', inject([ContractserviceService], (service: ContractserviceService) => {
    expect(service).toBeTruthy();
  }));
});
