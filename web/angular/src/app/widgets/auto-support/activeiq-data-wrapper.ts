import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';


import { ActiveiqService } from '../../services/activeiq/activeiq.service'

//var Rx = require('rxjs');

@Injectable()
export class ActiveiqDataWrapper {

  constructor(public activeiqservice: ActiveiqService) { }
  systemhealthdata: object;
  //#region "Async Api call "

  //#region " ActiveIQ "
  public getActiveIqDataAsync(): Observable<any> {

    var subject = new AsyncSubject();

    this.activeiqservice.getActiveIQService().subscribe(data => {

      this.reformatSystemHealthdata(data);
      subject.next(this.reformatActiveIQData(data)); // store value
      subject.complete(); // publish only when sequence is completed      
    });

    return subject;
  }

  reformatActiveIQData(activeiqdata: any) {
    let { sitename, totalsystems, autosupportenabled } = activeiqdata.data.sitedata;

    var apiheaderdata: any;
    var nodata: any;

  
    if (autosupportenabled == "") {
      return nodata = {
        nodata: true,
        bottomlink: "https://mysupport.netapp.com/myautosupport/dist/index.html#/pages/customer/1032125/health/",
        bottomtext: "All System Health"
      }
    }

    var lblratioautoenablesystems = Math.round((parseInt(autosupportenabled) /
      parseInt(totalsystems)) * 100);

    apiheaderdata = {
      nodata :false,
      sitename,
      roottitle: autosupportenabled,
      subtitle: "of " + totalsystems + " are ACTIVE IQ enabled (" + lblratioautoenablesystems + "%)"

    };

    return apiheaderdata;

  }

  public getSystemHealthData() {
    if (this.systemhealthdata) {
      return this.systemhealthdata;
    }
    /*var subject = new AsyncSubject(); 

  };

  return apiheaderdata;


}
//#endregion

//#region "Async Api call - System Health"

public getSystemHealthDataAsync(): Observable<any> {
  var subject = new AsyncSubject();

  this.activeiqservice.getSystemHealthService().subscribe(data => {
    subject.next(this.reformatSystemHealthdata(data)); // store value
    subject.complete(); // publish only when sequence is completed      
   });
   return subject;   */
  }

  reformatSystemHealthdata(systemhealthdatasource: any) {

    let { highissues, mediumissues, lowissues, noissues, bottomtext, bottomlink, issueslink } = systemhealthdatasource.data.sitedata.systemhealth;

    let chartColors: Array<string>;
    let chartLabels: Array<string>;
    let chartData: Array<string>;
    if (noissues == "true") {

      chartLabels = ['No issues']
      chartData = ['3'];
      chartColors = ['#008000'];
    }
    else {
      chartLabels = [highissues.issuestext, mediumissues.issuestext, lowissues.issuestext];//['High Issues', 'Medium Issues', 'Low Issues'];
      chartData = [highissues.issuescount, mediumissues.issuescount, lowissues.issuescount];
      chartColors = [highissues.colorcode, mediumissues.colorcode, lowissues.colorcode]; //['#DD3851', '#F39400', '#FEDB00'];
    }
    var chartName = " SystemHealth-Donut ";
    //  let bottomlinktext = "All System Health";
    //  let bottomlinkurl = "https://mysupport.netapp.com/myautosupport/dist/index.html#/pages/customer/1032125/health/";
    //  let lnkIssues = "https://mysupport.netapp.com/myautosupport/mysystemsin.html?viewData=asup-portlet"                        
    this.systemhealthdata = {
      chartColors,
      chartData,
      chartLabels,
      chartName,
      highissues: { "count": highissues.issuescount, "color": highissues.colorcode, "text": highissues.issuestext },
      mediumissues: { "count": mediumissues.issuescount, "color": mediumissues.colorcode, "text": mediumissues.issuestext },
      lowissues: { "count": lowissues.issuescount, "color": lowissues.colorcode, "text": lowissues.issuestext },
      bottomlinktext: bottomtext,
      bottomlinkurl: bottomlink,
      issueslink
    }

  }
  //#endregion



  //#endregion


  //#region "Async Api call - Capacity"


  public getCapacityDataAsync(): Observable<any> {
    var subject = new AsyncSubject();

    this.activeiqservice.getCapacityService().subscribe(data => {
      subject.next(this.reformatCapacitydata(data))
      //subject.next(this.reformatCapacitydata(data)); // store value
      subject.complete(); // publish only when sequence is completed      
    });
    return subject;
  }

