import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'

import { SpogGridComponent } from './spog-grid.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SpogGridComponent', () => {
  let component: SpogGridComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponentWrapper,
        SpogGridComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should get metaData as input & length 5', () => {
    expect(component.metaData.length)
      .toEqual(5);
  });

  it('should get records as input & length 3', () => {
    expect(component.records.length)
      .toEqual(3);
  });

  it('should get width of column from col Object', () => {
    expect(component.getColumnWidth(component.metaData[1]))
      .toEqual(74);
  });

  it('should get default width(80) of column if width attr is not present', () => {
    expect(component.getColumnWidth(component.metaData[0]))
      .toEqual(80);
  });

  it('should get Display Name from col object', () => {
    expect(component.getColumnName(component.metaData[1]))
      .toEqual("Priority");
  });

  it('should get ColumnName as DisplayName from col object if DisplayName attr not present', () => {
    expect(component.getColumnName(component.metaData[0]))
      .toEqual("caseNumber");
  });

  it('should check the column is link or not', () => {
    expect(component.isHyperLink(component.metaData[0]))
      .toEqual(true);
  });

  it('should check the column is link or not ', () => {
    expect(component.isHyperLink(component.metaData[1]))
      .toEqual(false);
  });

  it('should get link value from input', () => {
    expect(component.getLinkValue(component.records[0], component.metaData[0], 'link'))
      .toEqual("https://mysupport-stg.netapp.com/cssportal/faces/oracle/webcenter/portalapp/pages/css/casesparts/CaseDetailsLanding.jspx?caseNumber=2007093931");
  });

  it('should get linkText value from input', () => {
    expect(component.getLinkValue(component.records[0], component.metaData[0], 'linkText'))
      .toEqual(component.records[0][component.metaData[0].columnName].linkText);
  });

  it('should get linkText value from input', () => {
    expect(component.getLinkValue(component.records[0], component.metaData[3], 'linkText'))
      .toEqual("");
  });

  it('should check if result contains link type data', () => {
    expect(component.isLink(component.records[0], component.metaData[3]))
      .toEqual(false);
  });

  it('should check if result contains link type data', () => {
    expect(component.isLink(component.records[0], component.metaData[0]))
      .toEqual(true);
  });

  it('should able to render GRIDs in UI', () => {
    expect(element.querySelector('.n-compact-data-table'))
      .not.toBeNull();
    expect(element.querySelector('th').innerHTML.trim())
      .toEqual(component.getColumnName(component.metaData[0]));
    let th2 = fixture.debugElement.query(By.css('th:nth-of-type(2)'));
    expect(th2.nativeElement.textContent.trim())
      .toBe(component.getColumnName(component.metaData[1]));
    let td = fixture.debugElement.query(By.css('td:nth-of-type(2)'));
    expect(td.nativeElement.textContent.trim())
      .toBe(component.records[0][component.metaData[1].columnName]);
    let td2 = fixture.debugElement.query(By.css('td:nth-of-type(3)'));
    expect(td2.nativeElement.textContent.trim())
      .toBe(component.records[0][component.metaData[2].columnName]);
    expect(element.querySelector('.n-compact-data-table__cell--description'))
      .not.toBeNull();
    let td3 = fixture.debugElement.query(By.css('td:nth-of-type(5)'));
    expect(td3.nativeElement.textContent.trim())
      .toBe(component.records[0][component.metaData[4].columnName]);
  });

  it('should check if resultset is having error or not', () => {
    let response1 = {
      "error": {
        "isError": true,
        "errorMessage": "You have no cases to display from the past 30 days. <br> <a href='#'>All Case Reports</a> to see everything."
      }
    };
    component.error = response1.error;
    expect(component.isError())
      .toEqual(true);
  });

  it('should get error message from the result set', () => {
    let response1 = {
      "error": {
        "isError": true,
        "errorMessage": "You have no cases to display from the past 30 days. <br> <a href='#'>All Case Reports</a> to see everything."
      }
    };
    component.error = response1.error;
    expect(component.error.errorMessage)
      .toEqual("You have no cases to display from the past 30 days. <br> <a href='#'>All Case Reports</a> to see everything.");
  });

  it('should able to check whether an Object is null/undefined', () => {
    expect(component.isNullOrUndefined(component.metaData[0]))
      .toEqual(false);
  });

  it('should able to check whether an Object is null/undefined', () => {
    expect(component.isNullOrUndefined(null))
      .toEqual(true);
  });

});


//Defining wrapper component to execute <app-spog-grid></app-spog-grid>
@Component({
  selector: 'test-component-wrapper',
  template: '<app-spog-grid [metaData]="response.metaData" [records]="response.records" [error]="response.error"></app-spog-grid>'
})
class TestComponentWrapper {
  //mocking response data
  response = {
    "metaData": [
      {
        "columnName": "caseNumber",
        "dataType": "number",
        "isHyperLink": true
      },
      {
        "columnName": "priority",
        "displayName": "Priority",
        "dataType": "string",
        "width": 74
      },
      {
        "columnName": "description",
        "displayName": "Description",
        "dataType": "string",
        "isHyperLink": false,
        "width": 136,
        "class": "n-compact-data-table__cell--description"
      },
      {
        "columnName": "status",
        "displayName": "Status",
        "dataType": "string",
        "isHyperLink": true,
        "width": 86
      },
      {
        "columnName": "lastModified",
        "displayName": "Last Modified",
        "dataType": "date",
        "isHyperLink": false,
        "width": 100
      }
    ],
    "records": [
      {
        "caseNumber": {
          "link": "https://mysupport-stg.netapp.com/cssportal/faces/oracle/webcenter/portalapp/pages/css/casesparts/CaseDetailsLanding.jspx?caseNumber=2007093931",
          "linkText": "2007093931",
          "text": ""
        },
        "priority": "P3",
        "description": "NSS_NETWORK FILE SYSTEM (NFS) FOR ONTAP",
        "lastModified": "14 May 2017"
      },
      {
        "caseNumber": {
          "link": "https://mysupport-stg.netapp.com/cssportal/faces/oracle/webcenter/portalapp/pages/css/casesparts/CaseDetailsLanding.jspx?caseNumber=2007094655",
          "linkText": "2007094655",
          "text": ""
        },
        "priority": "P4",
        "description": "NSS_CREATECASE",
        "status": {
          "link": "",
          "linkText": "",
          "text": "Closed"
        },
        "lastModified": "15 May 2017"
      },
      {
        "caseNumber": {
          "link": "https://mysupport-stg.netapp.com/cssportal/faces/oracle/webcenter/portalapp/pages/css/casesparts/CaseDetailsLanding.jspx?caseNumber=2007094654",
          "linkText": "2007094654",
          "text": ""
        },
        "priority": "P2",
        "description": "NSS_CREATECASE",
        "status": {
          "link": "https://mysupport-stg.netapp.com/cssportal/faces/oracle/webcenter/portalapp/pages/css/casesparts/CaseDetailsLanding.jspx?caseNumber=2007094654",
          "linkText": "Take Action",
          "text": ""
        },
        "lastModified": "18 May 2017"
      }
    ]
  };

}
