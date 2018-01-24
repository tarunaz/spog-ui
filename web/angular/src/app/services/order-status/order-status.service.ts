import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiHelperService } from "../api-helper.service";

@Injectable()
export class OrderstatusService {

  constructor(public apiService: ApiHelperService) { }

  public getOrderStatusService(): Observable<any> {
    return this.apiService.get("/orderstatus")

  }
}
