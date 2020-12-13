import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducationInformationComponent } from './add-education-information.component';

describe('AddEducationInformationComponent', () => {
  let component: AddEducationInformationComponent;
  let fixture: ComponentFixture<AddEducationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEducationInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEducationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
