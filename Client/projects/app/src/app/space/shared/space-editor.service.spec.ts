import { TestBed } from '@angular/core/testing';

import { SpaceEditorService } from './space-editor.service';

describe('SpaceEditorService', () => {
  let service: SpaceEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
