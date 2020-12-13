import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberShipsListComponent } from './member-ships-list.component';

describe('MemberShipsListComponent', () => {
  let component: MemberShipsListComponent;
  let fixture: ComponentFixture<MemberShipsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberShipsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberShipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
