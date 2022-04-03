import { TestBed } from '@angular/core/testing';

import { Sandbox } from './sandbox.service';

describe('Sandbox', () => {
  let service: Sandbox;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sandbox);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
