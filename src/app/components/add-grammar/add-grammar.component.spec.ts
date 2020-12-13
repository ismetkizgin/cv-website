import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrammarComponent } from './add-grammar.component';

describe('AddGrammarComponent', () => {
  let component: AddGrammarComponent;
  let fixture: ComponentFixture<AddGrammarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGrammarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
