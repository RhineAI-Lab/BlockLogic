import { TestBed } from '@angular/core/testing';

import { SpaceDebugService } from './space-debug.service';

describe('SpaceDebugService', () => {
  let service: SpaceDebugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceDebugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
