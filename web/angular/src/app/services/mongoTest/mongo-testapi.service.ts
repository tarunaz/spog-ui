import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { environment } from "environments/environment";
import 'rxjs/add/operator/map';
import { ApiHelperService } from "../api-helper.service";
const SAVE_MONGO_API = "/mongoTest/addToMongo";
const GET_MONGO_API = "/mongoTest/getFromMongo";


@Injectable()
export class MongoTestapiService {

  //readonly BASEURL: string =  "http://localhost:8082/api";

  constructor(public apiService: ApiHelperService) {
  }


  public saveDataToMongo(): Observable<Response> {
    //let newTask = { task: "New task", status: "complete" };
    //let userPref = {};
    let widgets = { "widgets" : [["widget1"], ["widget2"]] };
    //let body = JSON.stringify({"task": "Insert to Mongo", "status": "complete"});
    //let body = JSON.stringify(newTask);
    console.log("body: " + widgets);
    ///
    return this.apiService.post("/users/100/preference/widgets", widgets);
  }

  public getDataFromMongo(): Observable<Response> {
    //var requesturl = this.BASEURL + GET_MONGO_API;
    //console.log('calling apiservice - '+ requesturl );
    let ret = this.apiService.get("/users/100/preference");
    console.log(JSON.stringify(ret));
    return ret;      
  }
}

