import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, XHRBackend, ResponseOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { WindowRefService } from '../../services/window-ref.service';
import { Observable } from 'rxjs/Observable';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { BugSearchComponent } from './bug-search.component';
import { SpogAutoCompleteComponent } from '../../components/autocomplete/spog-autocomplete.component';
import { BugSearchDataWrapper } from './bug-search-data-wrapper';
import { PipeModule } from '../../components/pipe/pipe.module';
import { BugSearchService } from '../../services/bug-search/bug-search.service';
import { ApiHelperService } from '../../services/api-helper.service';
import { Constants } from '../../common/constants';
import { SpogUtils } from '../../common/spog-utils';
let dataWrapper: BugSearchDataWrapper;

describe('BugSearchComponent', () => {
  let component: BugSearchComponent;
  let fixture: ComponentFixture<BugSearchComponent>;
  let element: any;
  let spy: any;
  let spyOnAdd: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule, PipeModule.forRoot()],
      declarations: [
        BugSearchComponent,
        SpogAutoCompleteComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        BugSearchDataWrapper,
        WindowRefService,
        BugSearchService,
        ApiHelperService,
        Constants,
        SpogUtils,
        MockBackend
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugSearchComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    dataWrapper = TestBed.get(BugSearchDataWrapper);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Show the auto complete dropdown', () => {
    const avilableList = [{ 'name': '11004', 'type': 'suggest' },
    { 'name': '1000420', 'type': 'suggest' }];
    component.bugIdFilteredList = avilableList;
    fixture.detectChanges();
    expect(element.querySelector('.n-type-ahead__menu'))
      .not.toBeNull();
  });

  it('should display options in dropdown', () => {
    const avilableList = [{ 'name': '11004', 'type': 'suggest' },
    { 'name': '1000420', 'type': 'suggest' }];
    component.bugIdFilteredList = avilableList;
    fixture.detectChanges();
    const dropdownEle = element.querySelector('.display-option');
    expect(element.querySelector('.display-option'))
      .not.toBeNull();
    expect(dropdownEle.innerHTML)
      .toEqual(avilableList[0].name);
  });

  it('should get all bugs tools URL', () => {
    expect(component.allBugToolsUrl).not.toBeNull();
    expect(component.allBugToolsUrl).toEqual('https://mysupport-stg.netapp.com/NOW/cgi-bin/bol/');
  });

  it('should get bug Id search result from service ',
    inject([BugSearchDataWrapper, MockBackend], fakeAsync((dataWra: BugSearchDataWrapper, mockBackend: MockBackend) => {
      const avilableList = {
        'query': '110',
        'statusCode': 200,
        'results': [{ 'name': '11004', 'type': 'suggest' },
        { 'name': '1000420', 'type': 'suggest' }]
      };
      // Create a jasmine spy to spy on the getBugIdsSearch method
      spyOnAdd = spyOn(dataWrapper, 'getBugIdsSearch').and.returnValue(Observable.of(avilableList));
      let res: Response;
      const filter = {};
      filter['queryString'] = '101';
      component.bugIdSearch(filter);
      dataWrapper.getBugIdsSearch('101').subscribe((response) => {
        res = response;
      });
      tick();
      expect(res['results'][0].name).toBe('11004');
      expect(component.bugIdFilteredList[1].name).toBe('1000420');
    }))
  );

  it('should get bug Id search result from service with error ',
    inject([BugSearchDataWrapper, MockBackend], fakeAsync((dataWra: BugSearchDataWrapper, mockBackend: MockBackend) => {
      const avilableList = {
        'query': '110',
        'statusCode': 400,
        'results': []
      };
      // Create a jasmine spy to spy on the getBugIdsSearch method
      spyOnAdd = spyOn(dataWrapper, 'getBugIdsSearch').and.returnValue(Observable.of(avilableList));
      let res: Response;
      const filter = {};
      filter['queryString'] = '101';
      component.bugIdSearch(filter);
      dataWrapper.getBugIdsSearch('101').subscribe((response) => {
        res = response;
      });
      tick();
      expect(res['results'].length).toBe(0);
      expect(component.requiredAttrsBugId.isError).toBe(true);
    }))
  );

  it('should get bug Id search result from service with null response ',
    inject([BugSearchDataWrapper, MockBackend], fakeAsync((dataWra: BugSearchDataWrapper, mockBackend: MockBackend) => {
      spyOnAdd = spyOn(dataWrapper, 'getBugIdsSearch').and.returnValue(Observable.of(null));
      let res: Response;
      const filter = {};
      filter['queryString'] = '101';
      component.bugIdSearch(filter);
      dataWrapper.getBugIdsSearch('101').subscribe((response) => {
        res = response;
      });
      tick();
      expect(res).toBeNull();
      expect(component.bugIdFilteredList.length).toBe(0);
    }))
  );

  it('should submit keyword selected', () => {
    const filter = {};
    filter['searchVals'] = 'bug';
    spy = spyOn(component, 'onNavigate');
    component.keyWordSubmit(filter);
    expect(component.onNavigate).toHaveBeenCalled();
  });

  it('should submit single bugId selected', () => {
    const filter = {};
    filter['searchVals'] = '11001';
    spy = spyOn(component, 'onNavigate');
    component.bugIdSubmit(filter);
    expect(component.onNavigate).toHaveBeenCalled();
  });

  it('should submit multiple bugIds selected', () => {
    const filter = {};
    filter['searchVals'] = '11001, 11004';
    spy = spyOn(component, 'onNavigate');
    component.bugIdSubmit(filter);
    expect(component.onNavigate).toHaveBeenCalled();
  });


  it('should get keyword search result from service ',
    inject([BugSearchDataWrapper, MockBackend], fakeAsync((dataWra: BugSearchDataWrapper, mockBackend: MockBackend) => {
      const avilableList = {
        'query': 'fas', 'statusCode': 200,
        'results': [{ 'name': 'fas01', 'type': 'suggest' },
        { 'name': 'fas02', 'type': 'suggest' }]
      };
      spyOnAdd = spyOn(dataWrapper, 'getKeywordsSearch').and.returnValue(Observable.of(avilableList));
      let res: Response;
      const filter = {};
      filter['queryString'] = 'fas';
      component.keyWordSearch(filter);
      dataWrapper.getKeywordsSearch('fas').subscribe((response) => {
        res = response;
      });
      tick();
      expect(res['results'][0].name).toBe('fas01');
      expect(component.keyFilteredList[1].name).toBe('fas02');
    }))
  );

  it('should get keyword search result from service with error',
    inject([BugSearchDataWrapper, MockBackend], fakeAsync((dataWra: BugSearchDataWrapper, mockBackend: MockBackend) => {
      const avilableList = {
        'query': 'fas', 'statusCode': 400,
        'results': []
      };
      spyOnAdd = spyOn(dataWrapper, 'getKeywordsSearch').and.returnValue(Observable.of(avilableList));
      let res: Response;
      const filter = {};
      filter['queryString'] = 'fas';
      component.keyWordSearch(filter);
      dataWrapper.getKeywordsSearch('fas').subscribe((response) => {
        res = response;
      });
      tick();
      expect(res['results'].length).toBe(0);
      expect(component.requiredAttrsKeyWord['errorMessage']).toBe('Error in processing your Request, Please try after some time.');
    }))
  );

  it('should get keyword search result from service with null response',
    inject([BugSearchDataWrapper, MockBackend], fakeAsync((dataWra: BugSearchDataWrapper, mockBackend: MockBackend) => {
      spyOnAdd = spyOn(dataWrapper, 'getKeywordsSearch').and.returnValue(Observable.of(null));
      let res: Response;
      const filter = {};
      filter['queryString'] = 'fas';
      component.keyWordSearch(filter);
      dataWrapper.getKeywordsSearch('fas').subscribe((response) => {
        res = response;
      });
      tick();
      expect(res).toBeNull();
      expect(component.keyFilteredList.length).toBe(0);
    }))
  );

  it('should get Empty result bug Id search with empty object', () => {
    const avilableList = {
      'query': '110',
      'results': [
      ]
    };
    const spy1 = spyOn(dataWrapper, 'getBugIdsSearch').and.returnValue(Observable.of(avilableList));
    const filter = {};
    filter['queryString'] = '';
    component.bugIdSearch(filter);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.bugIdFilteredList.length).toEqual(0);
  });

  it('should get empty result keyword search empty Object', () => {
    const avilableList = {
      'query': 'fas',
      'results': [
      ]
    };
    spy = spyOn(dataWrapper, 'getKeywordsSearch').and.returnValue(avilableList);
    const filter = {};
    filter['queryString'] = '';
    component.keyWordSearch(filter);
    expect(component.bugIdFilteredList.length).toEqual(0);
  });

  it('should call onnavigate function', () => {
    spy = spyOn(window, 'open');
    component.onNavigate('http://mysupport.netapp.com');
    expect(window.open).toHaveBeenCalled();
  });


  it('should open new tab on click of keyword link', () => {
    spy = spyOn(component, 'onNavigate');
    const filter = {};
    filter['param'] = 'fas';
    component.keyWordLinkClick(filter);
    expect(component.onNavigate).toHaveBeenCalled();
  });

  it('should open new tab on click of keyword link', () => {
    spy = spyOn(component, 'onNavigate');
    const filter = {};
    filter['param'] = '10001';
    component.bugIdLinkClick(filter);
    expect(component.onNavigate).toHaveBeenCalled();
  });

});
