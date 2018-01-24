import { Component,HostListener, Pipe, PipeTransform, Directive, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ChangeEvent } from 'angular2-virtual-scroll';

@Component({
  selector: 'app-spog-table-grid',
  templateUrl: './spog-table-grid.component.html',
  styleUrls: ['./spog-table-grid.component.css'],
  host: {
    '(document:click)': 'windowsOnClick($event)',
  },
})
@Directive({
  selector: '[cicked]'
})
@HostListener("window:click", ['$event'])
export class SpogTableGridComponent implements OnInit {

  @Input()
  metaData: any[];

  @Input()
  records: any[];

  
  
  @Input()
  error: any;
          

  @ViewChild('errElement')

  numberOfRecord: number;
  limit: number;
  filter = [];
  record = {
    productToolSet:[]
  };
  constructor(public element:ElementRef) {        
  //  element: ElementRef;
   }      
  
   windowsOnClick() {
    // how can I get a reference to the currently clicked item (as a `Person` entity) ?
  //     if (!event.target.matches('.dropbtn')) {

  //   var dropdowns = document.getElementsByClassName("dropdown-content");
  //   var i;
  //   for (i = 0; i < dropdowns.length; i++) {
  //     var openDropdown = dropdowns[i];
  //     if (openDropdown.classList.contains('show')) {
  //       openDropdown.classList.remove('show');
  //     }
  //   }
  // }
   }

   selectedDropdownArray = [];
   FnselectedDropdown(index, data){
    this.manageDetailsDropdownArray[index]=false;
    this.selectedDropdownArray[index] = data;
   }


   manageDetailsDropdownArray =[];
   manageDetailsDropdown(i){
    this.manageDetailsDropdownArray = [];
     this.manageDetailsDropdownArray[i]= true;
   }


  filterSearch=[];
  ngOnInit() {
    //  console.log('this.metaData'); 
    //  console.log(this.metaData);
    //  console.log(this.metaData.length);
     this.numberOfRecord = this.metaData.length;
     this.limit = 1; 
    
     //this.FnselectedDropdown(0, 'ManageDetails');
  }

  onListChange(event: ChangeEvent){
    console.log(event);
  }
  textClick(){
    this.filter=[];
  }
  searchData=[];
  filterData(filter){
    this.filterSearch= this.filter;
    // console.log(this.filter);
    // console.log(this.filterss);  

  }
 
  myFunction(){
    this.element.nativeElement.querySelector('#myDropdown').classList.toggle("show");
  }
  titleboxArray=[];
  checkTitle(col){
    console.log(col);
    console.log(this.titleboxArray);
   let setCheck = col.display =this.titleboxArray[col.columnName];
 //  setCheck =  this.titleboxArray[col.columnName];
  }



       
   
  onScrollDown() {
    console.log('dd');
    this.limit= this.limit+1; 
  }


  //if table header width is not present in response 
  //default width is 80px
  getColumnWidth(column){
    if (!this.isNullOrUndefined(column.width)){
      return column.width;
    }else{
      return 80;
    }
  }

  //If displayName is not present we will dispaly columnName
  getColumnName(column) {
    if (!this.isNullOrUndefined(column.displayName) && column.displayName != ""){
      return column.displayName;
    }else{
      return column.columnName;
    }
  }

  //check if isHyperLink is present or not in response
  isHyperLink(column){
    if (!this.isNullOrUndefined(column.isHyperLink)){
      return column.isHyperLink;
    }else{
      return false;
    }
  }

  //Column is link type but data not present in response, will return empty 
  getLinkValue(record, col, attr){
    if(!this.isNullOrUndefined(record[col.columnName]) && col.columnName == 'serialNumber'){
      return record[col.columnName].linkText;
    } else if(!this.isNullOrUndefined(record[col.columnName]) && col.columnName == 'productToolSet') {
    var ss =[];
    ss.push(record[col.columnName]);
    return ss;
    } else
   if (!this.isNullOrUndefined(record[col.columnName])){
      return record[col.columnName];
   }else{
      return '';
   }
  }

 
 
 
  sortOrder(col){
   let that = this;
   // return false;
     let colNAME = col.columnName; 
    this.records.sort(function(a, b) {
     // sortArray
     let nameA = (a[colNAME]); // ignore upper and lowercase
     let nameB = (b[colNAME]); // ignore upper and lowercase
    // this.tempColNAME = colNAME;
     if(col.columnName =='serialNumber'){
      nameA = (a[colNAME].linkText); // ignore upper and lowercase
      nameB = (b[colNAME].linkText); // ignore upper and lowercase
     }

     let nameAUpper = nameA.toUpperCase();
     let nameBUpper = nameB.toUpperCase();

      if (nameAUpper < nameBUpper) {
        return 1;
      }
      if (nameAUpper > nameBUpper) {
        return 1;
      }
        return 0;
    });


  }

  //check if Column is link type and data present in response or not
  isLink(record, col){
    if (!this.isNullOrUndefined(record[col.columnName]) && !this.isNullOrUndefined(record[col.columnName].link)) {
      return true;
   }else{
      return false;
   }
  }
  
  isError(){
    if (!this.isNullOrUndefined(this.error) && !this.isNullOrUndefined(this.error['isError'])){
       return this.error['isError'];
    }else{
      return false;
    }
  }

  getErrorMsg(){
    this.element.nativeElement.querySelector('.errorMsg').innerHTML=this.error['errorMessage'];
  }

  //checks if the object is null/undefined
  isNullOrUndefined(val){
   if (val != undefined && val != null ){
      return false;
   }else{
      return true;
    }
  }

}
