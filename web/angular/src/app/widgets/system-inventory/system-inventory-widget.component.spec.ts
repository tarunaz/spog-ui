import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInventoryWidgetComponent } from './system-inventory-widget.component';

describe('SystemInventoryWidgetComponent', () => {
  let component: SystemInventoryWidgetComponent;
  let fixture: ComponentFixture<SystemInventoryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemInventoryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemInventoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
