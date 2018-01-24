import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { Http, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend, ResponseOptions, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { WindowRefService } from '../../services/window-ref.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { BugSearchDataWrapper } from './bug-search-data-wrapper';
import { BugSearchService } from '../../services/bug-search/bug-search.service';
import { SpogUtils } from '../../common/spog-utils';
import { ApiHelperService } from '../../services/api-helper.service';
let apiService: ApiHelperService;


describe('BugSearchDataWrapper', () => {
    let spyOnAdd: jasmine.Spy;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [BugSearchDataWrapper, BugSearchService, SpogUtils,
                ApiHelperService, ConnectionBackend, WindowRefService, MockBackend]
        });
        apiService = TestBed.get(ApiHelperService);
    });

    it('should be created', inject([BugSearchDataWrapper], (service: BugSearchDataWrapper) => {
        expect(service).toBeTruthy();
    }));

    it('should get key word search result from ApiHelperService ',
        inject([BugSearchDataWrapper, ApiHelperService, MockBackend],
            fakeAsync((wrapper: BugSearchDataWrapper, ser: ApiHelperService, mockBackend: MockBackend) => {
                const avilableList = {
                    'query': 'fas',
                    'statusCode': 200,
                    'results': [{ 'name': 'fas01', 'type': 'suggest' },
                    { 'name': 'fas02', 'type': 'suggest' }]
                };
                spyOnAdd = spyOn(apiService, 'get').and.returnValue(Observable.of(avilableList));
                let res: any;
                wrapper.getKeywordsSearch('fas');
                apiService.get('fas').subscribe((response) => {
                    res = response;
                });
                tick();
                expect(res['results'][0].name).toBe('fas01');
            }))
    );

    it('should get Bug Id search result from ApiHelperService ',
        inject([BugSearchDataWrapper, ApiHelperService, MockBackend],
            fakeAsync((wrapper: BugSearchDataWrapper, ser: ApiHelperService, mockBackend: MockBackend) => {
                const avilableList = {
                    'query': '101',
                    'statusCode': 200,
                    'results': [{ 'NABUGID': '10104' },
                    { 'NABUGID': '10103' }]
                };
                spyOnAdd = spyOn(apiService, 'get').and.returnValue(Observable.of(avilableList));
                let res: any;
                wrapper.getBugIdsSearch('101');
                apiService.get('101').subscribe((response) => {
                    res = response;
                });
                tick();
                expect(res['results'][0].NABUGID).toBe('10104');
            }))
    );

});
