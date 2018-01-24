import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

 @Input() roottitle:any;
 @Input() subtitle:any

 

  constructor() { }

  ngOnInit() {    
  }

}
