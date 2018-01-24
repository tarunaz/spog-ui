
import { Component, OnInit } from '@angular/core';

import { OrderstatusService } from '../../services/order-status/order-status.service';
import { SpogGridComponent } from '../../components/grid/spog-grid.component';
import { LocalizationService } from '../../services/localization/localization.service';

@Component({
  selector: 'app-order-status-widget',
  templateUrl: './order-status-widget.component.html',
  styleUrls: ['./order-status-widget.component.css']
})
export class OrderStatusWidgetComponent implements OnInit {
  response: any;
  orderdata: any;
  constructor(public orderstatusservice: OrderstatusService, private localizationservice: LocalizationService) {
    this.response = {
      "error": {
        "errorMessage": "You have no part requests to display from the past 30 days. <br> <a href='#'>All Case Reports</a> to see everything."

      },
      "data": [
        {
          "columnName": "salesOrder",
          "displayName": "Sales Order #",
          "dataType": "number",
          "isHyperLink": true,
          "width": 80
        },
        {
          "columnName": "p o number",
          "displayName": "P O Number",
          "dataType": "number",
          "isHyperLink": true,
          "width": 74
        },
        {
          "columnName": "status",
          "displayName": "Status",
          "dataType": "string",
          "isHyperLink": false,
          "width": 60,
        },
        {
          "columnName": "expected ship date",
          "displayName": "Expected Ship Date",
          "dataType": "date",
          "isHyperLink": false,
          "width": 136
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
    this.orderstatusservice.getOrderStatusService().subscribe(data => {
      if (data.data) {
        if (data.data.orderdata.length != 0) {
          this.orderdata = data.data.orderdata;
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