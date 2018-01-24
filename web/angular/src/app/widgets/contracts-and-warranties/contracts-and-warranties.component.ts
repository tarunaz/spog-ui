import { Component, OnInit } from '@angular/core';

import { LocalizationService } from '../../services/localization/localization.service';
import {ContractserviceService} from '../../services/contractsandwarranties/contractservice.service';
@Component({
  selector: 'app-contracts-and-warranties',
  templateUrl: './contracts-and-warranties.component.html',
  styleUrls: ['./contracts-and-warranties.component.css']
})
export class ContractsAndWarrantiesComponent implements OnInit {
  response: any;
  contractsdata: any;
  error: any;
  constructor(private localizationservice: LocalizationService, private contractsservice :ContractserviceService) {
    this.response = {
      "error": {
        "errorMessage": "You have no contracts and warranties to display from the past 30 days. <br> <a href='#'>All Contracts and Warranties</a> to see everything."
      },
      "metaData": [
        {
          "columnName": "serialNumber",
          "displayName": "Serial Number",
          "dataType": "number",
          "isHyperLink": false,
          "width": 70
        },
        {
          "columnName": "expiringContracts",
          "displayName": "Contracts Expiring in 1-90 Days",
          "dataType": "string",
          "isHyperLink": false,
          "width": 150
        },
        {
          "columnName": "renewals",
          "displayName": "Renewals",
          "dataType": "string",
          "isbutton": true,
          "width": 60
        }      
      ]
    }
  }

  ngOnInit() {
    console.log("reached here")
    this.getdata();
  }
  get(key) {
    return this.localizationservice.get(key);

  }
  getdata() {
    this.contractsservice.getContractsService().subscribe(data => {
     // console.log("contracts:" +JSON.stringify(data.data))
      if (data.data) {
        if (data.data.length != 0) {
          this.contractsdata = data.data;
        }
        else {
          this.contractsdata='warning';
          this.response.error.isError = true;
          this.response.error.isWarn = true;
        }
      }
      else {
        this.contractsdata='error'  ;      
        this.response.error.isError = true;
        this.response.error.errorMessage = " Some data is currently unavailable due to technical issues.";
      }
    });
  }
}
