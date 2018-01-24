import { Component, Input, Output, EventEmitter, OnInit, Pipe, OnChanges, HostListener } from '@angular/core';
import { SortPipe, FilterPipe, HighlightPipe } from '../../components/pipe/pipe.component';
import { ModaalPopupComponent } from '../../components/modaal-popup/modaal-popup.component';

@Component({
  selector: 'app-widget-dropdown',
  templateUrl: './widget-dropdown.component.html',
  styleUrls: ['./widget-dropdown.component.css'],
  host: {
    '(window:click)': 'onWindowClicked($event)'
  }
})
export class WidgetDropdownComponent implements OnInit, OnChanges {

  @Input() softwareList: Array<any>;
  @Input() placeHolderTxt: string;
  @Input() showDropDown: boolean;
  @Input() showLookupListFavWidget: string;
  @Input() showLookupListSitesWidget: string;
  @Input() favDisplayTxt: string;
  @Input() nonFavDisplayTxt: string;

  @Input() FavListData: Array<any>;
  @Input() NonFavListData: Array<any>;
  @Input() FavSitesListData: Array<any>;
  @Input() NonFavSitesListData: Array<any>;
  @Input() showList: boolean;
  @Input() textValue: string;
  @Input() changeModal1: any;
  @Input() test2: string;
  @Input() isdefaultValYes: any;

  @Output('FavItemListObj')
  favCompanyListObj = new EventEmitter<any>(); //move to fav company

  @Output('nonFavItemListObj')
  nonfavCompanyListObj = new EventEmitter<any>(); //move to nonfav company

  @Output('FavItemListObjSites')
  favSitesListObj = new EventEmitter<any>(); //move to fav sites

  @Output('nonFavItemListObjSites')
  nonFavSitesListObj = new EventEmitter<any>(); //move to nonfav sites

  @Output('onSoftwareListSelectEvent')
  softwareListObj = new EventEmitter<string>();

  @Output('onPlatformListSelectEvent')
  platformListObj = new EventEmitter<string>();

  @Output('onVersionListSelectEvent')
  versionListObj = new EventEmitter<string>();

  @Output('selectedSitesData')
  sitesData = new EventEmitter<any>();

  @Output('companyData')
  companyData = new EventEmitter<any>();
  @Output('siteData')
  siteData = new EventEmitter<any>();

  // @Output('getngModelval')
  // getmodelVal = new EventEmitter<any>();

  //showList        = false;
  showLookupList = false;
  isOpen = false;
  lookUpValue = null;

  LookUpList: Array<any> = null;
  public changeVal: boolean = false;
  public companySuggestionBox: boolean = false;
  public parentClick: boolean = false;
  public animationtop: boolean = false;

  public animationright: boolean = false;
  public PageLoadDiv: boolean = false;
  public isDisabled: boolean = false;
  public FavListDataisDefault: any;
  public isProgress: boolean = true;

  public allSites = "All Sites";
  @Output('isShowDropDownAny') isShowDrop = new EventEmitter<any>();

  onFocus(e) {
    e.stopImmediatePropagation();
    this.showList = true;

    this.isShowDrop.emit(this.showList);
    this.changeVal = false;
  }

  onBlur(e) {
    // console.log("focus came 2222");
    // this.showList = false; 
  }

  onWindowClicked(event) {
    var self = this;
    var flag = true;
    var disabledIcon = ['n-link-list__item'];
    const selected_item = event.target.classList.toString() ?
      event.target.classList.toString().split(' ') : disabledIcon;

    for (let i = 0; i < selected_item.length; i++) {
      if (selected_item[i] == 'n-link-list__item' ||
        selected_item[i] == 'n-type-ahead__menu' ||
        selected_item[i] == 'n-link-list' ||
        selected_item[i] == 'modaal-confirm-wrap' ||
        selected_item[i] == 'modaal-content-container' ||
        selected_item[i] == 'modaal-inner-wrapper' ||
        selected_item[i] == 'modaal-ok' ||
        selected_item[i] == 'modaal-cancel') {
        flag = false;
      }
    }
    if (flag) {
      self.showList = false;
    }

  }
  lookUpList(value) {
    var subNodeList: Array<any> = null;
    this.lookUpValue = value; //value.target.value;
    console.log('120', this.textValue)
    this.textValue = value;
    if (this.softwareList) {
      subNodeList = this.getSubNodeList(this.softwareList);

      this.LookUpList = subNodeList.filter(this.getFilteredList)
      this.showList = false;
      this.showLookupList = true;
    }
    this.changeVal = true; // on change filter will work
  }

