import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSupportWidgetComponent } from './auto-support-widget.component';

describe('AutoSupportComponent', () => {
  let component: AutoSupportWidgetComponent;
  let fixture: ComponentFixture<AutoSupportWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSupportWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSupportWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
