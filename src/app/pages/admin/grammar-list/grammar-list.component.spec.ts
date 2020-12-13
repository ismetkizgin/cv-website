import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarListComponent } from './grammar-list.component';

describe('GrammarListComponent', () => {
  let component: GrammarListComponent;
  let fixture: ComponentFixture<GrammarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrammarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
