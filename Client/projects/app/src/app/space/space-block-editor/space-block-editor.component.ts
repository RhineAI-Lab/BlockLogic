import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as Blockly from 'blockly';

import { BlocklierToolboxCategory } from '../../blocklier/blocklier/blocklier.component';
import { ColorUtils } from '../../common/utils/color.utils';
import { SpaceState } from '../shared/space-state.service';

@Component({
  selector: 'app-space-block-editor',
  templateUrl: './space-block-editor.component.html',
  styleUrls: ['./space-block-editor.component.less'],
})
export class SpaceBlockEditorComponent implements OnInit, AfterViewInit {
  @Output() change = new EventEmitter();
  workspace!: Blockly.WorkspaceSvg;
  categorySelected?: BlocklierToolboxCategory;

  /**Provide type safety for the toolbox menu. */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _categoriesType = (v: BlocklierToolboxCategory[]) => v;

  constructor(public state: SpaceState) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.state.holdBox$.subscribe((v) => {
      this.workspace.getToolbox().getFlyout().autoClose = !v;
    });
  }

  onChange(event: Event): void {
    if(!this.state.holdBox$.getValue()){
      if(event.type==Blockly.Events.CREATE){
        this.categorySelected = undefined;
      }
    }
    this.change.emit(event);
  }

  onClick(category: BlocklierToolboxCategory, $event: Event): void {
    $event.stopPropagation();
    category.$row.click();
    if (this.categorySelected == category) {
      this.categorySelected = undefined;
    } else {
      this.categorySelected = category;
    }
  }

  getBlendColor(color: string): string {
    return ColorUtils.colourBlend(color);
  }
}
