import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend , ResponseOptions, Response} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { WindowRefService } from '../../services/window-ref.service';
import { ApiHelperService } from '../../services/api-helper.service';
import { BugSearchService } from './bug-search.service';

describe('BugSearchService', () => {
  let spy: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BugSearchService, ApiHelperService, WindowRefService, ConnectionBackend, MockBackend]
    });
  });

  it('should be created', inject([BugSearchService], (service: BugSearchService) => {
    expect(service).toBeTruthy();
  }));


  it('should call getBugIdsSearch', inject([BugSearchService, ApiHelperService, MockBackend],
    (service: BugSearchService, apiHelperService: ApiHelperService, backend: MockBackend) => {
  service.getBugIdsSearch('110');
   const avilableList = {'query': '110', 'results': [{'name': '11004', 'type': 'suggest'}, {'name': '1000420', 'type': 'suggest'}]};
   spy = spyOn(apiHelperService, 'get').and.returnValue({ subscribe: () => {} });
   service.getBugIdsSearch('110');
   expect(apiHelperService.get).toHaveBeenCalled();
  }));

  it('should call getKeywordsSearch', inject([BugSearchService, ApiHelperService, MockBackend],
     (service: BugSearchService, apiHelperService: ApiHelperService, backend: MockBackend) => {
    service.getKeywordsSearch('fas');
      const avilableList = {'query': 'fas', 'results': [{'name': 'fas 2000', 'type': 'suggest'}, {'name': 'fas 2209', 'type': 'suggest'}]};
      /* backend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(avilableList)
          })))
        });*/
     spy = spyOn(apiHelperService, 'get').and.returnValue({ subscribe: () => { } });
     service.getKeywordsSearch('fas');
     expect(apiHelperService.get).toHaveBeenCalled();
    }));

});
