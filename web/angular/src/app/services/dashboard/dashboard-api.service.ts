import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { AsyncSubject } from 'rxjs';

import { ApiHelperService } from '../api-helper.service';
import { SpogUtils } from '../../common/spog-utils';

@Injectable()
export class DashboardApiService {

  subscription: any;
  subscriptionPost: any;

  constructor(private apiHelperService: ApiHelperService, private util: SpogUtils) {

  }

  // function to get user widgets preference from hapi service(Mongo db)
  public getUserWidgetsPreference(userName: string, isInternal: string): Observable<any> {
    const subject = new AsyncSubject();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    const params = { 'userType': 'NSS_INT' };
    if (this.util.isNullOrUndefined(isInternal) || isInternal === 'false' || isInternal == '') {
      params.userType = 'NSS_EXT';
    }

    this.subscription = this.apiHelperService.getData('/users/' + userName + '/preference', params)
      .subscribe(data => {// success block
        subject.next(data);
        subject.complete();
      },
      error => { // error block
        subject.next({ 'statusCode': 400, 'errorMessage': error.error.message });
        subject.complete();
      });
    return subject;
  }// end_of_getUserWidgetsPreference


  // Save user widgets selection to mongo db
  public saveUserPreferenceWidgets(userName: string, body: any): Observable<any> {
    const subject = new AsyncSubject();

    if (this.subscriptionPost) {
      this.subscriptionPost.unsubscribe();
    }

    this.subscriptionPost = this.apiHelperService.post('/users/' + userName + '/preference/widgets', body)
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
