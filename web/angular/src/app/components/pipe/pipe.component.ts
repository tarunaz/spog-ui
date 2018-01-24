import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

transform(array: Array<string>, args: string): Array<string> {
  if(array){   
    array.sort((a: any, b: any) => {     
	    if ( a[args] && b[args] && (a[args].toLowerCase() < b[args].toLowerCase() )){
	    	return -1;
	    }else if(  a[args] && b[args] && (a[args].toLowerCase() > b[args].toLowerCase() )){
	        return 1;
	    }else{
	    	// return 0;	
	    }
    });
  }
    return array ? array : [];
  }
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, filter: any, isAnd): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (filter[filterKeys[0]] == '') return items; //on page load
      if (isAnd) {
        return items.filter(item =>
          filterKeys.reduce((memo, keyName) =>
            (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
          });
        });
      }
    } else {
      return items;
    }
  }
}

@Pipe({
   name: 'highlight'
   })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    if (search && text) {
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      pattern = pattern.split(' ').filter((t) => {
        return t.length > 0;
      }).join('|');
      const regex = new RegExp(pattern, 'gi');
     
      return text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`);
    } else {
      return text;
    }
  }
}