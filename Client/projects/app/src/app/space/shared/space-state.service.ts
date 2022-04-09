import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { SpaceEditorMode, SpaceLayoutMode } from '../common/space-modes.enums';
import { SpaceToolBarButtonType } from '../space-tool-bar/space-tool-bar.component';

@Injectable()
export class SpaceState {
  readonly isHeaderVisible$ = new BehaviorSubject(true);

  readonly logicMode$ = new BehaviorSubject<boolean>(true);
  readonly editorMode$ = new BehaviorSubject<SpaceEditorMode>(
    SpaceEditorMode.Logic,
  );
  readonly layoutMode$ = new BehaviorSubject<SpaceLayoutMode>(
    SpaceLayoutMode.Split,
  );

  readonly editorState$ = new BehaviorSubject<string>('编辑器初始化中...');
  readonly projectState$ = new BehaviorSubject<string>('项目打开中...');

  readonly holdBox$ = new BehaviorSubject<boolean>(false);
  readonly emptyCenter$ = new Subject<void>();

  readonly needResize$ = new Subject<boolean>();
  readonly toolbarButtonEvent$ = new Subject<SpaceToolBarButtonType>();

  constructor() {
    this.layoutMode$.subscribe(() => {
      this.needResize$.next(true);
    });
    this.logicMode$.subscribe(() => {
      this.needResize$.next(true);
    });
    this.isHeaderVisible$.subscribe(() => {
      this.needResize$.next(true);
    });
  }
}
