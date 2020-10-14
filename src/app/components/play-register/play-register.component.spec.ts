import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayRegisterComponent } from './play-register.component';

describe('PlayRegisterComponent', () => {
  let component: PlayRegisterComponent;
  let fixture: ComponentFixture<PlayRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
