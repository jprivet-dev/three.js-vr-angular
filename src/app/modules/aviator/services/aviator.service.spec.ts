import { TestBed } from '@angular/core/testing';

import { AviatorService } from './aviator.service';

describe('AviatorService', () => {
  let service: AviatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AviatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
