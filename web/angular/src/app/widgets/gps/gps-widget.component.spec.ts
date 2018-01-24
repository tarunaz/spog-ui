import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsWidgetComponent } from './gps-widget.component';

describe('GpsWidgetComponent', () => {
  let component: GpsWidgetComponent;
  let fixture: ComponentFixture<GpsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
