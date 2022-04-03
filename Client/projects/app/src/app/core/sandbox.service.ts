import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Sandbox {
  private $iframe = this.createIframe();
  private context = this.createContext(this.$iframe.contentWindow);
  outputs$ = new ReplaySubject<SandboxOutput>();

  constructor() {
    this.initWithSyntaxPolyfill();
  }

  reset(): void {
    this.$iframe.remove();
    this.$iframe = this.createIframe();
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
        this.outputs$.next({ type, data });
    return {
      log: redirector('log'),
      warn: redirector('warn'),
      error: redirector('error'),
      debug: redirector('debug'),
      info: redirector('info'),
    };
  }

  /**
   * Bypass the unavailability of the `with` syntax in JavaScript strict mode.
   */
  private initWithSyntaxPolyfill(): void {
    const $script = document.createElement('script');
    $script.innerText = `
    function runInContext(context, code) {
      with(context) {
        eval(code);
      }
    }
    `;
    document.head.append($script);
  }
}

export interface SandboxOutput {
  type: keyof Console;
  data: unknown[];
}

interface HTMLIFrameElementInDom extends HTMLIFrameElement {
  contentWindow: Window;
}

declare global {
  function runInContext(context: object, code: string): void;
}
