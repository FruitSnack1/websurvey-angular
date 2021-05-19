import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultUsersComponent } from './result-users.component';

describe('ResultUsersComponent', () => {
  let component: ResultUsersComponent;
  let fixture: ComponentFixture<ResultUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
