import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuestionSingleComponent } from './play-question-single.component';

describe('PlayQuestionSingleComponent', () => {
  let component: PlayQuestionSingleComponent;
  let fixture: ComponentFixture<PlayQuestionSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayQuestionSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayQuestionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
