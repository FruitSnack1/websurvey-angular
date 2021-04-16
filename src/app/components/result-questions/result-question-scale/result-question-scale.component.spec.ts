import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultQuestionScaleComponent } from './result-question-scale.component';

describe('ResultQuestionScaleComponent', () => {
  let component: ResultQuestionScaleComponent;
  let fixture: ComponentFixture<ResultQuestionScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultQuestionScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultQuestionScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
