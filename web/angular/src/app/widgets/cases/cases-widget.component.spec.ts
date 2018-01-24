import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CasesWidgetComponent } from './cases-widget.component';
import { SpogGridComponent } from '../../components/grid/spog-grid.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

describe('CasesWidgetComponent', () => {
  let component: CasesWidgetComponent;
  let fixture: ComponentFixture<CasesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CasesWidgetComponent,
        SpogGridComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-cases-widget></app-cases-widget>'
})
class TestComponentWrapper {
 
}