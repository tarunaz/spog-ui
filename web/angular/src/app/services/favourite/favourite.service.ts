import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';
import { ApiHelperService } from "../api-helper.service";
import { SpogUtils } from '../../common/spog-utils';

@Injectable()
export class FavouriteService {

    subscription: any;


    constructor(public apiService: ApiHelperService, private util: SpogUtils) { }

    public getFavouriteService(userName: string, isInternal: string): Observable<any> {
        const subject = new AsyncSubject();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        const params = { 'userType': 'NSS_INT' };
        if (this.util.isNullOrUndefined(isInternal) || isInternal === 'false' || isInternal == '') {
            params.userType = 'NSS_EXT';
        }

        this.subscription = this.apiService.getData('/users/' + userName + '/favourite', params)
            .subscribe(data => {// success block
                subject.next(data);
                subject.complete();
            },
            error => { // error block
                subject.next({ 'statusCode': 400, 'errorMessage': error.error.message });
                subject.complete();
            });
        return subject;
    }
}