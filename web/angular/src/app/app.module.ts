import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { js } from 'core-js';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';

import { ChartsModule } from 'ng2-charts';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { LuciModule } from './luci/luci.module';
import { WidgetsModule } from './widgets/widgets.module';
import { RoutingModule } from './routing/routing.module';
import { ServicesModule } from './services/services.module';

//import { LanguageDataWrapper } from './language-data-wrapper';
import { PipeModule } from './components/pipe/pipe.module';
import { VirtualScrollModule } from 'angular2-virtual-scroll';


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    DragulaModule,
    RoutingModule,
    LuciModule,
    WidgetsModule,
    ServicesModule,
    PipeModule,
    VirtualScrollModule,
    HttpModule
  ],
  // entryComponents: [SupportstatusComponent,ProducttypeComponent],
  providers: [
  ], bootstrap: [AppComponent]
})

export class AppModule { }