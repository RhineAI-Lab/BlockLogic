import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';
import {ITerminalOptions} from "xterm";

@Component({
  selector: 'app-space-sidebar-terminal',
  templateUrl: './space-sidebar-terminal.component.html',
  styleUrls: ['./space-sidebar-terminal.component.less'],
})
export class SpaceSidebarTerminalComponent implements OnInit, AfterViewInit {
  @ViewChild('terminal', { static: true }) terminal!: NgTerminal;
  options: ITerminalOptions = {};

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.options = this.terminal.underlying.options;
    this.options.fontSize = 12;
    this.options.letterSpacing = 1;

    this.writeln('终端初始化完成');
    this.terminal.write('$ ');
    this.terminal.keyEventInput.subscribe((e) => {
      // console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        this.writerNextLine();
        this.writePrefix();
      } else if (ev.keyCode === 8) {
        if (this.terminal.underlying.buffer.active.cursorX > 2) {
          this.terminal.write('\b \b');
        }
      } else if (printable) {
        this.terminal.write(e.key);
      }
    });
  }

  writeln(msg: string): void {
    this.terminal.write(msg);
    this.writerNextLine();
  }

  writePrefix(): void {
    this.terminal.write('$ ');
  }
  writerNextLine(): void {
    this.terminal.write('\n' + FunctionsUsingCSI.cursorColumn(1)); // \r\n
  }
}
