import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { ApiHelperService } from "../api-helper.service";

@Injectable()
export class LocalizationService {


  constructor(public apiService: ApiHelperService) { }
  static data: any;
  static setLanguage(language: Object) {
    LocalizationService.data = language;
  }
  getLocaleLanguage(ln): Observable<any> {
    //var subject = new AsyncSubject();
    return this.apiService.getPublic("/language/" + ln);
    /*let ret = this.apiService.getPublic("/language/" + ln).subscribe(data => {
       subject.next(data); // store value
       subject.complete(); // publish only when sequence is completed      
     });
     return subject;*/
  }
  get(key) {
    let value = JSON.parse(sessionStorage.getItem("language"))[key];
    if (value) {
      return value;
    }
    else {
      return null;
    }
  }



}
