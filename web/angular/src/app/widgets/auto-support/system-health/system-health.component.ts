import { Component, OnInit } from '@angular/core';

import { DashboardApiService } from '../../../services/dashboard/dashboard-api.service';

import { ActiveiqDataWrapper } from '../activeiq-data-wrapper'
import { LocalizationService } from '../../../services/localization/localization.service';



@Component({
  selector: 'app-system-health,[system-health]',
  templateUrl: './system-health.component.html',
  styleUrls: ['./system-health.component.css']
})
export class SystemHealthComponent implements OnInit {


  systemhealthdata: any;


  constructor(private activeiqdatawrapper: ActiveiqDataWrapper, private localizationservice: LocalizationService) { }

  ngOnInit() {
    this.initDonutChart();
  }
  get(key){
    return this.localizationservice.get(key);
       
   }
  initDonutChart() {

    // this.systemhealthdata = this.activeiqdatawrapper.getSystemHealthData();
    this.systemhealthdata = this.activeiqdatawrapper.getSystemHealthData()




  }







}
