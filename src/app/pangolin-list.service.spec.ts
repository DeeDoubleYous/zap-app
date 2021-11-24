import { TestBed } from '@angular/core/testing';

import { PangolinListService } from './pangolin-list.service';

describe('PangolinListService', () => {
  let service: PangolinListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PangolinListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
