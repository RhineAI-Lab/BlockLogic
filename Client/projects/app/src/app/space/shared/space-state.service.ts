import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {SpaceEditorMode, SpaceLayoutMode} from "../common/space-modes.enums";
import {wait} from "../../common/promisify.utils";

@Injectable()
// Why not it named SpaceStateService?
export class SpaceState {
  readonly isHeaderVisible$ = new BehaviorSubject(true);
  readonly editorMode$ = new BehaviorSubject<SpaceEditorMode>(SpaceEditorMode.Logic);
  readonly layoutMode$ = new BehaviorSubject<SpaceLayoutMode>(SpaceLayoutMode.Split);
  readonly needResize$ = new Subject<void>();

  constructor() {
    this.layoutMode$.subscribe(async mode => {
      await wait();
      this.needResize$.next()
    })
  }
}
