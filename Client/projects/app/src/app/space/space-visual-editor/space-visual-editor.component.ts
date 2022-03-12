import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SplitComponent } from 'angular-split';
import * as Blockly from 'blockly';
import * as monaco from 'monaco-editor';

import { BlocklierToolboxCategory } from '../../components/blocklier/blocklier/blocklier.component';

@Component({
  selector: 'app-space-visual-editor',
  templateUrl: './space-visual-editor.component.html',
  styleUrls: ['./space-visual-editor.component.less'],
})
export class SpaceVisualEditorComponent implements OnInit, AfterViewInit {
  @ViewChild(SplitComponent) splitter!: SplitComponent;
  workspace!: Blockly.WorkspaceSvg;
  editor!: monaco.editor.IStandaloneCodeEditor;
  code = '';
  categorySelected?: BlocklierToolboxCategory;

  /**Provide type safety for the toolbox menu. */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _categoriesType = (v: BlocklierToolboxCategory[]) => v;

  constructor() {}

  updateWorkspace(): void {
    const re = new RegExp(`^${this.directive('blocks')}(.*)$`, 'm');
    const xmlText = re.exec(this.code)?.[1];
    if (!xmlText) return;
    const xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xmlDom, this.workspace);
  }

  updateCode(): void {
    const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
    const xmlText = Blockly.Xml.domToText(xmlDom);
    const code = Blockly.JavaScript.workspaceToCode(this.workspace);
    this.code = this.directive('blocks') + xmlText + '\n\n' + code;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.splitter.dragProgress$.subscribe(() => {
      Blockly.svgResize(this.workspace);
      this.editor.layout();
    });
  }

  private directive(name: DirectiveName): string {
    return `//${name}// `;
  }
}

type DirectiveName = 'blocks';
