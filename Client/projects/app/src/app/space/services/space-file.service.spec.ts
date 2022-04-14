import { TestBed } from '@angular/core/testing';

import { SpaceFileService } from './space-file.service';

describe('SpaceFileService', () => {
  let service: SpaceFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
