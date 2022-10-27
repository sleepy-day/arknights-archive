import { TestBed } from '@angular/core/testing';

import { AKTextParserService } from './aktext-parser.service';

describe('AKTextParserService', () => {
  let service: AKTextParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AKTextParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
