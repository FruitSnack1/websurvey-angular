import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnketaComponent } from './form-anketa.component';

describe('FormAnketaComponent', () => {
  let component: FormAnketaComponent;
  let fixture: ComponentFixture<FormAnketaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnketaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnketaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
