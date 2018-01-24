import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-support-status, [support-status]',
  templateUrl: './support-status.component.html',
  styleUrls: ['./support-status.component.css']
})

export class SupportStatusComponent implements OnInit {  
  data: any;
  supportChartData: any;  
  supportChartLabels: any;  
  supportChartColors: Array<any> ;
  supportChartOptions: any;
  localcolors: any = ['#DD3851', '#FEDB00', '#A7D500'];

  supportchartname = "supportChart";
        
  constructor() { 
  }

  ngOnInit() {

    this.supportChartOptions=  {
      scaleShowVerticalLines: false,
      responsive: true
    }; 

    // this.supportChartData =[
    //   {
    //     data: [80,160,550], 
    //     label: 'Series A'      
    //   }];
    this.supportChartData =[80,160,550];
    this.supportChartLabels =  ['Expired', 'Expiring in 60 days','Under contract'];
  //   this.supportChartColors =  [{
  //     backgroundColor: this.localcolors,
  //     borderWidth :0
  //  }];
  this.supportChartColors =  this.localcolors;
  }
  
  public getcolor(id: any){ 
    return  this.localcolors[id];
  }

  public getDataValue(id: any){ 
    return this.supportChartData[0].data[id];
  }
}
