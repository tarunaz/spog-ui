import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMoredetailComponent } from './nav-moredetail.component';

describe('NavMoredetailComponent', () => {
  let component: NavMoredetailComponent;
  let fixture: ComponentFixture<NavMoredetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMoredetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMoredetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
