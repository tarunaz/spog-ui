import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { PipeModule } from '../pipe/pipe.module';
import { SpogAutoCompleteComponent } from './spog-autocomplete.component';
import { Constants } from '../../common/constants';

describe('SpogAutocompleteComponent', () => {
  let component: SpogAutoCompleteComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, PipeModule.forRoot()],
      declarations: [
        TestWrapperComponent,
        SpogAutoCompleteComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        Constants
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list in dropdown', () => {
    expect(component.filteredList.length)
      .toEqual(6);
  });

  it('should display options in dropdown', () => {
    component.lastQuery = '';
    expect(element.querySelector('.n-type-ahead__menu'))
      .not.toBeNull();
    const dropdownEle = element.querySelector('.display-option');
    expect(element.querySelector('.display-option'))
      .not.toBeNull();
    expect(dropdownEle.innerHTML)
      .toEqual(component.filteredList[0].name);
  });

  it('On typing should Filter & show spinner', () => {
    const filterStr = '1100';
    const inputElement = element.querySelector('.n-type-ahead__input');
    expect(inputElement)
      .not.toBeNull();
    inputElement.value = filterStr;
    inputElement.dispatchEvent(new Event('input'));
    component.isProgress = true;
    expect(component._isProgress).toBe(true);
    const act = element.querySelector('.n-type-ahead__action');

    component.query = filterStr;
    const termInputDbg = fixture.debugElement.query(By.css('input[name="search"]'));
    const evt = document.createEvent('Event');
    evt.initEvent('keyup', true, false);
    termInputDbg.triggerEventHandler('keyup', null);
    termInputDbg.nativeElement.dispatchEvent(evt);

    spyOn(component, 'filter');
    fixture.detectChanges();
    termInputDbg.nativeElement.dispatchEvent(new Event('keyup'));
    fixture.whenStable().then(() => {
      expect(component.filter).toHaveBeenCalled();
      expect(component.filteredList.length).toEqual(2);
    });
  });

  it('should able to select option from dropdown', () => {
    const select = '11004';
    const eve = {};
    eve['target'] = { 'checked': true };
    component.select(eve, select);
    expect(component.query)
      .toEqual(select);
  });

  it('should able to submit input', () => {
    const select = '11004';
    const eve = {};
    eve['target'] = { 'checked': true };
    component.select(eve, select);
    expect(component.query).toEqual(select);
    const meve = new Event('MouseEvent');
    component.filterSubmit(meve);
  });

  it('should able to hide dropdown', () => {
    component.onClickedOutside(null);
    expect(component.closeDropdown).toBeFalsy();
  });

  it('Without selecting any option clicks on submit should show error', () => {
    component.query = '';
    const eve = new Event('MouseEvent');
    component.filterSubmit(eve);
    expect(component.requiredAttrs['isError']).toBeTruthy();
    expect(component.requiredAttrs['errorMessage']).not.toBeNull();
  });

  it('should navigate to nss on click on link', () => {
    component.query = '';
    const filterStr = '1100';
    const inputElement = element.querySelector('.n-type-ahead__input');
    inputElement.value = filterStr;
    inputElement.dispatchEvent(new Event('input'));
    component.isProgress = true;
    expect(component._isProgress).toBe(true);
    spyOn(component, 'navigate');
    const ele = element.querySelector('.display-option');
    ele.click();
    expect(ele).not.toBeNull();
    expect(component.navigate).toHaveBeenCalled();
  });

  it('should call select click on checkbox', () => {
    const filterStr = '1100';
    const inputElement = element.querySelector('.n-type-ahead__input');
    inputElement.value = filterStr;
    inputElement.dispatchEvent(new Event('input'));
    component.isProgress = true;
    expect(component._isProgress).toBe(true);
    spyOn(component, 'select');
    const ele = element.querySelector('.spog-checkbox');
    ele.click();
    expect(ele).not.toBeNull();
    expect(component.select).toHaveBeenCalled();
  });

});



// Defining wrapper component to execute <app-spog-autocomplete></app-spog-autocomplete>
@Component({
  selector: 'app-test-wrapper-component',
  template: `
            <app-spog-autocomplete
            [requiredAttrs]="requiredAttrsBugId"
            [filteredList]='bugIdFilteredList'
            (search)='bugIdSearch($event)'
            (submit)='bugIdSubmit($event)'
            [isProgress]="isIdsProgress"
            (linkClick)='bugIdLinkClick($event)'>
          </app-spog-autocomplete>
          `
})
class TestWrapperComponent {
  isIdsProgress = false;
  avilableList = [{ 'name': '11004', 'type': 'suggest' }, { 'name': '1000420', 'type': 'suggest' }, { 'name': '1000585', 'type': 'suggest' },
  { 'name': '1000848', 'type': 'suggest' }, { 'name': '1100904', 'type': 'suggest' }, { 'name': '200014', 'type': 'suggest' }];
  bugIdFilteredList = this.avilableList;


  requiredAttrsBugId = {
    'placeHolder': 'Enter Bug ID(s)...', 'noAfterFilterStart': 3,
    'templateType': 'bugId', 'isError': false
  };

  bugIdSubmit(filter: object) {

  }

  bugIdSearch(filter: object) {
    const lastQuery = filter['queryString'];
    this.isIdsProgress = true;
    this.bugIdFilteredList = this.avilableList.filter(function (el) {
      return el.name.toLowerCase().indexOf(lastQuery.toLowerCase()) > -1;
    }.bind(this));
  }

  bugIdLinkClick(filter: object) {
  }


}
