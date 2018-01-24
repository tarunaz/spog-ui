import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { AsyncSubject } from 'rxjs';

import { DashboardApiService } from '../../../../services/dashboard/dashboard-api.service';
import { SpogUtils } from '../../../../common/spog-utils'

@Injectable()
export class DashboardDataWrapper {

  constructor(private util: SpogUtils, private dashboardApiService: DashboardApiService) { }

  public getUserWidgetsPreference(userId: string, isInternal: string): Observable<any> {
    const subject = new AsyncSubject();

    this.dashboardApiService.getUserWidgetsPreference(userId, isInternal)
      .subscribe(data => {
        if (data.statusCode === 200) {
          subject.next(this.processData(data));
        } else {
          subject.next(data);
        }
        subject.complete();
      });
    return subject;
  }

  public saveUserPreferenceWidgets(userId: string, body: any): Observable<any> {
    const subject = new AsyncSubject();

    this.dashboardApiService.saveUserPreferenceWidgets(userId, body)
      .subscribe(data => {
        subject.next(data);
        subject.complete();
      });
    return subject;
  }

  processData(data: any) {
    const result = {};
    if (data.widgets[0].columnSeq === 1) {
      result['firstList'] = data.widgets[0].list;
    } else {
      result['secondList'] = data.widgets[0].list;
    }
    if (data.widgets[1].columnSeq === 2) {
      result['secondList'] = data.widgets[1].list;
    } else {
      result['firstList'] = data.widgets[1].list;
    }
    result['ut'] = data.ut;
    result['fullName'] = data.fullName;
    result['statusCode'] = 200;
    return result;
  }


}
