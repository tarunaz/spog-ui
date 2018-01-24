import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'donut-chart',
  templateUrl: './donut-chart.component.html'
})

export class DonutChartComponent implements OnInit {

  constructor() { }
  @Input() chartname: any = "Donutchart_UI";
  @Input() chartdata: Array<string>;
  @Input() chartlabels: Array<string>;
  @Input() chartcolors: Array<string>;

  chartoptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  chartlegend: boolean = false;
  charttype: string = 'doughnut';

  reformatchartdata: any;
  reformatcharcolors: any;


  ngOnInit() {
    this.reformatcharcolors = [{
      backgroundColor: this.chartcolors,
      borderWidth: 0
    }];

    this.chartlegend = false;
    this.chartoptions = {
      scaleShowVerticalLines: false,
      responsive: true,

      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var donutvalue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            var donuttext = data.labels[tooltipItem.index];
            if ((donuttext) == "No issues") {
              return donuttext + " (0)";
            }
            else {
              return donuttext + " (" + donutvalue + ")";
            }
          }
        },
        backgroundColor: 'rgba(255,255,255,255)',
        bodyFontColor: '#000000',
        borderColor: '#000000',
        borderWidth: 0.5,
        displayColors: false,
        yPadding: 15,
        xPadding: 15,
        bodyFontSize: 12,
        zIndex: 999

      }
    };
    this.charttype = 'doughnut';

    var apivalues = [];
    apivalues = this.chartdata;
    var objdataformat = { data: apivalues };
    this.reformatchartdata = [];
    this.reformatchartdata.push(objdataformat);

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
