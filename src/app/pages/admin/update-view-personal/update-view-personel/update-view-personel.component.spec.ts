import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateViewPersonelComponent } from './update-view-personel.component';

describe('UpdateViewPersonelComponent', () => {
  let component: UpdateViewPersonelComponent;
  let fixture: ComponentFixture<UpdateViewPersonelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateViewPersonelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateViewPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
