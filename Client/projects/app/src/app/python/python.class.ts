export class Python {
  static init(): void {
    const dom = document.createElement('script');
    dom.src = 'assets/python/brython-runner.bundle.js';
    dom.className = 'brython-runner';
    document.body.appendChild(dom);
    Python.runner = new BrythonRunner({
      onInit: () => {
        // console.log('Python inited');
      },
      stdout: {
        write(content: any) {
          console.log('Python Output: ' + content);
        },
        flush() {},
      },
      stderr: {
        write(content: any) {
          console.error('Python Error: ' + content);
        },
        flush() {},
      },
      stdin: {
        async readline() {
          const userInput = prompt();
          console.log('Python Input: ' + userInput);
          return userInput;
        },
      },
    });
  }
  static get inited(): boolean {
    return document.getElementsByClassName('brython-runner').length > 0 && this.runner!=undefined;
  }

  static runner: BrythonRunner;

  static run(code: string): void {
    if(Python.inited) {
      Python.runner.runCode(code);
    } else {
      console.error('Python is not initialized');
    }
  }
}

declare class BrythonRunner {
  constructor(option: any);
  runCode(code: string): void;
}
