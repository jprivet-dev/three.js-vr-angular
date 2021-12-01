import { TestBed } from '@angular/core/testing';

import { EarthService } from './earth.service';

describe('EarthService', () => {
  let service: EarthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
