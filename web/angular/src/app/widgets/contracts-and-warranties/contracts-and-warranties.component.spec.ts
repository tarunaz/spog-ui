import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsAndWarrantiesComponent } from './contracts-and-warranties.component';

describe('ContractsAndWarrantiesComponent', () => {
  let component: ContractsAndWarrantiesComponent;
  let fixture: ComponentFixture<ContractsAndWarrantiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsAndWarrantiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsAndWarrantiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
