import {AfterViewInit, Component, Input, OnInit, ViewChild,} from '@angular/core';
import {SplitComponent} from 'angular-split';
import * as Blockly from 'blockly';

import {CodeUtils, XmlResult} from '../../common/utils/code.utils';
import {SpaceEditorMode, SpaceLayoutMode} from '../common/space-modes.enums';
import {SpaceDevelopService} from '../services/space-develop.service';
import {SpaceState} from '../services/space-state.service';
import {SpaceBlockEditorComponent} from '../space-block-editor/space-block-editor.component';
import {SpaceCodeEditorComponent} from '../space-code-editor/space-code-editor.component';
import {wait} from '../../common/promisify.utils';
import {SpaceToolBarButtonType} from '../space-tool-bar/space-tool-bar.component';
import {SpaceFileService} from '../services/space-file.service';
import {CodeType, ProjectFile} from '../../common/project-file.class';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-space-center',
  templateUrl: './space-center.component.html',
  styleUrls: ['./space-center.component.less'],
})
export class SpaceCenterComponent implements OnInit, AfterViewInit {
  @Input() file!: ProjectFile;
  @Input() page!: Page;

  @ViewChild(SplitComponent) splitter!: SplitComponent;
  @ViewChild(SpaceBlockEditorComponent) blockEditor!: SpaceBlockEditorComponent;
  @ViewChild(SpaceCodeEditorComponent) codeEditor!: SpaceCodeEditorComponent;

  codeAreaWidth = 480;
  layoutMode;
  isLogicMode;

  constructor(
    private developService: SpaceDevelopService,
    private fileService: SpaceFileService,
    private state: SpaceState,
  ) {
    this.layoutMode = state.layoutMode$.getValue();
    this.isLogicMode = state.isLogicFile$.getValue();
    state.layoutMode$.subscribe((mode) => {
      this.layoutMode = mode;
    });
    state.isLogicFile$.subscribe((mode) => {
      this.isLogicMode = mode;
    });
    state.needResize$.subscribe(async (v: boolean) => {
      if (v) await wait();
      this.resize();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
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

  init() {
    this.state.needResize$.next(true);
  }

  resize(): void {
    try {
      Blockly.svgResize(this.blockEditor.workspace);
      this.codeEditor.editor.layout();
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

export class Page {
  readonly editorMode$ = new BehaviorSubject<SpaceEditorMode>(
    SpaceEditorMode.Logic,
  );
  readonly layoutMode$ = new BehaviorSubject<SpaceLayoutMode>(
    SpaceLayoutMode.Split,
  );

  xmlList: XmlResult[] = [];
  readonly targetXml$ = new BehaviorSubject<XmlResult>(XmlResult.createEmpty());

  constructor(
    file: ProjectFile,
    editorMode: SpaceEditorMode = SpaceEditorMode.Logic,
    layoutMode: SpaceLayoutMode = SpaceLayoutMode.Split,
  ) {
    this.editorMode$.next(editorMode);
    this.layoutMode$.next(layoutMode);
  }

  public static makePageByFile(file: ProjectFile): Page {
    const page = new Page(file);
    if(file.opened){
      if(file.codeType==CodeType.PY_BLOCK_DL||file.codeType==CodeType.JS_BLOCK_AUTO) {
        page.layoutMode$.next(SpaceLayoutMode.Split);
      }else{
        page.layoutMode$.next(SpaceLayoutMode.Classic);
      }
      if(file.type=='js'){
        const xmlList = CodeUtils.getXmlCodeList(file.code);
        if(xmlList.length>0){
          page.xmlList = xmlList;
          page.targetXml$.next(xmlList[0]);
          page.editorMode$.next(SpaceEditorMode.Design);
        }
      }
    }
    return page;
  }
}
