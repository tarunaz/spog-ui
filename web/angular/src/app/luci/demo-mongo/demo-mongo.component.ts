import { Component, OnInit } from '@angular/core';
import { MongoTestapiService} from '../../services/mongoTest/mongo-testapi.service';

@Component({
  selector: 'app-demo-mongo',
  templateUrl: './demo-mongo.component.html',
  styleUrls: ['./demo-mongo.component.css']
})
export class DemoMongoComponent implements OnInit {

  constructor(private mongoservice: MongoTestapiService) { }
  public lastUpdated: string;

  ngOnInit() {
    this.lastUpdated = "";
  }

  saveData() {
    this.mongoservice.saveDataToMongo()
    .subscribe(responsedata => {  
      // map((res:Response) => res.json())
      //this.lastUpdated = responsedata.body;
      console.log(responsedata)
    });
  }

  readData() {
    this.mongoservice.getDataFromMongo()
    .subscribe(responsedata => {
      this.lastUpdated = JSON.stringify(responsedata);  
      console.log(responsedata)
    });
  }
}
