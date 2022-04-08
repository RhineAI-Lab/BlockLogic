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
import { SpaceToolBarButtonType } from '../space-tool-bar/space-tool-bar.component';

@Component({
  selector: 'app-space-center',
  templateUrl: './space-center.component.html',
  styleUrls: ['./space-center.component.less'],
})
export class SpaceCenterComponent implements OnInit, AfterViewInit {
  @ViewChild(SplitComponent) splitter!: SplitComponent;
  @ViewChild(SpaceBlockEditorComponent) blockEditor!: SpaceBlockEditorComponent;
  @ViewChild(SpaceCodeEditorComponent) codeEditor!: SpaceCodeEditorComponent;

  codeAreaWidth = 480;
  layoutMode;
  isLogicMode;

  isEmpty = false;

  constructor(
    private developService: SpaceDevelopService,
    private state: SpaceState,
  ) {
    this.layoutMode = state.layoutMode$.getValue();
    this.isLogicMode = state.logicMode$.getValue();
    state.layoutMode$.subscribe((mode) => {
      this.layoutMode = mode;
    });
    state.logicMode$.subscribe((mode) => {
      this.isLogicMode = mode;
    });
    state.emptyCenter$.subscribe(() => {
      this.isEmpty = true;
    });
    state.needResize$.subscribe(async (v: boolean) => {
      if (v) await wait();
      this.resize();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.developService.targetFile$.subscribe((file) => {
      this.isEmpty = false;
      this.codeEditor.code = file.code;
      this.updateBlocks();
      this.state.needResize$.next(true);
    });
    this.developService.unfoldXml$.subscribe((v) => {
      if (this.blockEditor.workspace) {
        this.updateCode();
      }
    });
    this.state.toolbarButtonEvent$.subscribe((btnId) => {
      switch (btnId) {
        case SpaceToolBarButtonType.ToCode:
          this.updateCode();
          break;
        case SpaceToolBarButtonType.ToBlock:
          this.updateBlocks();
          break;
        case SpaceToolBarButtonType.Undo:
          break;
        case SpaceToolBarButtonType.Redo:
          break;
      }
    });
  }

  resize(): void {
    try {
      Blockly.svgResize(this.blockEditor.workspace);
      this.codeEditor.workspace.layout();
    } catch (e) {
      // console.log(e);
    }
  }

  onBlockChange(event: Event): void {
    let changeType = [
      Blockly.Events.BLOCK_CREATE,
      Blockly.Events.BLOCK_DELETE,
      Blockly.Events.BLOCK_CHANGE,
      Blockly.Events.BLOCK_MOVE,
    ];
    if (changeType.includes(event.type)) {
      if (this.developService.syncCode) {
        this.updateCode();
      }
    }
  }

  updateBlocks(): void {
    if (!this.isLogicMode) return;
    const code = this.codeEditor.code;
    let xmlText = CodeUtils.getBlockXml(code);
    if (xmlText.length == 0) {
      // console.warn('XmlText is empty');
    } else {
      const xmlDom = Blockly.Xml.textToDom(xmlText);
      // console.log(xmlDom);
      this.blockEditor.workspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, this.blockEditor.workspace);
    }
  }
  updateCode(): void {
    if (!this.isLogicMode) return;
    const xmlDom = Blockly.Xml.workspaceToDom(this.blockEditor.workspace);
    let xmlText = '';
    if (this.developService.unfoldXml$.getValue()) {
      xmlText = '\n' + Blockly.Xml.domToPrettyText(xmlDom) + '\n';
    } else {
      xmlText = Blockly.Xml.domToText(xmlDom);
    }
    const code = Blockly.JavaScript.workspaceToCode(this.blockEditor.workspace);
    this.codeEditor.code = CodeUtils.connectBlockXml(code, xmlText);
  }

  showClassic(): boolean {
    return (
      !this.isLogicMode ||
      [SpaceLayoutMode.Classic, SpaceLayoutMode.Split].includes(this.layoutMode)
    );
  }
  showVisual(): boolean {
    return (
      this.isLogicMode &&
      [SpaceLayoutMode.Visual, SpaceLayoutMode.Split].includes(this.layoutMode)
    );
  }
  showSplitLine(): boolean {
    return this.isLogicMode && this.layoutMode == SpaceLayoutMode.Split;
  }
  onlyClassic(): boolean {
    return !this.isLogicMode || this.layoutMode == SpaceLayoutMode.Classic;
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
