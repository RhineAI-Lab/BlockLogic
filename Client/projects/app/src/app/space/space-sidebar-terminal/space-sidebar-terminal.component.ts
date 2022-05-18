import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';

@Component({
  selector: 'app-space-sidebar-terminal',
  templateUrl: './space-sidebar-terminal.component.html',
  styleUrls: ['./space-sidebar-terminal.component.less'],
})
export class SpaceSidebarTerminalComponent implements OnInit {
  @ViewChild('terminal', { read: ElementRef }) terminalDom!: ElementRef;

  term!: Terminal;
  fitAddon!: FitAddon;
  attachAddon!: AttachAddon;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.term = new Terminal();
    this.fitAddon = new FitAddon();
    this.term.loadAddon(this.fitAddon);
    // this.attachAddon = new AttachAddon(webSocket);
    // this.term.loadAddon(this.attachAddon);
    this.term.open(this.terminalDom.nativeElement);
    this.fitAddon.fit();
    this.term.focus();
    this.term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

  }
}
