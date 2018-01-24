import { Component, HostListener, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice/notice.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  public noticeData: any;
  public dataList: any;

  public currentItem = 0;
  public complaints  = [];

  public hideNoticeBar : boolean = true;
  public animationleft : boolean = false;
  public animationright: boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let x = event.keyCode;
    (x === 39) ? (this.nextItem()) : ((x === 37) ? (this.prevItem()) : (null));
  }

  constructor(private _appService: NoticeService) { }

  ngOnInit(): void {
    var obj;
    this._appService.getNoticeService().subscribe(data => {
      obj = data;
      this.noticeData = obj;
      this.resDataFun(this.noticeData);
    }, error => console.log(error))
  }

  resDataFun(servicedata) {
    this.dataList = servicedata;
    this.complaints = servicedata[0];
  }

  animate(){
    let self = this;
    setTimeout(function () {
      self.animationleft = false;
    }, 400);
  }

  nextItem() {
    this.currentItem = this.currentItem + 1;
    this.complaints = this.dataList[this.currentItem];

    if (this.complaints == undefined) {
      this.currentItem = 0;
      this.complaints = this.dataList[this.currentItem];
    }
    this.animate();
  }

  prevItem() {
    this.currentItem = this.currentItem - 1;
    this.complaints = this.dataList[this.currentItem];
    if (this.complaints == undefined) {
      this.currentItem = this.dataList.length - 1;
      this.complaints = this.dataList[this.currentItem];
    }
    this.animate();
  }

  closeNoticeBar() {
    this.hideNoticeBar = false;
  }
}
