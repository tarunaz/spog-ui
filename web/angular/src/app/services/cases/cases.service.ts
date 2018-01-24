import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { ApiHelperService } from '../api-helper.service';

@Injectable()
export class CasesService {
    constructor(public apiService: ApiHelperService) { }

    public getCasesService(): Observable<any> {
        var customerid = sessionStorage.getItem("customerID");
        var siteid = sessionStorage.getItem("siteID");
        var id = sessionStorage.getItem("id");
        const params = { 'userType': 'NSS_EXT' }
        return this.apiService.getData("/cases/" + id, params);
    }

}
