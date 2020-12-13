import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesAttendedListComponent } from './activities-attended-list.component';

describe('ActivitiesAttendedListComponent', () => {
  let component: ActivitiesAttendedListComponent;
  let fixture: ComponentFixture<ActivitiesAttendedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesAttendedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesAttendedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
