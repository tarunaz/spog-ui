import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { PreLoginService } from "app/services/pre-login/pre-login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public eCMContent: any;

  constructor(private _appService: PreLoginService) { }

  ngOnInit() {

    //var EcmTop;
    this._appService.getPublicEcmContent().subscribe(data => {
      //EcmTop = data;
      this.eCMContent = data;//EcmTop;
    },
      error => console.log(error))
  }

}
