import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as Blockly from 'blockly';

import { BlocklierToolboxCategory } from '../../blocklier/blocklier/blocklier.component';

@Component({
  selector: 'app-space-block-editor',
  templateUrl: './space-block-editor.component.html',
  styleUrls: ['./space-block-editor.component.less'],
})
export class SpaceBlockEditorComponent implements OnInit {
  @Output() change = new EventEmitter();
  workspace!: Blockly.WorkspaceSvg;
  categorySelected?: BlocklierToolboxCategory;

  /**Provide type safety for the toolbox menu. */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _categoriesType = (v: BlocklierToolboxCategory[]) => v;

  constructor() {}

  ngOnInit(): void {}

  colourBlend(c1: string, c2: string = "#FFFFFF", ratio: number = 0.6): string {
    if(!c1){
      return "#FFFFFF00"
    }
    ratio = Math.max(Math.min(Number(ratio), 1), 0);
    let r1 = parseInt(c1.substring(1, 3), 16);
    let g1 = parseInt(c1.substring(3, 5), 16);
    let b1 = parseInt(c1.substring(5, 7), 16);
    let r2 = parseInt(c2.substring(1, 3), 16);
    let g2 = parseInt(c2.substring(3, 5), 16);
    let b2 = parseInt(c2.substring(5, 7), 16);
    let r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    let g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    let b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    let rs = ('0' + (r || 0).toString(16)).slice(-2);
    let gs = ('0' + (g || 0).toString(16)).slice(-2);
    let bs = ('0' + (b || 0).toString(16)).slice(-2);
    return '#' + rs + gs + bs;
  }
}
