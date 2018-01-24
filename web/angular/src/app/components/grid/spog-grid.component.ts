import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spog-grid',
  templateUrl: './spog-grid.component.html',
  styleUrls: ['./spog-grid.component.css']
})
export class SpogGridComponent implements OnInit {

  @Input()
  metaData: any[];

  @Input()
  records: any[];

  @Input()
  error: any;

  @ViewChild('errElement')
  element: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  //if table header width is not present in response 
  //default width is 80px
  getColumnWidth(column) {
    if (!this.isNullOrUndefined(column.width)) {
      return column.width;
    } else {
      return 80;
    }
  }

  //If displayName is not present we will dispaly columnName
  getColumnName(column) {
    if (!this.isNullOrUndefined(column.displayName) && column.displayName != "") {
      return column.displayName;
    } else {
      return column.columnName;
    }
  }

  //check if isHyperLink is present or not in response
  isHyperLink(column) {
    if (!this.isNullOrUndefined(column.isHyperLink)) {
      return column.isHyperLink;
    } else {
      return false;
    }
  }

  isbutton(column) {
    if (!this.isNullOrUndefined(column.isbutton)) {
      return column.isbutton;
    } else {
      return false;
    }
  }

  //Column is link type but data not present in response, will return empty 
  getLinkValue(record, col, attr) {
    if (!this.isNullOrUndefined(record[col.columnName])) {
      return record[col.columnName][attr];
    } else {
      return '';
    }
  }
  getbuttonValue(record, col, attr) {
    if (!this.isNullOrUndefined(record[col.columnName])) {
      return record[col.columnName][attr];
    } else {
      return '';
    }
  }
  //check if Column is link type and data present in response or not
  isLink(record, col) {
    if (!this.isNullOrUndefined(record[col.columnName]) && !this.isNullOrUndefined(record[col.columnName].link)) {
      return true;
    } else {
      return false;
    }
  }

  isError() {
    if (!this.isNullOrUndefined(this.error) && !this.isNullOrUndefined(this.error['isError'])) {
      return this.error['isError'];
    } else {
      return false;
    }
  }


  isWarn() {
    if (!this.isNullOrUndefined(this.error) && !this.isNullOrUndefined(this.error['isWarn'])) {
      return this.error['isWarn'];
    } else {
      return false;
    }
  }

  getErrorMsg() {
    this.element.nativeElement.querySelector('.errorMsg').innerHTML = this.error['errorMessage'];
  }

  //checks if the object is null/undefined
  isNullOrUndefined(val) {
    if (val != undefined && val != null) {
      return false;
    } else {
      return true;
    }
  }

}
