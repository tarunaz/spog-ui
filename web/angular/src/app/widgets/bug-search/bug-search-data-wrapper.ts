import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { AsyncSubject } from 'rxjs';

import { BugSearchService } from '../../services/bug-search/bug-search.service';
import { SpogUtils } from '../../common/spog-utils';

@Injectable()
export class BugSearchDataWrapper {


    constructor(private bugSearchService: BugSearchService, private util: SpogUtils) { }

    public getBugIdsSearch(lastQuery: string): Observable<any> {
        const subject = new AsyncSubject();

        this.bugSearchService.getBugIdsSearch(lastQuery)
            .subscribe(data => {
                subject.next(this.processData(data));
                subject.complete();
            });
        return subject;
    }

    public getKeywordsSearch(lastQuery: string): Observable<any> {
        const subject = new AsyncSubject();

        this.bugSearchService.getKeywordsSearch(lastQuery)
            .subscribe(data => {
                subject.next(data);
                subject.complete();
            });
        return subject;
    }

    processData(data: any) {
        const final = {};
        const resultSet = [];
        if (!this.util.isNullOrUndefined(data)
            && !this.util.isNullOrUndefined(data.results)) {
            for (let i = 0; i < data.results.length; i++) {
                const keyObj = {};
                const rec = data.results[i];
                const bugId = !this.util.isNullOrUndefined(rec) ? rec['NABUGID'] : '';
                keyObj['name'] = !this.util.isNullOrUndefined(bugId) ? bugId.toString() : '';
                resultSet.push(keyObj);
            }
        }
        final['results'] = resultSet;
        final['statusCode'] = data.statusCode;
        return final;
    }

}
