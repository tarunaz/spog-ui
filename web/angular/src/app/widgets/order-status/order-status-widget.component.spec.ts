import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrderStatusWidgetComponent } from './order-status-widget.component';
import { By } from '@angular/platform-browser';

fdescribe('OrderStatusWidgetComponent', () => {
  let component: OrderStatusWidgetComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-order-status-widget></app-order-status-widget>'
})
class TestComponentWrapper {

}


