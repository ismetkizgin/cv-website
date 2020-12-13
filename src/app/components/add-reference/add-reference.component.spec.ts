import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferenceComponent } from './add-reference.component';

describe('AddReferenceComponent', () => {
  let component: AddReferenceComponent;
  let fixture: ComponentFixture<AddReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
