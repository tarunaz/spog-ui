import { Component, OnInit } from '@angular/core';
import  { ActiveiqDataWrapper } from '../activeiq-data-wrapper';
import { LocalizationService } from '../../../services/localization/localization.service';

@Component({
  selector: 'app-efficiency',
  templateUrl: './efficiency.component.html',
  styleUrls: ['./efficiency.component.css']
})
export class EfficiencyComponent implements OnInit {

    efficiencydata:any;
   
    efficiencyChartData:Array<string> = ["33","167"] ;  
    efficiencyChartLabels:Array<string> = ['with improvement opportunities','working efficiently'];;  
    efficiencyChartColors:Array<string> = ['#DD3851','#A7D500'] ;

    efficiencyChartname="efficiencychart";

    bottomlinktext:any="All Storage Efficiencies";
    bottomlinkurl:any="#";
  
    constructor(private activeiqdatawrapper:ActiveiqDataWrapper, private localizationservice: LocalizationService) { }

    ngOnInit() {
      this.initDonutChart();
     }
     get(key){
      return this.localizationservice.get(key);
         
     }
    initDonutChart() {  
      
         // this.systemhealthdata = this.activeiqdatawrapper.getSystemHealthData();
         this.activeiqdatawrapper.getEfficiencyDataAsync().subscribe(data=>{
         // console.log("***********>>> reformatEfficiencydata" + JSON.stringify(data));
         this.efficiencydata = data;

         });
      
        }
}
