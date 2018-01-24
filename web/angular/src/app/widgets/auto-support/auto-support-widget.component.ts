import { Component, OnInit } from '@angular/core';

import { ActiveiqDataWrapper } from './activeiq-data-wrapper'

import { TabItem } from '../../components/tab/tab-item';
import { CapacityComponent } from './capacity/capacity.component';
import { EfficiencyComponent } from './efficiency/efficiency.component';
import { PerformanceComponent } from './performance/performance.component';
import { SystemHealthComponent } from './system-health/system-health.component';
import { LocalizationService } from '../../services/localization/localization.service';


@Component({
  selector: 'app-auto-support-widget',
  templateUrl: './auto-support-widget.component.html',

})

export class AutoSupportWidgetComponent implements OnInit {

  constructor(private activeiqdatawrapper: ActiveiqDataWrapper, private localizationservice: LocalizationService) { }

  tab: TabItem[] = [
    new TabItem(SystemHealthComponent, { name: 'System Health', index: '' }),

    new TabItem(CapacityComponent, { name: 'Capacity', index: '' }),

    new TabItem(PerformanceComponent, { name: 'Performance', index: '' }),

    new TabItem(EfficiencyComponent, { name: 'Efficiency', index: '' }),

  ];


  activeiqdata: any;
  nodata: any;

  ngOnInit() {
    this.initActiveIqWidgetData();
  }
  get(key) {
    return this.localizationservice.get(key);

  }

  initActiveIqWidgetData() {

    //this.activeiqdata = this.activeiqdatawrapper.getActiveIqWidgetData();
    // this.systemhealthdata = this.activeiqdatawrapper.getSystemHealthData();
    this.activeiqdatawrapper.getActiveIqDataAsync().subscribe(data => {

    /*  if (data.nodata == true) {
        this.nodata = data;
      }

      else {*/
        this.activeiqdata = data;
      /*}*/

    });

  }

}



