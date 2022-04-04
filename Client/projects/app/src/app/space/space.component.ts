import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SplitComponent } from 'angular-split';
import * as Blockly from 'blockly';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SpaceDevelopService } from './shared/space-develop.service';
import { SpaceStyleService } from './shared/space-style.service';
import { SpaceBlockEditorComponent } from './space-block-editor/space-block-editor.component';
import { SpaceCodeEditorComponent } from './space-code-editor/space-code-editor.component';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.less'],
})
export class SpaceComponent implements OnInit, AfterViewInit {
  @ViewChild(SplitComponent) splitter!: SplitComponent;
  @ViewChild(SpaceBlockEditorComponent) blockEditor!: SpaceBlockEditorComponent;
  @ViewChild(SpaceCodeEditorComponent) codeEditor!: SpaceCodeEditorComponent;

  spaceStyleService: SpaceStyleService;
  spaceDevelopService: SpaceDevelopService;
  notification: NzNotificationService;

  constructor(
    notification: NzNotificationService,
    spaceStyleService: SpaceStyleService,
    spaceDevelopService: SpaceDevelopService,
    iconService: NzIconService,
  ) {
    this.notification = notification;
    this.spaceStyleService = spaceStyleService;
    this.spaceDevelopService = spaceDevelopService;
    this.spaceStyleService.notification = notification;
    this.spaceDevelopService.notification = notification;

    iconService.fetchFromIconfont({
      scriptUrl: 'http://at.alicdn.com/t/font_3294553_hbxby7ngwwu.js',
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.spaceStyleService.mainLayoutController = {
      freshMainLayout: (): void => {
        Blockly.svgResize(this.blockEditor.workspace);
        this.codeEditor.workspace.layout();
      },
    };
    this.splitter.dragProgress$.subscribe(() => {
      this.spaceStyleService.freshMainLayout();
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

export interface SpaceMainLayoutController {
  freshMainLayout: () => void;
}
