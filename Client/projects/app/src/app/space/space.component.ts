import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SplitComponent } from 'angular-split';
import * as Blockly from 'blockly';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { delay, skip } from 'rxjs';

import { SpaceDebugService } from './shared/space-debug.service';
import { SpaceDevelopService } from './shared/space-develop.service';
import { SpaceState } from './shared/space-state.service';
import { SpaceStyleService } from './shared/space-style.service';
import { SpaceBlockEditorComponent } from './space-block-editor/space-block-editor.component';
import { SpaceCodeEditorComponent } from './space-code-editor/space-code-editor.component';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.less'],
  providers: [
    SpaceDevelopService,
    SpaceDebugService,
    SpaceStyleService,
    SpaceState,
  ],
})
export class SpaceComponent implements OnInit, AfterViewInit {
  @ViewChild(SplitComponent) splitter!: SplitComponent;
  @ViewChild(SpaceBlockEditorComponent) blockEditor!: SpaceBlockEditorComponent;
  @ViewChild(SpaceCodeEditorComponent) codeEditor!: SpaceCodeEditorComponent;

  constructor(
    private debugService: SpaceDebugService,
    private developService: SpaceDevelopService,
    private notifier: NzNotificationService,
    state: SpaceState,
  ) {
    this.subscribeDebugEvents();
    state.isHeaderVisible$
      .pipe(skip(1), delay(0))
      .subscribe(() => this.resize());
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.splitter.dragProgress$.subscribe(() => {
      this.resize();
    });
    this.developService.init()
  }

  resize(): void {
    Blockly.svgResize(this.blockEditor.workspace);
    this.codeEditor.workspace.layout();
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

  private subscribeDebugEvents(): void {
    this.developService.debugEvents.subscribe((event) => {
      this.notifier.remove();
      const device = this.debugService.device; // TODO: avoid accessing the internal service
      if (event.type == 'connect') {
        this.notifier.success('连接成功', `设备：${device}`);
      }
      if (event.type == 'close') {
        this.notifier.warning('连接断开', `设备：${device}`);
      }
      if (event.type == 'error') {
        const eventTarget = event.payload.target as
          | (EventTarget & { url: string })
          | undefined;
        this.notifier.error('连接错误', `地址: ${eventTarget?.url}`);
      }
    });
  }
}
