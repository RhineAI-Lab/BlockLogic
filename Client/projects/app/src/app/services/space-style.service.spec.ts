import { TestBed } from '@angular/core/testing';

import { SpaceStyleService } from './space-style.service';

describe('SpaceStyleService', () => {
  let service: SpaceStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
