import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';

import { BugSearchDataWrapper } from './bug-search-data-wrapper';
import { Constants } from '../../common/constants';
import { SpogUtils } from '../../common/spog-utils';
import { LocalizationService } from '../../services/localization/localization.service';

@Component({
  selector: 'app-bug-search',
  templateUrl: './bug-search.component.html',
  styleUrls: ['./bug-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BugSearchComponent implements OnInit {

  keyFilteredList = [];
  bugIdFilteredList = [];
  isIdsProgress = false;
  isKeysProgress = false;

  allBugToolsUrl: string;

  requiredAttrsBugId = {
    'placeHolder': this.constants.bugIdPlaceHolder, 'noAfterFilterStart': 3,
    'templateType': 'bugId', 'isError': false
  };
  requiredAttrsKeyWord = {
    'placeHolder': this.constants.bugKeyPlaceHolder, 'noAfterFilterStart': 3,
    'templateType': 'bugKey', 'isError': false
  };
  nssBaseUrl: string;


  constructor(private bugSearchDataWrapper: BugSearchDataWrapper, private constants: Constants, private util: SpogUtils, private localizationservice: LocalizationService) {
    this.nssBaseUrl = environment.supportSite;
  }

  ngOnInit() {
    this.allBugToolsUrl = this.nssBaseUrl + this.constants.allBugToolsUrl;
  }
  get(key){
    return this.localizationservice.get(key);
       
   }
  keyWordSubmit(filter: object) {
    const en = encodeURIComponent(filter['searchVals']);
    const keyWordSearchUrl = this.constants.bugKeyWordSearchUrl + en;
    this.onNavigate(keyWordSearchUrl);
  }

  bugIdSubmit(filter: object) {
    const en = encodeURIComponent(filter['searchVals']);
    const queryArray = filter['searchVals'].split(',');
    let keyWordSearchUrl;
    if (queryArray !== undefined && queryArray.length === 1) {
      keyWordSearchUrl = this.constants.bugIdDetailsUrl + en;
    } else if (queryArray !== undefined && queryArray.length > 1) {
      keyWordSearchUrl = this.constants.bugIdsListUrl + en;
    }

    this.onNavigate(keyWordSearchUrl);
  }

  onNavigate(url) {
    window.open(this.nssBaseUrl + url, '_blank');
  }

  bugIdSearch(filter: object) {
    const lastQuery = filter['queryString'];
    if (lastQuery !== '' && lastQuery.length > 0) {
      this.isIdsProgress = true;
      this.bugIdFilteredList = [];
      this.bugSearchDataWrapper.getBugIdsSearch(lastQuery).subscribe(response => {
        this.isIdsProgress = false;
        if (!this.util.isNullOrUndefined(response)) {
          if (response.statusCode === 200) {
            this.bugIdFilteredList = response['results'];
          } else if (response.statusCode === 400) {
            this.requiredAttrsBugId.isError = true;
            this.requiredAttrsBugId['errorMessage'] = this.constants.bugSearchError;
            this.bugIdFilteredList = [];
          }
        } else {
          this.bugIdFilteredList = [];
        }
      });
    } else {
      this.bugIdFilteredList = [];
    }
  }

  keyWordSearch(filter: object) {
    const lastQuery = filter['queryString'];
    if (lastQuery !== '' && lastQuery.length > 0) {
      this.isKeysProgress = true;
      this.bugSearchDataWrapper.getKeywordsSearch(lastQuery).subscribe(response => {
        this.isKeysProgress = false;
        if (!this.util.isNullOrUndefined(response)) {
          if (response.statusCode === 200) {
            this.keyFilteredList = response['results'];
          } else if (response.statusCode === 400) {
            this.requiredAttrsKeyWord.isError = true;
            this.requiredAttrsKeyWord['errorMessage'] = this.constants.bugSearchError;
            this.keyFilteredList = [];
          }
        } else {
          this.keyFilteredList = [];
        }
      });
    } else {
      this.keyFilteredList = [];
    }
  }

  // click on each item from dropdown navigate to support site
  keyWordLinkClick(item: object) {
    if (!this.util.isNullOrUndefined(item['param'])) {
      const url = this.constants.bugKeyWordSearchUrl + item['param'];
      this.onNavigate(url);
    }
  }

  // click on each item from dropdown navigate to support site
  bugIdLinkClick(item: object) {
    if (!this.util.isNullOrUndefined(item['param'])) {
      const url = this.constants.bugIdDetailsUrl + item['param'];
      this.onNavigate(url);
    }
  }

}
