import { TestBed, inject } from '@angular/core/testing';

import { PreLoginService } from './pre-login.service';

describe('PreLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreLoginService]
    });
  });

  it('should be created', inject([PreLoginService], (service: PreLoginService) => {
    expect(service).toBeTruthy();
  }));
});
