import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-product-type , [product-type]',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

    data: any;
  
    localcolors: any = ['#A7D500','#96BE01','#6D8C00','#546B00','#BAE6F9','#8DC8E8','#48ABF3'] ;
    productChartData: any[] ;  
    productChartLabels: any;  
    productChartOptions: any;
    productChartColors: Array<any> ;

    productChartname = "productChart";
  
    constructor() { }
  
    ngOnInit() {

      this.productChartOptions =  {
        scaleShowVerticalLines: false,
        responsive: true
      }; 
      
      // this.productChartData = [
      //   {
      //     data: [225,50,25,50,25,15,35], 
      //     label: 'Series B'      
      //   }];
      this.productChartData = [225,50,25,50,25,15,35];
      this.productChartLabels =  ['FAS','AFF','EF-Series','Other','SnapManager','CloudONTAP','Other'];
    //   this.productChartColors =  [{
    //     backgroundColor: this.localcolors
    //  }];
    this.productChartColors = this.localcolors;
          
     console.log(this.productChartname);
    }
  
   public getcolor(id: any){ 
     return this.localcolors[id];
   }
  
   public getDataValue(id: any){ 
    return this.productChartData[0].data[id];
  }
  
}
