
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PartRequestsWidgetComponent } from '../../widgets/part-requests/part-requests-widget.component'

fdescribe('PartRequestsWidgetComponent', () => {
  let component: PartRequestsWidgetComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper,
      ],
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

});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-part-requests-widget> </app-part-requests-widget>'
})
class TestComponentWrapper {

}

