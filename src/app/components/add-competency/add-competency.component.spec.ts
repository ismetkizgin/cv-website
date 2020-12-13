import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetencyComponent } from './add-competency.component';

describe('AddCompetencyComponent', () => {
  let component: AddCompetencyComponent;
  let fixture: ComponentFixture<AddCompetencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompetencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
