import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SpaceDevelopService} from "../shared/space-develop.service";
import {SplitComponent} from "angular-split";
import {SpaceBlockEditorComponent} from "../space-block-editor/space-block-editor.component";
import {SpaceCodeEditorComponent} from "../space-code-editor/space-code-editor.component";
import * as Blockly from "blockly";
import {delay, skip} from "rxjs";
import {SpaceState} from "../shared/space-state.service";

@Component({
  selector: 'app-space-center',
  templateUrl: './space-center.component.html',
  styleUrls: ['./space-center.component.less']
})
export class SpaceCenterComponent implements OnInit, AfterViewInit {
  @ViewChild(SplitComponent) splitter!: SplitComponent;
  @ViewChild(SpaceBlockEditorComponent) blockEditor!: SpaceBlockEditorComponent;
  @ViewChild(SpaceCodeEditorComponent) codeEditor!: SpaceCodeEditorComponent;

  constructor(
    private developService: SpaceDevelopService,
    private state: SpaceState
  ) {
    state.isHeaderVisible$.subscribe(isVisible => {
      state.needResize$.next();
    });
    state.needResize$
      .pipe(skip(1), delay(0))
      .subscribe(() => this.resize());
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.splitter.dragProgress$.subscribe(() => {
      this.resize();
    });
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

}