  getFilteredList(element, index, array) {
    return (element.search('pare') != -1);
  }

  getSubNodeList(parentArrayList) {
    var tempSubNodeArrList: Array<any> = [];
    for (var i = 0; i < parentArrayList.length; i++) {
      for (var idx = 0; idx < parentArrayList[i]['subnodes'].length; idx++) {
        tempSubNodeArrList.push(parentArrayList[i]['subnodes'][idx].Customer_Name);
      }
    }
    return tempSubNodeArrList;
  }

  sendSelectedListItem(value) {
    this.showLookupList = false;
    if (this.placeHolderTxt.toString() == "Select Software to Download") {
      this.softwareListObj.emit(value.target.value);
    } else if (this.placeHolderTxt.toString() == "Select Platform") {
      this.platformListObj.emit(value.target.value);
    } else if (this.placeHolderTxt.toString() == "See All Versions") {
      this.versionListObj.emit(value.target.value);
    }
  }


  //move to fav  company
  selectFavouriteCompanies(data, index, event) {
    event.stopImmediatePropagation();
    var obj = { data: data, ind: index, eve: event, animation: this.animationright };
    this.favCompanyListObj.emit(obj);
  }

  //move to nonfav company 
  selectNonFavouriteCompanies(data, index, event) {
    event.stopImmediatePropagation();
    this.isOpen = true;
    this.animationright = false;
    var obj = { data: data, ind: index, eve: event, isOpen: this.isOpen, animation: this.animationright };
    this.nonfavCompanyListObj.emit(obj);
  }

  //move to fav  sites
  selectFavouriteSites(data, index, event) {
    event.stopImmediatePropagation();
    var obj = { data: data, ind: index, eve: event };
    this.favSitesListObj.emit(obj);
  }

  //move to nonfav sites 
  selectNonFavouriteSites(data, index, event) {
    this.isOpen = true;
    var obj = { data: data, ind: index, eve: event, isOpen: this.isOpen };
    this.nonFavSitesListObj.emit(obj);
  }

  //favComModelVal and sitedata dispaly in second dropdown
  getSelectedDropdown(data, index, event) {
    var obj = { data: data, ind: index, eve: event };
    event.preventDefault();
    this.textValue = data.Customer_Name;
    this.companyData.emit(data.Customer_ID);
    this.NonFavSitesListData = [], this.FavSitesListData = [];
    data.Site.forEach((val, key) => {
      val.isSiteFav === 'Y' ? this.FavSitesListData.push(val) : this.NonFavSitesListData.push(val);
    });
    var changedObj = {
      FavSitesListData: this.FavSitesListData,
      NonFavSitesListData: this.NonFavSitesListData,
      modelvalue: this.textValue,
    };
    this.sitesData.emit(changedObj);
  }
  getSelectedDropdownSites(data, index, event) {
    event.preventDefault();
    this.siteData.emit(data.SiteId);

    this.textValue = data.SiteName;
  }

  ngOnInit() {
    // console.log("softwarelist is"+this.softwareList);
    // console.log("placeHolderTxt is"+this.placeHolderTxt);
    // console.log("showDropDown is"+this.showDropDown);
    // console.log("showList is"+this.showList);


  };
  ngOnChanges() {
    if (this.changeModal1) {
      this.textValue = '';
    }

  }

}