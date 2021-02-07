import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnketaDetailComponent } from './anketa-detail.component';

describe('AnketaDetailComponent', () => {
  let component: AnketaDetailComponent;
  let fixture: ComponentFixture<AnketaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnketaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
