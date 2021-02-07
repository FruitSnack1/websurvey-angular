import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOpenSurveyComponent } from './form-open-survey.component';

describe('FormOpenSurveyComponent', () => {
  let component: FormOpenSurveyComponent;
  let fixture: ComponentFixture<FormOpenSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOpenSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOpenSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
