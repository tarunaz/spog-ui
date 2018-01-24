import { Component, OnInit } from '@angular/core';

import { CasesService } from '../../services/cases/cases.service';
import { LocalizationService } from '../../services/localization/localization.service';

@Component({
  selector: 'app-cases-widget',
  templateUrl: './cases-widget.component.html',
  styleUrls: ['./cases-widget.component.css']
})
export class CasesWidgetComponent implements OnInit {

  response: any;
  casesdata: any;
  error: any;
  constructor(public casesservice: CasesService, private localizationservice: LocalizationService) {

    this.response = {
      "error": {
        "errorMessage": "You have no cases to display from the past 30 days. <br> View <a href='#'>All Case Reports</a> to see everything."
      },
      "metaData": [
        {
          "columnName": "caseNumber",
          "displayName": "Case Number",
          "dataType": "number",
          "isHyperLink": true,
          "width": 80
        },
        {
          "columnName": "priority",
          "displayName": "Priority",
          "dataType": "string",
          "isHyperLink": false,
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
      ]
    }
  }

  ngOnInit() {
    this.getdata();
  }
  get(key) {
    return this.localizationservice.get(key);

  }
  getdata() {
    this.casesservice.getCasesService().subscribe(data => {

      if (data.data) {
        if (data.data.length != 0) {
          this.casesdata = data.data;
        }
        if(data.data.isData == false){
       
          this.response.error.isError = true;
          this.response.error.isWarn = true;
        }
      }
      else {
        this.response.error.isError = true;
        this.response.error.errorMessage = " Some data is currently unavailable due to technical issues.<p>Come back later or view <a href='#'>All Case Reports</a></p>";
      }
    });
  }
}
