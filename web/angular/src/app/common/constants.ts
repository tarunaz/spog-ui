import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    bugKeyWordSearchUrl: string;
    bugIdsListUrl: string;
    bugIdDetailsUrl: string;
    allBugToolsUrl: string;
    serverError: string;
    emptyFielderror: string;
    bugIdPlaceHolder: string;
    bugKeyPlaceHolder: string;
    bugSearchError: string;


   constructor() {
        this.bugKeyWordSearchUrl = '/search?sort=rel&start=0&access=a&client=internal&site=gs&requiredfields=cot%3Abug&partialfields=&exp=def&q=';
        this.bugIdsListUrl = '/NOW/cgi-bin/bol?Type=Quick&bugs=';
        this.bugIdDetailsUrl = '/NOW/cgi-bin/bol?Type=Detail&Display=';
        this.allBugToolsUrl = '/NOW/cgi-bin/bol/';
        this.serverError = 'Error in processing your Request, Please try after some time.';
        this.emptyFielderror = 'Please enter a value to search.';
        this.bugIdPlaceHolder = 'Enter Bug ID(s)...';
        this.bugKeyPlaceHolder = 'Enter Bug Key Word(s)...';
        this.bugSearchError = 'Session has expired, Please try to refresh you page.';
        }

   }
