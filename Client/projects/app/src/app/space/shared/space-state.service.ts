import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { SpaceEditorMode, SpaceLayoutMode } from '../common/space-modes.enums';
import { SpaceToolBarButtonType } from '../space-tool-bar/space-tool-bar.component';

@Injectable()
export class SpaceState {
  readonly theme$ = new BehaviorSubject<ThemeType>(ThemeType.Default);
  previousTheme = ThemeType.Default;
  firstTime = true;

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

    this.theme$.subscribe((v) => {
      this.loadTheme(this.firstTime).subscribe(
        (v) => {},
        (err) => {
          console.error(err);
        },
        () => {
          // console.log("Theme load success")
        },
      );
      this.firstTime = false;
    });
  }

  loadTheme(firstLoad = true): Observable<void> {
    return new Observable<void>((subscriber) => {
      const theme = this.theme$.getValue();
      if (firstLoad) {
        document.documentElement.classList.add(theme);
      }
      this.loadCss(`${theme}.css`, theme).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(theme);
            this.removeUnusedTheme(this.previousTheme);
          }
          this.previousTheme = this.theme$.getValue();
          subscriber.complete();
        },
        (e) => subscriber.error(e),
      );
    });
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }
  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }
}

export enum ThemeType {
  Default = 'default',
  Dark = 'dark',
}
