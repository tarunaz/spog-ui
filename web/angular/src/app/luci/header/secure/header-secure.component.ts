import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-secure',
  templateUrl: './header-secure.component.html',
  styleUrls: ['./header-secure.component.css']
})

export class HeaderSecureComponent {
  @Input()
  fullName = '';

  constructor() { }

    ngOnInit() {
    }
}