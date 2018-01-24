import { Component, OnInit, ElementRef, Pipe, Output, Input} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { OffClickModule } from 'angular2-off-click';
import { DemoMongoComponent } from "../../../demo-mongo/demo-mongo.component";
import { FavouriteService } from '../../../../services/favourite/favourite.service';
import { SortPipe, FilterPipe, HighlightPipe } from '../../../../components/pipe/pipe.component';
import { WidgetDropdownComponent } from '../../../../components/widget-dropdown/widget-dropdown.component';
import { ModaalPopupComponent } from '../../../../components/modaal-popup/modaal-popup.component';
@Component({
  selector: 'app-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.css']
})
export class SystemDetailsComponent implements OnInit {
  array=[];
  sum = 100;
  constructor() { 
    for (let i = 0; i < this.sum; ++i) {
      this.array.push(i);
    }
  }
  
  ngOnInit() {
  }
  onScrollDown(){
   console.log('dd');
    const start = this.sum;
    this.sum += 20;
    for (let i = start; i < this.sum; ++i) {
      this.array.push(i);
    }
  }

}
