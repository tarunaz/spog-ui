import { Component, OnInit } from '@angular/core';

import  { ActiveiqDataWrapper } from '../activeiq-data-wrapper'

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

    // data: any;
  
    // performanceChartData:Array<string> = ["12","27","167"] ;  
    // performanceChartLabels:Array<string> = ['with HIGH CPU / Drive utilization','with less than 20% Headroom','working efficiently'];  
    // performanceChartColors:Array<any> = ['#DD3851','#F39503','#A7D500','#A4A4A4'] ;
     // bottomlinktext:any="All Performance";
    // bottomlinkurl:any="#";

    performanceChartname="performancechart";
  
    constructor(private activeiqdatawrapper:ActiveiqDataWrapper) { }

    performancedata:any;
  
    ngOnInit() {
      this.initDonutChart();
     }

     initDonutChart() {  
      
         // this.systemhealthdata = this.activeiqdatawrapper.getSystemHealthData();
         this.activeiqdatawrapper.getPerformanceDataAsync().subscribe(data=>{
          //console.log("***********>>> initDonutChart" + JSON.stringify(data));
          this.performancedata = data;
         });
      
        }

}
