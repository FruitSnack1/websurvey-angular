import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnketyComponent } from './ankety.component';

describe('AnketyComponent', () => {
  let component: AnketyComponent;
  let fixture: ComponentFixture<AnketyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnketyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
