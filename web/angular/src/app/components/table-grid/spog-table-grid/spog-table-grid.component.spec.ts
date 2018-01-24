import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpogTableGridComponent } from './spog-table-grid.component';

describe('SpogTableGridComponent', () => {
  let component: SpogTableGridComponent;
  let fixture: ComponentFixture<SpogTableGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpogTableGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpogTableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
