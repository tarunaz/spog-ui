import { NgModule }      from '@angular/core';
import { SortPipe, FilterPipe, HighlightPipe }          from './pipe.component';

@NgModule({
    imports:        [],
    declarations:   [SortPipe, FilterPipe, HighlightPipe],
    exports:        [SortPipe, FilterPipe, HighlightPipe],
})

export class PipeModule {

  static forRoot() {
     return {
         ngModule: PipeModule,
         providers: [],
     };
  }
} 