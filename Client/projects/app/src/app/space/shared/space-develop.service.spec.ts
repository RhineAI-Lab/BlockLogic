import { TestBed } from '@angular/core/testing';

import { SpaceDevelopService } from './space-develop.service';

describe('SpaceEditorService', () => {
  let service: SpaceDevelopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceDevelopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
