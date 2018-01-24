import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalizationService } from './services/localization/localization.service';
import { Observable } from 'rxjs/Observable';
//import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
//

import { ActiveiqDataWrapper } from './widgets/auto-support/activeiq-data-wrapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  activeiqdata: any;

  constructor(public localizationservice: LocalizationService, private activeiqdatawrapper: ActiveiqDataWrapper) { }
  ln: Object;
  service: Observable<any>;
  ngOnInit() {
    console.log("SPOG is LOADING");
    this.getLocaleLanguage('en');
    this.activeiqdatawrapper.getActiveIqDataAsync().subscribe(data => {
      
            this.activeiqdata = data;
      
          });
  }
  title = 'SPOG';
  public getLocaleLanguage(ln) {
    this.localizationservice.getLocaleLanguage(ln).subscribe(data => {
      this.ln = data;
      sessionStorage.setItem("language", JSON.stringify(data))

    });


  }
}
