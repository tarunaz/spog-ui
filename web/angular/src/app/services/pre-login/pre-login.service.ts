import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { ApiHelperService } from '../api-helper.service';

const GET_ECM_TOP_CONTENT_API = '/preloginContent';

@Injectable()
export class PreLoginService {
  constructor(public apiService: ApiHelperService) { }
  
  public getPublicEcmContent(): Observable<any> {
    var subject = new AsyncSubject(); 
    let ret = this.apiService.getPublic(GET_ECM_TOP_CONTENT_API).subscribe(data =>{
        subject.next(data.ecmContent);
        subject.complete();
        });
        return subject;
    }
}