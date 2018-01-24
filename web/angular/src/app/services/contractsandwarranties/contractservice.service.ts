import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { ApiHelperService } from '../api-helper.service';

@Injectable()
export class ContractserviceService {
    constructor(public apiService: ApiHelperService) { }

    public getContractsService(): Observable<any> {
        var subject = new AsyncSubject();
        return this.apiService.get("/contracts-and-warranties");
    }

}
