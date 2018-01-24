import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { ApiHelperService } from "../api-helper.service";
const GET_NOTICE_API = "/notice";

@Injectable()
export class NoticeService {
  constructor(public apiService: ApiHelperService) { }
  public getNoticeService(): Observable<any> {
    var subject = new AsyncSubject(); 
    let ret = this.apiService.get(GET_NOTICE_API).subscribe(data =>{ 
        subject.next(data["data"]); // store value
        subject.complete();
        });
        return subject;
    }
}