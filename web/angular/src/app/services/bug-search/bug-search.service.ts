import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { AsyncSubject } from 'rxjs';

import { ApiHelperService } from '../api-helper.service';

@Injectable()
export class BugSearchService {

  subscription: any;

  constructor(private apiHelperService: ApiHelperService) { }


  public getBugIdsSearch(lastQuery: string): Observable<any> {
    const subject = new AsyncSubject();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.apiHelperService.get('/bugIds/' + lastQuery).subscribe(data => {
      subject.next(data);
      subject.complete();
    },
    error => { // error block
      console.log(JSON.stringify(error));
      subject.next({ 'statusCode': 400, 'errorMessage': error.error.message });
      subject.complete();
    });
    return subject;
  }

  public getKeywordsSearch(lastQuery: string): Observable<any> {
    const subject = new AsyncSubject();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.apiHelperService.get('/keyWords/' + lastQuery).subscribe(data => {
      subject.next(data);
      subject.complete();
    },
    error => { // error block
      console.log(JSON.stringify(error));
      subject.next({ 'statusCode': 400, 'errorMessage': error.error.message });
      subject.complete();
    });
    return subject;
  }

}
