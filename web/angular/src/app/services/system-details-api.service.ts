import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


const SYSTEMINVENTORYAPI ="/sysinventory";


@Injectable()
export class SystemDetailsApiService {

  readonly BASEURL:string = "http://localhost:8082/api";

  constructor(public httpServices: Http) {   

   }

   public getSystemDetails(path): Observable<any> {
        var requesturl = this.BASEURL + path;
        console.log('calling apiservice - '+ requesturl );
        return this.httpServices.get(requesturl).map(response => response.json());      
      } 

      public getSystemhealthMockData(): Observable<any> {
        var requesturl = 'assets/systemhealth.json'; 
        console.log('calling apiservice - '+ requesturl );
        return this.httpServices.get(requesturl).map(response => response.json());      
      } 
  
}

