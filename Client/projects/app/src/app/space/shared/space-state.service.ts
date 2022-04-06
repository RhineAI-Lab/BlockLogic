import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {SpaceEditorMode, SpaceLayoutMode} from "../common/space-modes.enums";

@Injectable()
// Why not it named SpaceStateService?
export class SpaceState {
  readonly isHeaderVisible$ = new BehaviorSubject(true);
  readonly editorMode$ = new BehaviorSubject(SpaceEditorMode.Logic);
  readonly layoutMode$ = new BehaviorSubject(SpaceLayoutMode.Split);
  readonly needResize$ = new Subject<void>();

  constructor() {}
}
