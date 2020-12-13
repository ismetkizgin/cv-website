import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentationComponent } from './add-documentation.component';

describe('AddDocumentationComponent', () => {
  let component: AddDocumentationComponent;
  let fixture: ComponentFixture<AddDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
