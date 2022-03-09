import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Blockly from 'blockly';

@Component({
  selector: 'lib-blocklier',
  templateUrl: './blocklier.component.html',
  styleUrls: ['./blocklier.component.css'],
})
export class BlocklierComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() options: Blockly.BlocklyOptions = {};
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  workspace!: Blockly.Workspace;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.workspace.dispose();
  }

  ngAfterViewInit(): void {
    this.workspace = Blockly.inject(this.container.nativeElement, this.options);
  }
}
