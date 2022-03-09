import { TestBed } from '@angular/core/testing';

import { BlocklierService } from './blocklier.service';

describe('BlocklierService', () => {
  let service: BlocklierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlocklierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
