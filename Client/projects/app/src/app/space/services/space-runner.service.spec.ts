import { TestBed } from '@angular/core/testing';

import { SpaceRunnerService } from './space-runner.service';

describe('SpaceRunnerService', () => {
  let service: SpaceRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
