import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabComponent} from './tab.component';
import { TabDirective }   from './tab-directive';

@NgModule({
  declarations: [
    TabDirective ,
    TabComponent
  ],

  imports: [
    BrowserModule
  ],
 
  entryComponents: [],
  
  exports: [
    TabComponent
  ],

  providers: []

  })

export class TabModule { }


