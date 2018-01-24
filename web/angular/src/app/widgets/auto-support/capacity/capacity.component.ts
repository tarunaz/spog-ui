import { Component, OnInit } from '@angular/core';

import { ActiveiqDataWrapper } from '../activeiq-data-wrapper'
import { LocalizationService } from '../../../services/localization/localization.service';

@Component({
  selector: 'app-capacity,[capacity]',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css']
})
export class CapacityComponent implements OnInit {


  capacityChartname = "capacitychart";

  constructor(private activeiqdatawrapper: ActiveiqDataWrapper, private localizationservice: LocalizationService) { }

  capacitydata: any;

  ngOnInit() {
    this.initDonutChart();
  }

  get(key) {
    return this.localizationservice.get(key);

  }
  initDonutChart() {

    // this.systemhealthdata = this.activeiqdatawrapper.getSystemHealthData();
    this.activeiqdatawrapper.getCapacityDataAsync().subscribe(data => {
      this.capacitydata = data;
    });

  }

}
