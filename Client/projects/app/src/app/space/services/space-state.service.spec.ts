import { TestBed } from '@angular/core/testing';

import { SpaceState } from './space-state.service';

describe('SpaceState', () => {
  let service: SpaceState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
