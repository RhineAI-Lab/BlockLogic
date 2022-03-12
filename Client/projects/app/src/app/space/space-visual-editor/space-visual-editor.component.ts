import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SplitComponent } from 'angular-split';
import * as Blockly from 'blockly';
import * as monaco from 'monaco-editor';

import { BlocklierToolboxCategory } from '../../components/blocklier/models/blocklier-toolbox-category.class';

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

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.splitter.dragProgress$.subscribe(() => {
      Blockly.svgResize(this.workspace);
      this.editor.layout();
    });
  }
}
