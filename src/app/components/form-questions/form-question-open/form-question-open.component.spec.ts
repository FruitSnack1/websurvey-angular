import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionOpenComponent } from './form-question-open.component';

describe('FormQuestionOpenComponent', () => {
  let component: FormQuestionOpenComponent;
  let fixture: ComponentFixture<FormQuestionOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuestionOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
