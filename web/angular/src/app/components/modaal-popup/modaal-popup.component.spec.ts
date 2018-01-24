import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaalPopupComponent } from './modaal-popup.component';

describe('ModaalPopupComponent', () => {
  let component: ModaalPopupComponent;
  let fixture: ComponentFixture<ModaalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
