import { TestBed } from '@angular/core/testing';

import { AnketyService } from './ankety.service';

describe('AnketyService', () => {
  let service: AnketyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnketyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
