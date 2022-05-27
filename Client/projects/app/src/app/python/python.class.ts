import { Observable, Subject } from 'rxjs';

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

  runner?: BrythonRunner;
  output$ = new Subject<PythonOutput>();

  startTime = -1;

  constructor() {
    if (!Python.inited) {
      Python.init();
    }
  }

  async run(code: string): Promise<void> {
    this.runner = new BrythonRunner({
      onInit: () => {
        Python.ifLog('Python inited');
      },
      stdout: {
        write: (content: any) => {
          this.output$.next({ type: 'log', data: content });
          Python.ifLog('Python Output: ' + content);
        },
        flush() {},
      },
      stderr: {
        write: (content: any) => {
          this.output$.next({ type: 'error', data: content });
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
    if (Python.inited) {
      this.startTime = new Date().getTime();
      await this.runner.runCode(code);
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

interface PythonOutput {
  type: 'log' | 'error';
  data: any;
}

declare class BrythonRunner {
  constructor(option: any);
  runCode(code: string): void;
}
