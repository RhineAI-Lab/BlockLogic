import {Observable, Subject} from "rxjs";

export class Python {
  static useLogPython = false;
  static init(): void {
    const dom = document.createElement('script');
    dom.src = 'assets/python/brython-runner.bundle.js';
    dom.className = 'brython-runner';
    document.body.appendChild(dom);
  }
  static get inited(): boolean {
    return document.getElementsByClassName('brython-runner').length > 0;
  }

  runner: BrythonRunner;
  output$ = new Subject<any>();

  constructor() {
    if (!Python.inited) {
      Python.init();
    }
    this.runner = new BrythonRunner({
      onInit: () => {
        Python.ifLog('Python inited');
      },
      stdout: {
        write: (content: any) => {
          this.output$.next(content);
          Python.ifLog('Python Output: ' + content);
        },
        flush() {},
      },
      stderr: {
        write: (content: any) => {
          this.output$.error(content);
          Python.ifLog('Python Error: ' + content);
        },
        flush() {},
      },
      stdin: {
        async readline() {
          const userInput = prompt();
          Python.ifLog('Python Input: ' + userInput);
          return userInput;
        },
      },
    });
  }

  run(code: string): void {
    if(Python.inited) {
      this.runner.runCode(code);
    } else {
      console.error('Python is not initialized');
    }
  }

  static ifLog(text: string): void {
    if (Python.useLogPython) {
      console.log(text);
    }
  }

}

declare class BrythonRunner {
  constructor(option: any);
  runCode(code: string): void;
}
