import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionScaleComponent } from './form-question-scale.component';

describe('FormQuestionScaleComponent', () => {
  let component: FormQuestionScaleComponent;
  let fixture: ComponentFixture<FormQuestionScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuestionScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
