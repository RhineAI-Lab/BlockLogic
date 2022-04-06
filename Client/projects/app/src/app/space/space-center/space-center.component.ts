import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SplitComponent } from 'angular-split';
import * as Blockly from 'blockly';

import { CodeUtils } from '../../common/utils/code.utils';
import { SpaceLayoutMode } from '../common/space-modes.enums';
import { SpaceDevelopService } from '../shared/space-develop.service';
import { SpaceState } from '../shared/space-state.service';
import { SpaceBlockEditorComponent } from '../space-block-editor/space-block-editor.component';
import { SpaceCodeEditorComponent } from '../space-code-editor/space-code-editor.component';
import { wait } from '../../common/promisify.utils';

@Component({
  selector: 'app-space-center',
  templateUrl: './space-center.component.html',
  styleUrls: ['./space-center.component.less'],
})
export class SpaceCenterComponent implements OnInit, AfterViewInit {
  @ViewChild(SplitComponent) splitter!: SplitComponent;
  @ViewChild(SpaceBlockEditorComponent) blockEditor!: SpaceBlockEditorComponent;
  @ViewChild(SpaceCodeEditorComponent) codeEditor!: SpaceCodeEditorComponent;

  codeAreaWidth = 400;
  layoutMode = SpaceLayoutMode.Split;

  constructor(
    private developService: SpaceDevelopService,
    private state: SpaceState,
  ) {
    state.isHeaderVisible$.subscribe(() => {
      state.needResize$.next(true);
    });
    this.layoutMode = state.layoutMode$.getValue();
    state.layoutMode$.subscribe((mode) => {
      this.layoutMode = mode;
      state.needResize$.next(true);
    });
    state.needResize$.subscribe(async (v: boolean) => {
      if (v) {
        await wait();
      }
      this.resize();
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.developService.targetFile$.subscribe((file) => {
      this.codeEditor.code = file.code;
      this.updateBlocks();
    });
  }

  resize(): void {
    Blockly.svgResize(this.blockEditor.workspace);
    this.codeEditor.workspace.layout();
  }

  onBlockChange(): void {
    if (this.developService.syncCode) {
      this.updateCode();
    }
  }

  updateBlocks(code?: string): void {
    if (!code) code = this.codeEditor.code;
    const xmlText = CodeUtils.getBlockXml(code);
    if (xmlText.length == 0) return;
    const xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xmlDom, this.blockEditor.workspace);
  }
  updateCode(): void {
    const xmlDom = Blockly.Xml.workspaceToDom(this.blockEditor.workspace);
    const xmlText = Blockly.Xml.domToText(xmlDom);
    const code = Blockly.JavaScript.workspaceToCode(this.blockEditor.workspace);
    this.codeEditor.code = CodeUtils.connectBlockXml(code, xmlText);
  }

  showClassic(): boolean {
    return [SpaceLayoutMode.Classic, SpaceLayoutMode.Split].includes(
      this.layoutMode,
    );
  }
  showVisual(): boolean {
    return [SpaceLayoutMode.Visual, SpaceLayoutMode.Split].includes(
      this.layoutMode,
    );
  }
  showSplitLine(): boolean {
    return this.layoutMode == SpaceLayoutMode.Split;
  }
  onlyClassic(): boolean {
    return this.layoutMode == SpaceLayoutMode.Classic;
  }

  onChangeWidth(e: MouseEvent): void {
    const startX = e.clientX;
    const startW = this.codeAreaWidth;
    document.onmousemove = (e) => {
      const endX = e.clientX;
      let finalWidth = startW - endX + startX;
      if (finalWidth > 200) {
        this.codeAreaWidth = finalWidth;
      }
      this.state.needResize$.next(false);
    };
    document.onmouseup = (e) => {
      e.stopPropagation();
      document.onmousemove = null;
      document.onmouseup = null;
      this.state.needResize$.next(true);
    };
  }
}
