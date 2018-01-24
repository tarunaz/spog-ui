import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { ApiHelperService } from "../api-helper.service";

@Injectable()
export class AseCornerService {

  constructor(public apiService: ApiHelperService) { }

  public getAseCornerService(): Observable<any> {
    var subject = new AsyncSubject();
    return this.apiService.get("/asecorner");
  }
}
