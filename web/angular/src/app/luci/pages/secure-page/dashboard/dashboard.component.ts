import { Component, HostBinding, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef, Renderer } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs'
import { DragulaService } from 'ng2-dragula';
import { Ng2DeviceService } from 'ng2-device-detector';
import autoScroll from 'dom-autoscroller';
import dragula from 'dragula';

import { SpogUtils } from '../../../../common/spog-utils';
import { DashboardDataWrapper } from './dashboard-data-wrapper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  firstList = [];
  secondList = [];
  userId = 'robertlewallen';
  fullName = '';
  ut = null;
  isProgress = true;
  errorMsg = null;

  @ViewChild('systemInv') systemInv: TemplateRef<any>;
  @ViewChild('bugSearch') bugSearch: TemplateRef<any>;
  @ViewChild('orderStatus') orderStatus: TemplateRef<any>;
  @ViewChild('activeIq') activeIq: TemplateRef<any>;
  @ViewChild('aseCorner') aseCorner: TemplateRef<any>;
  @ViewChild('guidedProSolv') guidedProSolv: TemplateRef<any>;
  @ViewChild('partRequest') partRequest: TemplateRef<any>;
  @ViewChild('contracts') contractsandWarranties: TemplateRef<any>;
  @ViewChild('softwareDownload') softwareDownload: TemplateRef<any>;
  @ViewChild('cases') cases: TemplateRef<any>;
  @ViewChild('container', { read: ElementRef }) container: ElementRef;


  scroll: any;
  private draggedParentNode: any = [];
  private draggedParentId: any = [];
  private deviceInfo = null;
  private isDragged = false;
  private isDropped = false;
  private isMovedOut = false;
  private isDropping = false;

  show_SYST_WID_PlaceHolder: boolean = false;
  show_ORDR_WID_PlaceHolder: boolean = false;
  show_AUTO_WID_PlaceHolder: boolean = false;
  show_CASE_WID_PlaceHolder: boolean = false;
  show_GDPS_WID_PlaceHolder: boolean = false;
  show_PART_WID_PlaceHolder: boolean = false;
  show_SOFT_WID_PlaceHolder: boolean = false;
  show_BUG_WID_PlaceHolder: boolean = false;
  show_ASE_WID_PlaceHolder = false;
  show_CNW_WID_PlaceHolder: boolean = false;
  completeList: Array<any> = [];
  mobViewList: Array<any> = [];

  constructor(private dragulaService: DragulaService, private deviceService: Ng2DeviceService,
    private util: SpogUtils, private dataWrapper: DashboardDataWrapper) {

    const id = util.getCookie('userName');
    if (!util.isNullOrUndefined(id)) {
      this.userId = id;
    }
    const isInternal = util.getCookie('IsInternal');
    console.log('User Id:: ' + this.userId + ':: internal:: ' + isInternal);

    // getting widgets user preference
   /* this.dataWrapper.getUserWidgetsPreference(this.userId, isInternal).subscribe(response => {
      if (!this.util.isNullOrUndefined(response)) {
        this.isProgress = false;
        if (response.statusCode === 200) {
          this.firstList = response.firstList;
          this.secondList = response.secondList;
          this.ut = response.ut;
          this.fullName = response.fullName;
        } else if (response.statusCode === 400) {
          this.errorMsg = response.errorMessage;
          console.log('User Preference:: ' + response.errorMessage);
        }
      }
    });*/

    // Dragula Drag/Drop/Over/Out event handlers - Start
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[1]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
    // Dragula Drag/Drop/Over/Out event handlers - Ends
  }

  /*
  * Function Name - getDeviceType
  * Param - NA
  * Return - String - For browser "unknown". For mobile "android/iphone/ipad" 
  * Purpose -  To return the type of device [whether browser or mobile] user is using.  
  */
  private getDeviceType() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    return this.deviceInfo.device;
  }

  ngAfterViewInit() {
    /*  console.log("inside after view init");
      for (var idx = 0; idx < this.mobViewList.length; idx++ ) {
        document.getElementById('mobileView').appendChild(this.mobViewList[idx]);
       } */

  }

  /*
  * Function Name - getDraggedWidgetParent
  * Param - NA
  * Return - Return the Parent Element Node of Dragula List from where Widget is Dragged
  */
  private getDraggedWidgetParent() {
    return this.draggedParentNode;
  }

  /*
  * Function Name - setDraggedWidgetParent
  * Param - Parent Element Node
  * Purpose - Set the Parent Node of Dragula List from where Widget is Dragged
  */
  private setDraggedWidgetParent(parentNode: any) {
    this.draggedParentNode = parentNode;
  }

  /*
  * Function Name - getDraggedParentId
  * Param - NA
  * Return - Get the id of Parent Node of Dragula List from where Widget is Dragged
  */
  private getDraggedParentId() {
    return this.draggedParentId;
  }

  /*
  * Function Name - setDraggedParentId
  * Param - NA
  * Purpose - Set the id of Parent Node of Dragula List from where Widget is Dragged
  */
  private setDraggedParentId(parentId: any) {
    this.draggedParentId = parentId;

  }

  /*
  * Function Name - getElementIndex
  * Param - NA
  * Return - Get the position/index of Widget/Child Element Node of Dragula List which is Dragged/Dropped   
  */
  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el);
  }

  /*
  * Function Name - getParentElement
  * Param - NA
  * Return - Get the Parent Node of Widget/Child Element Node of Dragula List where it is being Dropped   
  */
  private getParentElement(el: any) {
    return el.parentElement;
  }

  /* private getParentLastElement(el: any) {
     return el.parentElement.lastChild;
   } */

  /*
  * Function Name - setPlaceHolder
  * Param - Individual Widget ID, PlaceHolder Flag
  * Purpose - To show/hide the widget placeholder during drag/drop event
  */
  private setPlaceHolder(widgetId: string, placeHolderFlag: boolean) {
    switch (widgetId) {
      case 'syst_wid': this.show_SYST_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'ordr_wid': this.show_ORDR_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'auto_wid': this.show_AUTO_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'case_wid': this.show_CASE_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'gdps_wid': this.show_GDPS_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'part_wid': this.show_PART_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'soft_wid': this.show_SOFT_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'bug_wid': this.show_BUG_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'ase_wid': this.show_ASE_WID_PlaceHolder = placeHolderFlag;
        break;
      case 'cnw_wid': this.show_CNW_WID_PlaceHolder = placeHolderFlag;
        break;
    }
  }


  /*
  * Function Name - onDrag
  * Param - args [Event object of Dragged Widget]
  * Purpose - On Drag of widget we will capture the dragged widget's ID and position and also Parent Node and ID  
  */
  private onDrag(args) {
    let [e, el] = args;
    this.isDragged = true;
    this.isMovedOut = false;
    this.isDropping = true;
    this.setPlaceHolder(e.id, true);
    let index = this.getElementIndex(e);
    let parentElement = this.getParentElement(e);
    this.setDraggedParentId(parentElement.id);
    this.setDraggedWidgetParent(parentElement);
  }

  /*
  * Function Name - onDrop
  * Param - args [Event object of Dragged Widget]
  * Purpose - On Drop of widget we will get index of dropped widget position, its Parent ID, 
  *           Dragged Parent ID and device type
  */
  private onDrop(args) {
    let [e, el] = args;
    this.isDragged = false;
    this.isDropping = false;
    this.isDropped = true;
    this.setPlaceHolder(e.id, false);
    let index = this.getElementIndex(e);
    let parentElement = this.getParentElement(e);
    let draggedParentId = this.getDraggedParentId();
    let dropParentId = parentElement.id

    let draggedParent = this.getDraggedWidgetParent();
    let deviceType = this.getDeviceType();
    if (deviceType == 'unknown' && dropParentId != draggedParentId) {
      let lastChildNode: Node = parentElement.lastElementChild;
      draggedParent.appendChild(lastChildNode);
    }
    this.saveUserPreferenceWidgets();
  }

  // save user selection widgets in dashboard
  private saveUserPreferenceWidgets() {
    const containerElm = this.container.nativeElement;
    const colOne = containerElm.querySelector('#list1').children;
    const colTwo = containerElm.querySelector('#list2').children;
    const widFirstList = { 'columnSeq': 1, 'list': this.createWidgetJson(colOne) }
    const widSecondList = { 'columnSeq': 2, 'list': this.createWidgetJson(colTwo) }
    const widget = [];
    widget.push(widFirstList, widSecondList);

    this.dataWrapper.saveUserPreferenceWidgets(this.userId, {
      'widgets': widget,
      'userType': this.ut
    }).subscribe(response => {
      if (response.statusCode === 400) {
        this.errorMsg = response.errorMessage;
        console.log('Save User Preference:: ' + response.errorMessage);
      }
    });
  }// end_of_saveUserPreferenceWidgets

  // Creating widgets preference object to save to DB
  private createWidgetJson(col: any) {
    const list = [];
    for (let i = 0; i < col.length; i++) {
      const li = {};
      li['widgetSeq'] = i + 1;
      li['widgetName'] = col[i].getAttribute('name');
      list.push(li);
    }
    return list;
  }// end_of_createWidgetJson

  private onOver(args) {
    let [e, el, container] = args;
  }

  private onOut(args) {
    let [e, el, container] = args;
    //   console.log("isDragged is "+this.isDragged+" this.isDropping "+this.isDropping+" this.isDropped "+this.isDropped);
    if (this.isDragged && this.isDropping && !this.isDropped) {
      this.setPlaceHolder(e.id, false);
    }
  }


  ngOnInit() {

    let drake = dragula();
    this.dragulaService.add('first-bag', drake);

    this.scroll = autoScroll(
      // can also be an array of elements if they're { overflow: auto; max-height: XXpx } containers.
      // i.e. [someViewChild.nativeElement]
      window,
      {
        margin: 30,
        maxSpeed: 25,
        scrollWhenOutside: true,

        autoScroll: function () { // don't use () => {} syntax, we want to keep the 'this'
          // Only scroll when the pointer is down, and there is a child being dragged. 
          return this.down; // && drake.dragging;
        }
      });

  }

  touchmove() {
    // do nothing
  }

  ngOnDestroy() {
    this.dragulaService.destroy('first-bag');
    this.scroll.destroy();
  }

  // getting the template name
  getTemplateType(type: string) {
    if (type === 'systemInv') {
      return this.systemInv;
    } else if (type === 'bugSearch') {
      return this.bugSearch;
    } else if (type === 'orderStatus') {
      return this.orderStatus;
    } else if (type === 'activeIq') {
      return this.activeIq;
    } else if (type === 'aseCorner') {
      return this.aseCorner;
    } else if (type === 'guidedProSolv') {
      return this.guidedProSolv;
    } else if (type === 'partRequest') {
      return this.partRequest;
    } else if (type === 'softwareDownload') {
      return this.softwareDownload;
    } else if (type === 'cases') {
      return this.cases;
    } else if (type === 'contracts') {
      return this.contractsandWarranties;
    }
  }

}
