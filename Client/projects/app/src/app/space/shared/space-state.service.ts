import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { wait } from '../../common/promisify.utils';
import { SpaceEditorMode, SpaceLayoutMode } from '../common/space-modes.enums';
import {SpaceToolBarButtonType} from "../space-tool-bar/space-tool-bar.component";

@Injectable()
export class SpaceState {
  readonly isHeaderVisible$ = new BehaviorSubject(true);
  readonly editorMode$ = new BehaviorSubject<SpaceEditorMode>(
    SpaceEditorMode.Logic,
  );
  readonly layoutMode$ = new BehaviorSubject<SpaceLayoutMode>(
    SpaceLayoutMode.Split,
  );
  readonly needResize$ = new Subject<boolean>();

  readonly toolbarButtonEvent$ = new Subject<SpaceToolBarButtonType>();

  constructor() {
    this.layoutMode$.subscribe( () => {
      this.needResize$.next(true);
    });
  }
}

