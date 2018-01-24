import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AseCornerComponent } from './ase-corner.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AseCornerComponent', () => {
  let component: AseCornerComponent;
  let fixture: ComponentFixture<AseCornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AseCornerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AseCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-ase-corner></app-ase-corner>'
})
class TestComponentWrapper {

}