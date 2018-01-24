import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { ApiHelperService } from "../api-helper.service";

@Injectable()
export class PartRequestsService {
  constructor(public apiService: ApiHelperService) { }

  public getPartRequestsService(): Observable<any> {
    var subject = new AsyncSubject();
    return this.apiService.get("/partrequests");
  }

}
