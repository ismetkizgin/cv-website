import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivitiesAttendedComponent } from './add-activities-attended.component';

describe('AddActivitiesAttendedComponent', () => {
  let component: AddActivitiesAttendedComponent;
  let fixture: ComponentFixture<AddActivitiesAttendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActivitiesAttendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivitiesAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
