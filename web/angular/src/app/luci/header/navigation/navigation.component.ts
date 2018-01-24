import { Component, OnInit, ElementRef,HostListener,ViewChild } from '@angular/core';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { SpogUtils } from 'app/common/spog-utils';
@Component({
 selector: 'app-navigation',
 templateUrl: './navigation.component.html',
 styleUrls: ['./navigation.component.css'],
 host: {
   '(document:click)': 'onBodyClick($event)',
 }
})
export class NavigationComponent implements OnInit {
 userId = 'robertlewallen';
 errorMsg = null;
 public firstLevelNav: any = [];
 public secondLevelNav: any = [];
 public thirdLevelNav: any = [];
 public groupedArr: any;
 public menuItem: any;
 public showMenu:boolean = false;
 public moreMenu: boolean = false;
 public toggleDiv: boolean = false;
  public MoreRow: any;
 @ViewChild('liElementMenu') liElementMenu: ElementRef;
 constructor(private _navigation: NavigationService, private util: SpogUtils, private elementRef: ElementRef) {
   if(window.innerWidth >=768 && window.innerWidth <= 1024){
     setTimeout (function() {
     window.dispatchEvent(new Event("resize"));     
     },1000);
    }
    const id = util.getCookie('userName');
   if (!util.isNullOrUndefined(id)) {
     this.userId = id;
   }
   const isInternal = util.getCookie('IsInternal');
   let obj;
   var self = this;
   this._navigation.getNavigation(this.userId, isInternal).subscribe(response => {
     obj = response.data;
     //console.log(obj,'firstLevelNav')
     self.resDataFun(response.data);
   },
   error => console.log(error))
 }
 ngOnInit() {
  
 }
  resDataFun(value){
   this.firstLevelNav = value.ROWSET.ROW;
 }
 onBodyClick(event) {   
   var flag = true;
   var moreflag =true;  
   const selected_item = event.target.classList.toString();
   const moreItem= event.target.classList[1];  
       if (selected_item == 'n-property-navigation-bar__nav-link-text' ||
           moreItem == 'n-property-navigation-bar__more-link-text') {
           flag = false;
           moreflag = false;
       }
     if (flag) {this.showMenu=false;}
     if(moreflag){this.moreMenu=false;}
 }
 //moreButton
 moreMenuItem(item,event){
   event.preventDefault();
   event.stopPropagation();
   this.moreMenu=!this.moreMenu; 
   this.showMenu =false;  
   var mainli=this.liElementMenu.nativeElement.children;   
   var classFindArray=[];
    for(var i = 0; i < mainli.length; i++){
     if(mainli[i].classList.contains('n-property-navigation-bar__nav-list-item--truncated')){
      var textName=mainli[i].textContent.replace( /\s+/g, ' ' ).trim().replace(" chevron-down","");
     classFindArray.push(textName)
      }
 
   }
  
   let MAINARRAYJSON=this.firstLevelNav;//total array
  
   let mainArrayPtitle=[];   
   var moreMenuItem=[];
   MAINARRAYJSON.forEach(function(element) {
      mainArrayPtitle=element.NAVPARENT.PDISPNAME;
      classFindArray.forEach(function(data,i){
      if (mainArrayPtitle === data) {         
          moreMenuItem.push(element)
       }
    });
   });
   this.MoreRow=moreMenuItem;
 }
 showDropMenu(item,ind,event,menuShow){
   if(menuShow === ind){ 
     this.toggleDiv= !this.toggleDiv;        
   } else {
     this.toggleDiv= true;       
   }
   event.preventDefault();
   event.stopPropagation();
   this.moreMenu=false; 
   this.showMenu = ind; 
   this.secondLevelNav=item.NAVPARENT.NAX_NOWNAVBAR.NAVCHILD;
  
   this.secondLevelNav.forEach((val, key) => {     
     this.thirdLevelNav = val.NAX_NOWNAVBAR.NAVSUBCHILD;
   });
   if(this.secondLevelNav.length==4){
     this.groupedArr = this.splitColumn(this.secondLevelNav, 2);
   }else{
     this.groupedArr = this.splitColumn(this.secondLevelNav, 3);
   }
 }
 splitColumn(arr, chunkSize){ //size - child_array.length
   var groups = [];
   for (var i = 0; i < arr.length; i += chunkSize) {
       groups.push(arr.slice(i, i + chunkSize));
   }
   return groups;
 }
}
