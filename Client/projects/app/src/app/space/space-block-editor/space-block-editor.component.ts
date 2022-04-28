import {
  AfterViewInit,
  Component,
  EventEmitter, Input,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import * as Blockly from 'blockly';

import {BlocklierComponent, BlocklierToolboxCategory} from '../../blocklier/blocklier/blocklier.component';
import { ColorUtils } from '../../common/utils/color.utils';
import {SpaceState, ThemeMode} from '../services/space-state.service';

@Component({
  selector: 'app-space-block-editor',
  templateUrl: './space-block-editor.component.html',
  styleUrls: ['./space-block-editor.component.less'],
})
export class SpaceBlockEditorComponent implements OnInit, AfterViewInit {
  @Input() type: string = 'js';
  @Output() change = new EventEmitter();
  categorySelected?: BlocklierToolboxCategory;
  _workspace!: Blockly.WorkspaceSvg;
  @Output() init = new EventEmitter();
  initialized = false;
  @ViewChild('blocklier') blocklier!: BlocklierComponent;

  get workspace(): Blockly.WorkspaceSvg {
    return this._workspace;
  }
  set workspace(value: Blockly.WorkspaceSvg) {
    this._workspace = value;
    if (!this.initialized) {
      this.initialized = true;
      this.init.emit();
      this.afterBlocklyInit();
    }
  }

  /**Provide type safety for the toolbox menu. */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _categoriesType = (v: BlocklierToolboxCategory[]) => v;

  constructor(public state: SpaceState) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  afterBlocklyInit() {
    this.state.holdBox$.subscribe((v) => {
      if (this.workspace) {
        this.workspace.getToolbox().getFlyout().autoClose = !v;
      }
    });
  }

  onChange(event: Event): void {
    if (!this.state.holdBox$.getValue()) {
      if (event.type == Blockly.Events.CREATE) {
        this.categorySelected = undefined;
      }
    }
    this.change.emit(event);
  }

  onInit(): void {
    this.workspace = this.blocklier.workspace
    this.state.theme$.subscribe((v) => {
      setTimeout(() => {
        if (v == ThemeMode.Default) {
          this.blocklier.setTheme(true);
        } else {
          this.blocklier.setTheme(false);
        }
      }, 200);
    });
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