  reformatCapacitydata(capacitydatasource: any) {
    //console.log("***********>>> reformatCapacitydata" + JSON.stringify(capacitydatasource));

    let { All, onemonth, threemonths, sixmonths, bottomtext, bottomlink } = capacitydatasource.data.sitedata.capacity;

    let chartColors: Array<string> = [All.colorcode, onemonth.colorcode, threemonths.colorcode, sixmonths.colorcode]; //['#DD3851', '#F39400', '#FEDB00'];     
    let chartLabels: Array<string> = [All.capacitytext, onemonth.capacitytext, threemonths.capacitytext, sixmonths.capacitytext];//['High Issues', 'Medium Issues', 'Low Issues'];
    let chartData: Array<string> = [All.capacitycount, onemonth.capacitycount, threemonths.capacitycount, sixmonths.capacitycount];

    var chartName = " Capacity-Donut ";
    // let bottomlinktext = "All Capacity";
    // let bottomlinkurl = "https://mysupport.netapp.com/myautosupport/dist/index.html#/pages/customer/1032125/health/";
    let lnkIssues = "#";

    return {
      chartColors,
      chartData,
      chartLabels,
      chartName,
      allcapacity: { "count": All.capacitycount, "color": All.colorcode },
      onemonthcapacity: { "count": onemonth.capacitycount, "color": onemonth.colorcode },
      threemonthscapacity: { "count": threemonths.capacitycount, "color": threemonths.colorcode },
      sixmonthscapacity: { "count": sixmonths.capacitycount, "color": sixmonths.colorcode },
      bottomlinktext: bottomtext,
      bottomlinkurl: bottomlink
    }

  }


  //#endregion



  //#region "Async Api call - Efficiency"


  public getEfficiencyDataAsync(): Observable<any> {
    var subject = new AsyncSubject();

    this.activeiqservice.getEfficiencyService().subscribe(data => {
      subject.next(this.reformatEfficiencydata(data)); // store value
      subject.complete(); // publish only when sequence is completed      
    });
    return subject;
  }

  reformatEfficiencydata(efficiencydatasource: any) {


    let { improvement, working, bottomtext, bottomlink, topefficiencies } = efficiencydatasource.data.sitedata.efficiency;

    let chartColors: Array<string> = [improvement.colorcode, working.colorcode];
    let chartLabels: Array<string> = [improvement.efficiencytext, working.efficiencytext];
    let chartData: Array<string> = [improvement.efficiencycount, working.efficiencycount];

    var chartName = " efficiency-Donut ";


    //console.log("<<<<<***********>>> getEfficiencyDataAsync data" + JSON.stringify(efficiencydatasource));
    return {
      chartColors,
      chartData,
      chartLabels,
      chartName,
      improvementefficiency: { "count": improvement.efficiencycount, "color": improvement.colorcode },
      workingefficiency: { "count": working.efficiencycount, "color": working.colorcode },
      topefficiencies: topefficiencies,
      bottomlinktext: bottomtext,
      bottomlinkurl: bottomlink
    }

  }




  //#endregion



  //#region "Async Api call - Performance"

  public getPerformanceDataAsync(): Observable<any> {
    var subject = new AsyncSubject();

    this.activeiqservice.getPerformanceService().subscribe(data => {
      subject.next(this.reformatPerformancedata(data)); // store value
      subject.complete(); // publish only when sequence is completed      
    });
    return subject;
  }

  reformatPerformancedata(performancedatasource: any) {


    let { high, less, working, bottomtext, bottomlink } = performancedatasource.data.sitedata.performance;

    let chartColors: Array<string> = [high.colorcode, less.colorcode, working.colorcode];
    let chartLabels: Array<string> = [high.performancetext, less.performancetext, working.performancetext];
    let chartData: Array<string> = [high.performancecount, less.performancecount, working.performancecount];

    var chartName = " performance-Donut ";


    //console.log("<<<<<***********>>> activeiq-data-wrapper data" + JSON.stringify(performancedatasource));
    return {
      chartColors,
      chartData,
      chartLabels,
      chartName,
      highperformance: high.performancecount,
      lessperformance: less.performancecount,
      workingperformance: working.performancecount,
      bottomlinktext: bottomtext,
      bottomlinkurl: bottomlink
    }

  }




  //#endregion



}