import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormQuestionSingleComponent } from "./form-question-single.component";

describe("QuestionSingleComponent", () => {
  let component: FormQuestionSingleComponent;
  let fixture: ComponentFixture<FormQuestionSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormQuestionSingleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
