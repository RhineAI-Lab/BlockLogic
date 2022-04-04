import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpaceState {
  readonly isHeaderVisible$ = new BehaviorSubject(true);

  constructor() {}
}
