import { Component, OnInit } from '@angular/core';

import { PartRequestsService } from '../../services/part-requests/part-requests.service';
import { LocalizationService } from '../../services/localization/localization.service';

@Component({
  selector: 'app-part-requests-widget',
  templateUrl: './part-requests-widget.component.html',
  styleUrls: ['./part-requests-widget.component.css']
})
export class PartRequestsWidgetComponent implements OnInit {

  partrequestsdata: any;
  response: any;
  error: any;
  constructor(public partrquestsservice: PartRequestsService, private localizationservice: LocalizationService) {

    this.response = {
      "error": {
        "errorMessage": "You have no part requests to display from the past 30 days. <br> <a href='#'>All Case Reports</a> to see everything."
      },
      "metaData": [
        {
          "columnName": "rmaNumber",
          "displayName": "RMA Number",
          "dataType": "number",
          "isHyperLink": true,
          "width": 96
        },
        {
          "columnName": "caseNumber",
          "displayName": "Case Number",
          "dataType": "number",
          "isHyperLink": true,
          "width": 100
        },
        {
          "columnName": "rmaStatus",
          "displayName": "RMA Status",
          "dataType": "string",
          "isHyperLink": true,
          "width": 100,

        },
        {
          "columnName": "dateShipped",
          "displayName": "Date Shipped",
          "dataType": "date",
          "isHyperLink": false,
          "width": 100
        }
      ]
    }
  }
  ngOnInit() {
    this.initPartRequestsWidgetData();
  }
  get(key) {
    return this.localizationservice.get(key);

  }
  initPartRequestsWidgetData() {
    this.partrquestsservice.getPartRequestsService().subscribe(data => {
      if (data.data) {
        if (data.data.records.length != 0) {
          this.partrequestsdata = data.data.records;
        }
        else {
          this.response.error.isError = true;
          this.response.error.isWarn = true;

        }
      }
      else {
        this.response.error.isError = true;
        this.response.error.errorMessage = " Some data is currently unavailable due to technical issues.<p>Come back later or view <a href='#'>All Part Requests Reports</a></p>";
      }
    });
  }

}
