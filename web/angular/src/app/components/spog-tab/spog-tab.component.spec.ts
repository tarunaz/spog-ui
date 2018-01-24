import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpogTabComponent } from './spog-tab.component';

describe('NgTabComponent', () => {
  let component: SpogTabComponent;
  let fixture: ComponentFixture<SpogTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpogTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
