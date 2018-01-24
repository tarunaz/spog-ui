import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ApiHelperService } from "../api-helper.service";

@Injectable()
export class ActiveiqService {
    systempath: string;
    capacitypath: string;
    constructor(public apiService: ApiHelperService) { }

    //  public getActiveIQService(): Observable<Response> {
    //     return this.http.get("assets/api/external/activeiq/system-health/system-health.json")
    //     .map((response: Response) => { return response.json();});
    //     }

    public getActiveIQService(): Observable<any> {
        var customerid = sessionStorage.getItem("customerID");
        var siteid = sessionStorage.getItem("siteID");
        var rootpath = "/systemhealth";
        var params = { 'userType': 'NSS_EXT' };
        var id = sessionStorage.getItem("id");
        if (siteid) {
            this.systempath = rootpath + "/site/" + JSON.parse(siteid);
            console.log("path" + this.systempath)
        }
        else {
            this.systempath = rootpath + "/customer/" + JSON.parse(customerid) + "/" + id;
            console.log("path" + this.systempath)
        }
        return this.apiService.getData(this.systempath, params);

    }


    /*public getSystemHealthService(): Observable<any> {
        return this.apiService.get("/activeiq");
    }*/
    public getCapacityService(): Observable<any> {
        var customerid = sessionStorage.getItem("customerID");
        var siteid = sessionStorage.getItem("siteID");
        var rootpath = "/capacity";
        var id = sessionStorage.getItem("id");
        var params = { 'userType': 'NSS_EXT' };
        if (siteid) {
            this.capacitypath = rootpath + "/site/" + JSON.parse(siteid);
        }
        else {
            this.capacitypath = rootpath + "/customer/" + JSON.parse(customerid) + "/" + id;
        }
        return this.apiService.getData(this.capacitypath, params);

    }

    public getEfficiencyService(): Observable<any> {
        return this.apiService.get("/efficiency");
    }

    public getPerformanceService(): Observable<any> {
        return this.apiService.get("/performance");
    }
}