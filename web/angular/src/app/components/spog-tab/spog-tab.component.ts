import { Component, OnInit, Input } from '@angular/core';


import { SupportStatusComponent } from 'app/widgets/system-inventory/support-status/support-status.component';
import { ProductTypeComponent } from 'app/widgets/system-inventory/product-type/product-type.component';
import { CapacityComponent } from 'app/widgets/auto-support/capacity/capacity.component';
import { SystemHealthComponent } from 'app/widgets/auto-support/system-health/system-health.component';
import { PerformanceComponent } from 'app/widgets/auto-support/performance/performance.component';
import { EfficiencyComponent } from 'app/widgets/auto-support/efficiency/efficiency.component';
import { DynamicComponentLoaderComponent }  from '../dynamic-componentloader/dynamic-componentloader.component';

@Component({
  selector: 'app-spogtab',
  templateUrl: './spog-tab.component.html'
})
export class SpogTabComponent implements OnInit {

  constructor() {
  }

  tabcollections:Array<any> = 
  [
    { tabname: 'supportstatuscomponent', componentcontrol: SupportStatusComponent},
    { tabname: 'producttypecomponent', componentcontrol : ProductTypeComponent },
    { tabname: 'capacitycomponent', componentcontrol : CapacityComponent } ,
    { tabname: 'systemhealthcomponent', componentcontrol : SystemHealthComponent },  
    { tabname: 'performancecomponent', componentcontrol : PerformanceComponent },
    { tabname: 'efficiencycomponent', componentcontrol : EfficiencyComponent }
         
  ];


  @Input() tabheaders: Array<any>; 

  @Input() tabcontrolcontainerId: any; 

  dynamiccomponentdata: any;

  IsShow:boolean = true;
  

  ngOnInit() {
    console.log(this.tabheaders);
    console.log(" ********* controlId ************" + this.tabcontrolcontainerId); 
    this.SetInitialActiveTab();
  }

  SetInitialActiveTab() {
    if (this.tabheaders.length > 0) {      
      let initialTab: any = this.tabheaders[0];

      console.log(initialTab +'******************' + initialTab.headername); 

      this.dynamiccomponentdata =
      {
        component: this.tabcollections.find(x=>x.tabname == initialTab.headername).componentcontrol,
        inputs: { showNum: 9 }
      }; 
      
      
      
    }
  }
 
  Tabbuttonclicked(clickeddata: any) {
    // console.log('testing event'+ $event);
    let selectedtab: any = this.tabcollections.find(x=>x.tabname == clickeddata).componentcontrol;
    console.log(" ********* controlId ************" + this.tabcontrolcontainerId); 
    console.log(clickeddata);
    console.log(selectedtab + ' Selected ************');
    
    
    this.dynamiccomponentdata =
    {
      component: selectedtab,
      inputs: { showNum: 9 }
    }; 
    
  }
}
