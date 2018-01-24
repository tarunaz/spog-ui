import { Component, OnInit } from '@angular/core';
import { SystemDetailsApiService } from '../../services/system-details-api.service';
import { SpogTableGridComponent } from '../../components/table-grid/spog-table-grid/spog-table-grid.component';
@Component({
  selector: 'app-system-details-widget',
  templateUrl: './system-details-widget.component.html',
  styleUrls: ['./system-details-widget.component.css']
})
export class SystemDetailsWidgetComponent implements OnInit {

  //constructor(public systemdetails:SystemDetailsApiService) { }

  ngOnInit() {
    this.getSystemDetails();
  }

     constructor(public systemdetailsApi:SystemDetailsApiService) { }

     response = {
      "error": [
  
      ],
      "data": [
        {
          "columnName": "serialNumber",
          "displayName": "Serial Number #",
          "dataType": "number",
          "isHyperLink": true,
          "width": 80,
          "display":true,
          "searchFilter":true
        },
        {
          "columnName": "clusterSerialNumber",
          "displayName": "Cluster Serial Number",
          "dataType": "number",
          "isHyperLink": true,
          "width": 74,
          "display":false,
          "searchFilter":true
        },
        {
          "columnName": "clusterName",
          "displayName": "Cluster Name",
          "dataType": "string",
          "isHyperLink": false,
          "width": 60,
          "display":true,
          "searchFilter":true
        },
        {
          "columnName": "clusterSerialNumber",
          "displayName": "Remote Cluster Serial Number",
          "dataType": "number",
          "isHyperLink": false,
          "width": 136,
          "display":1,
          "searchFilter":true
        },
        {
          "columnName": "productFamily",
          "displayName": "Product Family",
          "dataType": "string",
          "isHyperLink": false,
          "width": 136,
          "display":true,
          "searchFilter":true
        },
        {
          "columnName": "productLocation",
          "displayName": "Product Location",
          "dataType": "string",
          "isHyperLink": false,
          "width": 136,
          "display":false,
          "searchFilter":true
        },
        {
          "columnName": "group",
          "displayName": "Group",
          "dataType": "string",
          "isHyperLink": false,
          "width": 136,
          "display":true,
          "searchFilter":false
        },
        {
          "columnName": "productNumber",
          "displayName": "Product Number",
          "dataType": "number",
          "isHyperLink": false,
          "width": 136,
          "display":false,
          "searchFilter":true
        },
        {
          "columnName": "contractStatus",
          "displayName": "Contract status",
          "dataType": "string",
          "isHyperLink": false,
          "width": 136,
          "display":true,
          "searchFilter":true
        },
        {
          "columnName": "osVersion",
          "displayName": "OS Version",
          "dataType": "string",
          "isHyperLink": false,
          "width": 136,
          "display":false,
          "searchFilter":true
        },
        {
          "columnName": "systemName",
          "displayName": "System Name",
          "dataType": "string",
          "isHyperLink": false,
          "width": 136,
          "display":false,
          "searchFilter":true
        },
        {
          "columnName": "autosupportstatus",
          "displayName": "AutoSupport Status",
          "dataType": "string",
          "isHyperLink": false,
          "width": 136,
          "display":false,
          "searchFilter":true
        },
        {
          "columnName": "productToolSet",
          "displayName": "Product Tool Set",
          "dataType": "string",
          "isHyperLink": false,
          "width": 136,
          "display":false,
          "searchFilter":true
        }
  
  
        
        
  
      ]
    }
  detailsListArray= [];
   getSystemDetails(){
    this.systemdetailsApi.getSystemDetails('/asecornerdetail').subscribe(data=>{
      if (data) {
      
        this.detailsListArray = data.data.data;
        console.log(this.detailsListArray);
      }
    })
   }
  

  // ngOnInit() {}
  

}
