import { TestBed, inject } from '@angular/core/testing';

import { MongoTestapiService } from './mongo-testapi.service';

describe('MongoTestapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MongoTestapiService]
    });
  });

  it('should be created', inject([MongoTestapiService], (service: MongoTestapiService) => {
    expect(service).toBeTruthy();
  }));
});
