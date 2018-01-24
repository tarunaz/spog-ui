import { Component, OnInit } from '@angular/core';

import { AseCornerService } from '../../services/ase-corner/ase-corner.service';
import { LocalizationService } from '../../services/localization/localization.service';

@Component({
  selector: 'app-ase-corner',
  templateUrl: './ase-corner.component.html',
  styleUrls: ['./ase-corner.component.css']
})
export class AseCornerComponent implements OnInit {

  response: any;
  asecornerdata: any;
  error: any;

  constructor(public asecornerservice: AseCornerService, private localizationservice: LocalizationService) {
    this.response = {
      "error": {
        "errorMessage": "You have no ase cases to display from the past 30 days. <br> View <a href='#'>All ASE Cases</a> to see everything."
      },

      "metaData": [
        {
          "columnName": "fsoNumber",
          "displayName": "FSO Number",
          "dataType": "number",
          "isHyperLink": true,
          "width": 80
        },
        {
          "columnName": "caseNumber",
          "displayName": "Case Number",
          "dataType": "number",
          "isHyperLink": true,
          "width": 74
        },

        {
          "columnName": "status",
          "displayName": "Status",
          "dataType": "string",
          "isHyperLink": true,
          "width": 86
        },
        {
          "columnName": "dateCreated",
          "displayName": "Date Created",
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
    this.asecornerservice.getAseCornerService().subscribe(data => {
      if (data.data) {
        if (data.data.asedata.length != 0) {
          this.asecornerdata = data.data.asedata;
        }
        else {
          this.response.error.isError = true;
          this.response.error.isWarn = true;

        }
      }
      else {
        this.response.error.isError = true;
        this.response.error.errorMessage = " Some data is currently unavailable due to technical issues.<p>Come back later or view <a href='#'>All ASE Cases</a></p>";
      }
    });
  }

}

