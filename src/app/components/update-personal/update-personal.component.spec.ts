import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonalComponent } from './update-personal.component';

describe('UpdatePersonalComponent', () => {
  let component: UpdatePersonalComponent;
  let fixture: ComponentFixture<UpdatePersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
