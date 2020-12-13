import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberShipsComponent } from './add-member-ships.component';

describe('AddMemberShipsComponent', () => {
  let component: AddMemberShipsComponent;
  let fixture: ComponentFixture<AddMemberShipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberShipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
