import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isUndefined } from 'util';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class ApiHelperService {
  // readonly baseUrl: string = environment.apiUrl;

  constructor(public httpService: HttpClient, public windowRef: WindowRefService) { }

  public get(path: string): Observable<any> {
    // console.log("endpoint: " + this.windowRef.nativeWindow.app.apiBase);
    return this.httpService.get(environment.apiUrl + path); //  map(response => response.json());
    // return this.httpService.get(this.windowRef.nativeWindow.app.apiBase + "/api" + path).map(response => response.json());
  }

  public getPublic(path: string): Observable<any> {
    // console.log("endpoint: " + this.windowRef.nativeWindow.app.apiBase);
    return this.httpService.get(environment.apiUrlPublic + path);
    // return this.httpService.get(this.windowRef.nativeWindow.app.apiBase + "/api" + path).map(response => response.json());
  }

  public post(path: string, body: any): Observable<any> {
    // return this.httpService.post(this.windowRef.nativeWindow.app.apiBase + "/api" + path, body, optionsToSend).map(response => response.json());
    console.log('inside api-helper post');
    // return this.httpService.post(this.windowRef.nativeWindow.app.apiBase + "/api" + path, body).map(response => response.json());
    // let optionsToSend = isUndefined(options) ? new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) }) : options;
    return this.httpService.post(environment.apiUrl + path, body, 
      { headers: new HttpHeaders ({ 'Content-Type': 'application/json' })}
    );

  }

  // getting data from hapi service with multiple query parameters
  public getData(path: string, parameters: any): Observable<any> {
       let params = new HttpParams();
       const keys = Object.keys(parameters);
       if (keys.length > 0) {
          for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              params = params.append(key, parameters[key]);
          }
      }
    return this.httpService.get(environment.apiUrl + path, {params: params });
  }
}
