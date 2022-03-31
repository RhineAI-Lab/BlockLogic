import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SplitComponent } from 'angular-split';
import * as Blockly from 'blockly';

import { SpaceBlockEditorComponent } from './space-block-editor/space-block-editor.component';
import { SpaceCodeEditorComponent } from './space-code-editor/space-code-editor.component';
import {SpaceStyleService} from "./services/space-style.service";
import {NzIconService} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.less'],
})
export class SpaceComponent implements OnInit, AfterViewInit {
  @ViewChild(SplitComponent) splitter!: SplitComponent;
  @ViewChild(SpaceBlockEditorComponent) blockEditor!: SpaceBlockEditorComponent;
  @ViewChild(SpaceCodeEditorComponent) codeEditor!: SpaceCodeEditorComponent;

  styleService: SpaceStyleService;

  constructor(styleService: SpaceStyleService, iconService: NzIconService) {
    this.styleService = styleService;
    iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_3294553_oe9f2ygixes.js'
    })
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.styleService.freshMainLayout = (): boolean => {
      Blockly.svgResize(this.blockEditor.workspace);
      this.codeEditor.workspace.layout();
      return true
    }
    this.splitter.dragProgress$.subscribe(() => {
      this.styleService.freshMainLayout()
    });
  }

  updateBlocks(): void {
    const re = new RegExp(`^//blocks// (.*)$`, 'm');
    const xmlText = re.exec(this.codeEditor.code)?.[1];
    if (!xmlText) return;
    const xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xmlDom, this.blockEditor.workspace);
  }

  updateCode(): void {
    const xmlDom = Blockly.Xml.workspaceToDom(this.blockEditor.workspace);
    const xmlText = Blockly.Xml.domToText(xmlDom);
    const code = Blockly.JavaScript.workspaceToCode(this.blockEditor.workspace);
    this.codeEditor.code = `//blocks// ${xmlText}` + '\n\n' + code;
  }


}
