import '../common/run-in-context.polyfill';

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Sandbox {
  output$!: Observable<SandboxOutput>;
  private $iframe!: HTMLIFrameElementInDom;
  private context!: object;
  private output$$!: Subject<SandboxOutput>;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.$iframe?.remove();
    this.$iframe = this.createIframe();
    this.context = this.createContext(this.$iframe.contentWindow);
    this.output$$ = new Subject();
    this.output$ = this.output$$.asObservable();
  }

  run(code: string): void {
    runInContext(this.context, code);
  }

  private createIframe(): HTMLIFrameElementInDom {
    const $iframe = document.createElement('iframe');
    document.body.append($iframe);
    return $iframe as HTMLIFrameElementInDom;
  }

  private createContext(window: Window): object {
    const whitelist = new Set<string | symbol>(['eval', 'code']);
    const mocks = { console: this.createMockConsole() };
    return new Proxy(window, {
      has: (_, key) => {
        // the `with` syntax will read value from the outer container when
        // `<key> in <context>` returns `false`
        const [useOuterValue, useContextValue] = [false, true];
        return whitelist.has(key) ? useOuterValue : useContextValue;
      },
      get: (_, key) => {
        if (key in mocks) return Reflect.get(mocks, key);
        return Reflect.get(window, key);
      },
    });
  }

  private createMockConsole(): Partial<Console> {
    const redirector =
      (type: keyof Console) =>
      (...data: unknown[]) =>
        this.output$$.next({ type, data });
    return {
      log: redirector('log'),
      warn: redirector('warn'),
      error: redirector('error'),
      debug: redirector('debug'),
      info: redirector('info'),
    };
  }
}

export interface SandboxOutput {
  type: keyof Console;
  data: unknown[];
}

interface HTMLIFrameElementInDom extends HTMLIFrameElement {
  contentWindow: Window;
}
