import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-modaal-popup',
  templateUrl: './modaal-popup.component.html',
  styleUrls: ['./modaal-popup.component.css']
})
export class ModaalPopupComponent implements OnInit, OnChanges {
  @Input() public isModalOpen: any;
 
  @Output('isShownmodaOpenParent') isShownmodal = new EventEmitter<any>();
  @Output('isCloseButton') clickToClose = new EventEmitter<any>();

  @Input() public nonFavSelectItem: Array<any>; 
  @Input() public nonFavItemListObjUpdated: Array<any>; 
  @Input() public nonFavItemSitesObjUpdated: Array<any>;
  

  public defaultDashboardMsg = ''
  public msgs = {
    1: 'Would you like to make this your dashboard default?',
    2: 'Upon your next login this will be your default dashboard view.'
  }
  public defaultDashboardViewMsg : string = "";

  public confirmYes : string = "Yes";
  public confirmNo : string = "No";
  public showMsgTwo: boolean = false;
  public currentCount = 0;
  public flag:boolean=false;
  public count = 1;
  public countInc:any = 0;
  constructor() { }
  ngOnChanges() {
    this.ngOnInit();
   }
  ngOnInit() { 
    this.countInc = 1;
    this.defaultDashboardMsg = this.msgs[this.countInc];   
   }

  closePopup() {
   
    var self = this;
    self.isModalOpen = false;   
    var obj = {
      modalopen: self.isModalOpen,     
      selectedItem:this.nonFavItemListObjUpdated,
      selectedSites:this.nonFavItemSitesObjUpdated
    }; 
    self.clickToClose.emit(obj);
  }
  
  confirmDefault(event) {
    
    var self = this;
    self.countInc++;
    self.showMsgTwo = true; 
    self.defaultDashboardMsg = self.msgs[self.countInc];
    if(this.countInc == 3) {
      self.isModalOpen = false;
      var obj = {
        modalopen: self.isModalOpen,
        msg:self.showMsgTwo,
        selectedItem:this.nonFavItemListObjUpdated,
        selectedSites:this.nonFavItemSitesObjUpdated
      };
      self.isShownmodal.emit(obj);
    }
  }

  confirmDefault2(){
    this.isModalOpen = false;
  }
 
}
