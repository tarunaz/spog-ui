import { Component, OnInit, ElementRef, Pipe, Output, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { OffClickModule } from 'angular2-off-click';

import { DemoMongoComponent } from '../demo-mongo/demo-mongo.component';
import { FavouriteService } from '../../services/favourite/favourite.service';
import { SortPipe, FilterPipe, HighlightPipe } from '../../components/pipe/pipe.component';
import { WidgetDropdownComponent } from '../../components/widget-dropdown/widget-dropdown.component';
import { ModaalPopupComponent } from '../../components/modaal-popup/modaal-popup.component';
import { SpogUtils } from 'app/common/spog-utils';
import { AutoSupportWidgetComponent } from '../../widgets/auto-support/auto-support-widget.component';
import { SystemHealthComponent } from '../../widgets/auto-support/system-health/system-health.component';
import { CapacityComponent } from '../../widgets/auto-support/capacity/capacity.component';
import { CasesWidgetComponent } from '../../widgets/cases/cases-widget.component';
@Component({
  providers: [AutoSupportWidgetComponent,SystemHealthComponent,CapacityComponent, CasesWidgetComponent],
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  userId = 'robertlewallen';
  errorMsg = null;

  public companySuggestionBox: boolean = false;
  public sitesSuggestionBox: boolean = false;
  public customerSites: boolean = false;
  public changeVal: boolean = false;
  public hearticon: boolean = false;


  public companyInformation: any;
  public customerSitesView: any;
  public favouriteCompanies: any = [];
  public nonFavouriteCompanies: any = [];
  public favouriteSites: any = [];
  public nonFavouriteSites: any = [];


  public displayFav = '';
  public displayNonFav = '';
  public confirmDefault = '';
  public customerName = '';
  public displayCompany = '';
  public displaySites = '';
  public isOpen: boolean = false;
  public sitesDropdown = false;
  public companyDropdown = false;
  public updatedDataNonFavCom: any = [];
  public updatedDataNonFavSites: any = [];

  placeHolderText: string = 'Select Company';
  placeHolderTextSites: string = 'Select Site';
  showWidgetDropDown: boolean = true;

  public dashboardTxt: string = 'Support Dashboard';
  public displayFavText: string = 'Favorites';
  public displayNonFavText: string = 'A - Z';
  public changedSitesData: any;

  public animationright = false;
  public animation13 = false;
  public closePopUpModal: any;
  public changeModal: any;
  public Spinner: boolean = true;

  @Input() public isgetNonFavData: any;
  @Input() public ut: '';

  constructor(private _favourite: FavouriteService, private util: SpogUtils, private elementRef: ElementRef, private activeiq: AutoSupportWidgetComponent, private systemhealth : SystemHealthComponent, private capacity : CapacityComponent, private cases: CasesWidgetComponent) {

    const id = util.getCookie('userName');
    if (!util.isNullOrUndefined(id)) {
      this.userId = id;
    }
    sessionStorage.setItem("id",this.userId)
    const isInternal = util.getCookie('IsInternal');


    let obj;
    var self = this;
    if (isInternal != "true") {
      this._favourite.getFavouriteService(this.userId, isInternal).subscribe(response => {
        obj = response.data;
        self.companyInformation = obj;
        self.resDataFun(self.companyInformation, response);
        if (self.companyInformation) {
          // console.log(self.Spinner,'spinner')
          self.Spinner = false;
        }

        if (!this.util.isNullOrUndefined(response)) {
          if (response.statusCode === 200) {

          } else if (response.statusCode === 400) {
            this.errorMsg = response.errorMessage;
          }
        }
      },
        error => console.log(error))
    }
  }

  ngOnInit(): void { }


  resDataFun(servicedata, response) {

    /* Customer view 
    * fetch business category as company name
    * display sites associate site
    */
    this.customerName = response.businessCategory;
    this.customerSitesView = servicedata.Customer_List;

    // onload display partner view
    servicedata.Customer_List.forEach((val, key) => {
      val.isComFav === 'Y' ? this.favouriteCompanies.push(val) : this.nonFavouriteCompanies.push(val);
    });

    // onload customer site view
    this.customerSitesView.forEach((val, key) => {
      val.isSiteFav === 'Y' ? this.favouriteSites.push(val.Site[0]) : this.nonFavouriteSites.push(val.Site[0]);
    });

    // on page load the site view data
    this.changedSitesData = {
      FavSitesListData: this.favouriteSites,
      NonFavSitesListData: this.nonFavouriteSites
    };

  }

  chkDropdownOpen1(e) {
    this.companyDropdown = true;
    this.sitesDropdown = false;
  }
  chkDropdownOpen2(e) {
    this.sitesDropdown = true;
    this.companyDropdown = false;
  }

  // Company Favourite and non-favourite function
  onSelectFavouriteCompanies(data) {
    this.animation13 = true;
    data.eve.stopImmediatePropagation();
    this.nonFavouriteCompanies.push(data.data);
    this.favouriteCompanies.splice(data.ind, 1);
    this.changeVal = false;
  }

  onSelectNonFavouriteCompanies(data) {
    this.updatedDataNonFavCom = data; // sending data to modal popup
    this.confirmDefault = data.data.Customer_Name;
    data.eve.stopImmediatePropagation();
    this.changeVal = false;
    this.isOpen = data.isOpen;  // modal popup
  }

  // Company's Sites Favourite and non-favourite
  onSelectFavouriteCompaniesSites(data) {
    this.hearticon = true;
    data.eve.stopImmediatePropagation();
    this.changedSitesData.NonFavSitesListData.push(data.data);
    this.changedSitesData.FavSitesListData.splice(data.ind, 1);
    this.changeVal = false;
  }

  onSelectNonFavouriteCompaniesSites(data) {
    this.updatedDataNonFavSites = data;
    this.hearticon = true;
    this.confirmDefault = data.data.SiteName;
    data.eve.stopImmediatePropagation();
    // this.changedSitesData.FavSitesListData.push(data.data);
    //this.changedSitesData.NonFavSitesListData.splice(data.ind,1);
    this.changeVal = false;
    this.isOpen = data.isOpen;
  }

  closePopupParent(data) {
    this.isOpen = data.modalopen;
    if (this.companyDropdown) {
      data.selectedItem.data.isDefault = 'N';
    } else {
      data.selectedSites.data.isDefault = 'N';
    }

    this.nonFavItemMoveUp(data);
  }
  updateChildDropDown(data) {
    this.changedSitesData = data;
    this.changeModal = true;
    setTimeout(() => {
      this.changeModal = undefined;
    }, 0);
  }
  changecompanyata(data) {
    console.log("company changed : " + JSON.stringify(data));
    sessionStorage.setItem("customerID", JSON.stringify(data));
    sessionStorage.removeItem("siteID");
    this.activeiq.ngOnInit();
    this.systemhealth.ngOnInit();
    this.capacity.ngOnInit();
    this.cases.ngOnInit();

  }
  changesitedata(data) {
    console.log("site changed : " + JSON.stringify(data));
    sessionStorage.setItem("siteID", JSON.stringify(data));
    sessionStorage.removeItem("customerID");
    this.activeiq.ngOnInit();
    this.systemhealth.ngOnInit();
    this.capacity.ngOnInit();
    this.cases.ngOnInit();
    
  }
  onModalopen(data) {
    if (this.companyDropdown) {
      this.isDefaultCompany(data);
    }
    else {
      this.isDefaultSitesName(data)
    }
    this.isOpen = data.modalopen;
    this.nonFavItemMoveUp(data);
  }

  // pushing to fav array function
  nonFavItemMoveUp(data) {
    // debugger;
    if (this.companyDropdown) {
      this.nonFavouriteCompanies.splice(data.selectedItem.ind, 1);
      this.favouriteCompanies.push(data.selectedItem.data);
    } else {
      this.changedSitesData.FavSitesListData.push(data.selectedSites['data']);
      this.changedSitesData.NonFavSitesListData.splice(data.selectedSites['ind'], 1);
    }
  }
  //is default company function
  isDefaultCompany(data) {
    this.favouriteCompanies.forEach((val, key) => {
      val.isDefault = 'N'
    });
    data.selectedItem.data.isDefault = 'Y';
  }

  //is default Sites function
  isDefaultSitesName(data) {
    this.changedSitesData.FavSitesListData.forEach((val, key) => {
      val.isDefault = 'N'
    });
    data.selectedSites.data.isDefault = 'Y';
  }
}