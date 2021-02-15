import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuestionOpenComponent } from './play-question-open.component';

describe('PlayQuestionOpenComponent', () => {
  let component: PlayQuestionOpenComponent;
  let fixture: ComponentFixture<PlayQuestionOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayQuestionOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayQuestionOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
