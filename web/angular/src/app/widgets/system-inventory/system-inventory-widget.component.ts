import {Component,OnInit, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { LocalizationService } from '../../services/localization/localization.service';


import  { SystemInventoryWrapper } from './system-inventory-wrapper'

import { TabItem } from '../../components/tab/tab-item';
import { SupportStatusComponent } from './support-status/support-status.component';
import { ProductTypeComponent } from './product-type/product-type.component';

import { WidgetHeaderComponent } from "../../components/widget-header/widget-header.component";

@Component({
  selector: 'app-system-inventory-widget',
  templateUrl: './system-inventory-widget.component.html',
  styleUrls: ['./system-inventory-widget.component.css']
})
export class SystemInventoryWidgetComponent implements OnInit {

  

  tab: TabItem[] = [    
    new TabItem(SupportStatusComponent,{name: 'Support Status',index:''}),
    
    new TabItem(ProductTypeComponent,{name: 'Product Type',index:''})];
    
  constructor(private inventoryservice:SystemInventoryWrapper, public localizationservice: LocalizationService){}

  


  bottomlinktext:any="All System Inventory";
  bottomlinkurl:any="https://invis.io/FRC1TOETM#/246720180_Unfiltered_Systems_Table_-XL-_1394p-_Copy";

  localroottitle:string="300";
  localsubtitle:string ="of 400 systems";

  ngOnInit() {
   
  }

  get(key){
    return this.localizationservice.get(key);
       
   }

  callDataService() {
    // this.inventoryservice.getSystemInventoryData()
    // .subscribe(responsedata => {  
    //   console.log(responsedata)
    // });
  }



}
