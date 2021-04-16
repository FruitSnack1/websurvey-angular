import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuestionScaleComponent } from './play-question-scale.component';

describe('PlayQuestionScaleComponent', () => {
  let component: PlayQuestionScaleComponent;
  let fixture: ComponentFixture<PlayQuestionScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayQuestionScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayQuestionScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
