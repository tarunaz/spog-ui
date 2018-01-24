import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMongoComponent } from './demo-mongo.component';

describe('DemoMongoComponent', () => {
  let component: DemoMongoComponent;
  let fixture: ComponentFixture<DemoMongoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoMongoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoMongoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
