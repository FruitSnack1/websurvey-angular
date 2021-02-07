import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultQuestionSingleComponent } from "./result-question-single.component";

describe("QuestionComponent", () => {
  let component: ResultQuestionSingleComponent;
  let fixture: ComponentFixture<ResultQuestionSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultQuestionSingleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultQuestionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
