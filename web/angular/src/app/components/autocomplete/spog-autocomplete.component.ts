import { Component, OnInit, Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Constants } from '../../common/constants';

@Component({
  selector: 'app-spog-autocomplete',
  templateUrl: './spog-autocomplete.component.html',
  styleUrls: ['./spog-autocomplete.component.css']
})
export class SpogAutoCompleteComponent implements OnInit {

  // List to display in dropdown
  @Input()
  filteredList = [];

  // Placeholder
  @Input()
  requiredAttrs = { 'templateType': '' };

  // Flag manages spinner
  @Input()
  set isProgress(progress: boolean) {
    if (progress === false && this.filteredList.length <= 0 &&
      this._isProgress === true && !this.requiredAttrs['isError']) {
      this.isDataNotFound = true;
      const comp = this;
      setTimeout(function () {
        comp.isDataNotFound = false;
      }, 6000);
    }
    this._isProgress = progress;
  }

  get isProgress(): boolean {
    return this._isProgress;
  }

  _isProgress = false;

  @Output()
  search: EventEmitter<Object> = new EventEmitter<Object>();

  @Output()
  submit: EventEmitter<Object> = new EventEmitter<Object>();

  @Output()
  linkClick: EventEmitter<Object> = new EventEmitter<Object>();

  query = '';
  lastQuery = '';
  closeDropdown = true;
  // Delay in ms to call keyup event
  delay = 500;
  firstSelect = true;
  isDataNotFound = false;
  // After this number of chars flitering starts
  noAfterFilterStart = 1;

  isCheckBoxSelect = false;

  constructor(private elementRef: ElementRef, private consts: Constants) {
   const eventStream = Observable.fromEvent(elementRef.nativeElement, 'input')
      .map(() => this.query)
      .debounceTime(this.delay)
      .distinctUntilChanged();

    eventStream.subscribe(query =>
      this.filter()
    );
  }

  ngOnInit() {
    const nosOfChars = this.requiredAttrs['noAfterFilterStart'];
    this.noAfterFilterStart = nosOfChars - 1;
  }

  select(eve, item) {
    this.isCheckBoxSelect = true;
    if (eve.target.checked) {
      let selected = this.query.split(',');
      if (this.firstSelect) {
        selected.splice(selected.length - 1, 1)
        this.firstSelect = false;
      }
      selected.push(item);
      selected = selected.filter(each_item => each_item !== '');
      this.query = selected.toString();
    } else {
      let unChecked = this.query.split(',');
      unChecked = unChecked.filter(each_item => each_item !== item);
      this.query = unChecked.toString();
    }
    const comp = this;
    setTimeout(function(){
      comp.isCheckBoxSelect = false;
    }, 500);
  }

  filter() {
    if (this.isCheckBoxSelect) {
    return false;
    }
    if (this.query !== '') {
      this.isDataNotFound = false;
      this.requiredAttrs['isError'] = false;
      const queryArray = this.query.split(',');
      const lastQuery = queryArray[queryArray.length - 1].trim();
      if (lastQuery !== '' && lastQuery.length > this.noAfterFilterStart) {
        const filter = {};
        // adding the filtered string to filter Object
        filter['queryString'] = lastQuery;
        this.search.emit(filter);
        this.lastQuery = lastQuery;
        this.firstSelect = true;
      } else {
        this.filteredList = [];
      }
    } else {
      this.filteredList = [];
    }
    this.closeDropdown = true;
  }

  filterSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    const filter = {};
    if (this.query !== '') {
      this.filteredList = [];
      filter['searchVals'] = this.query;
      this.submit.emit(filter);
    } else {
      this.requiredAttrs['isError'] = true;
      this.requiredAttrs['errorMessage'] = this.consts.emptyFielderror;
    }
  }

  onClickedOutside(eve) {
    if (eve.target != null && eve.target !== undefined
      && eve.target.className === 'checkmark' || eve.target.className === 'bugSrcAuto') {
      this.closeDropdown = true;
    } else {
      this.closeDropdown = false;
      this.filteredList = [];
    }
  }

  navigate(item) {
    const filter = {};
    filter['param'] = item;
    this.linkClick.emit(filter);
  }

}
