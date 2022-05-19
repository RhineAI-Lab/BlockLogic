import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';
import { ITerminalOptions, ITheme } from 'xterm';
import { SpaceState, ThemeMode } from '../services/space-state.service';

@Component({
  selector: 'app-space-sidebar-terminal',
  templateUrl: './space-sidebar-terminal.component.html',
  styleUrls: ['./space-sidebar-terminal.component.less'],
})
export class SpaceSidebarTerminalComponent implements OnInit, AfterViewInit {
  @ViewChild('terminal', { static: true }) terminal!: NgTerminal;
  options: ITerminalOptions = {};

  static lightTheme: ITheme = {
    background: '#ffffff',
    foreground: '#171717',
    cursor: '#171717',
    selection: '#76aee7',
  };
  static darkTheme: ITheme = {
    background: '#1e1e1e',
    foreground: '#c6c6c6',
    cursor: '#c6c6c6',
    selection: '#b4daff',
  };

  constructor(private state: SpaceState) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.options = this.terminal.underlying.options;
    this.options.fontSize = 12;
    this.options.letterSpacing = 1;
    this.options.fontWeight = '600';
    this.options.lineHeight = 1.3;
    this.options.cursorStyle = 'bar';
    this.options.cursorBlink = true;

    this.state.theme$.subscribe((v) => {
      setTimeout(() => {
        if (v == ThemeMode.Default) {
          this.options.theme = SpaceSidebarTerminalComponent.lightTheme;
          this.updateBorderColor();
        } else {
          this.options.theme = SpaceSidebarTerminalComponent.darkTheme;
          this.updateBorderColor();
        }
      }, 200);
    });

    this.writeln('Terminal initialized.');
    this.terminal.write('$ ');
    this.terminal.keyEventInput.subscribe((e) => {
      // console.log('keyboard event:' + e.domEvent.keyCode + ' ' + e.key);
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

  updateBorderColor(): void {
    const color = this.options.theme?.background ?? '#1e1e1e';
    const updateList = 'left right top bottom'.split(' ');
    for (const update of updateList) {
      (
        document.getElementsByClassName(
          'resize-handle-' + update,
        )[0] as HTMLElement
      ).style.background = color;
    }
  }
}
