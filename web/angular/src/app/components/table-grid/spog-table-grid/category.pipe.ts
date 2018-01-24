import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'bookfilter',
    pure: false
})
export class BookFilterPipe implements PipeTransform {
  transform(items, filter) {
    
 //   console.log(Object.keys(filter).length);
    if (!items || Object.keys(filter).length ==0) {
      return items;
    }

    console.log(filter);
    console.log(Object.keys(filter).length-1);
    var highest = filter[ Object.keys(filter).sort().pop() ];
    //console.log(highest);

   // 

  //  console.log(highest)
    for(let key in filter){
    //  console.log( key+' items '+filter[key] );
    if(key =="serialNumber"){
      return items.filter(item => item[key].linkText.toLowerCase().indexOf(filter[key].toLowerCase()) !== -1); 

    }
      return items.filter(item => item[key].toLowerCase().indexOf(filter[key].toLowerCase()) !== -1); 
    

      // if(key == (filter[Object.keys(filter).length-1])){
      //   console.log(key+' items '+filter[key]);
      // }

    }
    //filter = [];
 //   return items.filter(item => item.productFamily.toLowerCase().indexOf(filter.toLowerCase()) !== -1); 

    // console.log(items);
    // console.log(filter);
    // console.log(filter.length);

     
    // filter items array, items which match and return true will be kept, false will be filtered out
    //\return items.filter(item => item.productFamily.toLowerCase().indexOf(filter.toLowerCase()) !== -1); 
   // return items.filter((item) => this.applyFilter(item, filter));


  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
  applyFilter(book, filter): boolean {
    // for (let field in filter) {
    //   if (filter[field]) {
    //     if (typeof filter[field] === 'string') {
    //       if (book[field].indexOf(filter[field]) === -1) {
    //         return false;
    //       }
    //     } else if (typeof filter[field] === 'number') {
    //       if (book[field] !== filter[field]) {
    //         return false;
    //       }
    //     }
    //   }
    // }
    return true;
  }
}