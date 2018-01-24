import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortPipe  } from './pipe.component';

describe('OrderPipeComponent', () => {
  let component: SortPipe;
  let fixture: ComponentFixture<SortPipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
