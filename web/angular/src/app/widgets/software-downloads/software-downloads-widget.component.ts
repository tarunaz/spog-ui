import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'app-software-downloads-widget',
  templateUrl: './software-downloads-widget.component.html',
  styleUrls: ['./software-downloads-widget.component.css']
})
export class SoftwareDownloadsWidgetComponent implements OnInit {

  selectedSoftware = '';
  isSoftwareSelected = false;

  selectedPlatform = '';
  isPlatformSelected = false;

  selectedVersion = '';
  isVersioSelected = false; 

  placeHolderText:string = "Select Software to Download";
  showWidgetDropDown : boolean = true;
  
  pltPlaceHolderText:string = "Select Platform";
  verPlaceHolderText:string = "See All Versions";

    softwareDownloadList:any =
    [
      {"name":"parent1", "subnodes":[{"name":"parent1_child1"}]},
      {"name":"parent2", 
          "subnodes":[
                  {"name":"parent2_child1"},
                  {"name":"parent2_child2"},
               ]}
  ];

  platformList:any = null;
  
  versionList:any = null;

  constructor() { }

  ngOnInit() {
  }

  onSoftwareSelect(software : string) {

  this.selectedSoftware = software;
  this.isSoftwareSelected = true;
  this.platformList = [
    {"name":"parent1", "subnodes":[{"name":"parent1_child1"}]},
    {"name":"parent2", 
        "subnodes":[
                {"name":"parent2_child1"},
                {"name":"parent2_child2"},
             ]}
];  
  
  }

  onPlatformSelect(platform : string) {
    
      this.selectedPlatform = platform;
      this.isPlatformSelected = true;
      this.versionList = [
        {"name":"parent1", "subnodes":[{"name":"parent1_child1"}]},
        {"name":"parent2", 
            "subnodes":[
                    {"name":"parent2_child1"},
                    {"name":"parent2_child2"},
                 ]}
      ];

      }

}

