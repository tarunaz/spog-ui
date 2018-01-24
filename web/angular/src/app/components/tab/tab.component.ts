import { Component, Input, AfterViewInit, ViewChild, OnInit, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { TabDirective } from './tab-directive';
import { TabItem }      from './tab-item';
import { Directive, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})

export class TabComponent implements OnInit {
 
  @Input() tabs: TabItem[];
  @ViewChild(TabDirective) tabHost: TabDirective;
  load: any= true;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {

    if(this.load=true){
      this.loadComponent(0);
    }
    
    this.assign();
       
  }

  assign(){
    let adl = this.tabs.length;
    for(let i=0; i<adl; i++){
    this.tabs[i].data.index= i;
    }
  }
  
  set(){
    this.load=false;
  }
  
  loadComponent(index) {
    let adItem = this.tabs[index];
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    let viewContainerRef = this.tabHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
  }
  

  setStyle(event)
  {    
    var docItems= document.getElementsByName("tabbutton");

    for (var index = 0; index < docItems.length; index++) {
      var element = docItems[index];
      if(element.classList.contains('n-compact-tabs__tab--is-active'))
      {
        element.classList.remove('n-compact-tabs__tab--is-active');
      }
    }  
       
    event.target.classList.add('n-compact-tabs__tab--is-active');
  }




}
