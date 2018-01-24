import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareDownloadsWidgetComponent } from './software-downloads-widget.component';

describe('SoftwareDownloadsWidgetComponent', () => {
  let component: SoftwareDownloadsWidgetComponent;
  let fixture: ComponentFixture<SoftwareDownloadsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareDownloadsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareDownloadsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
