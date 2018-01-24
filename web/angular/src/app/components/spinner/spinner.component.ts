import { Component, OnInit, Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit,OnChanges {

  @Input() ServiceDataFavCom: Array<any>;
  @Input() otherUser:boolean=true;

  public spinnerText: string = 'Processing...';
  public Spinner: boolean = true;

  constructor() { }

  ngOnInit() {
    
  }
  ngOnChanges() {
    if(this.ServiceDataFavCom){
      this.Spinner=false;
    }
  
}

}
