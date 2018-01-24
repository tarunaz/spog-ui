import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-moredetail,[nav-moredetail]',
  templateUrl: './nav-moredetail.component.html',
  styleUrls: ['./nav-moredetail.component.css']
})
export class NavMoredetailComponent implements OnInit {

  @Input() linktext:any;
  @Input() linkurl:any;
  
  constructor() { }

  ngOnInit() {
    // console.log('morelink:'+this.linktext);
    // console.log('morelink:'+this.linkurl);
  }



}
