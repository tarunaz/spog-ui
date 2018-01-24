import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDetailsWidgetComponent } from './system-details-widget.component';

describe('SystemDetailsWidgetComponent', () => {
  let component: SystemDetailsWidgetComponent;
  let fixture: ComponentFixture<SystemDetailsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDetailsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDetailsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
