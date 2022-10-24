import { TestBed } from '@angular/core/testing';

import { OpInfoService } from './op-info.service';

describe('OpInfoService', () => {
  let service: OpInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
