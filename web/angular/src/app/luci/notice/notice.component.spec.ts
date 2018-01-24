import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFlashComponent } from './info-flash.component';

describe('InfoFlashComponent', () => {
  let component: InfoFlashComponent;
  let fixture: ComponentFixture<InfoFlashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFlashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFlashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
