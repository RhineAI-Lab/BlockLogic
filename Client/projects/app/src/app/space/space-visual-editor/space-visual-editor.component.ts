import { Component, OnInit } from '@angular/core';
import * as monaco from 'monaco-editor';

import { BlocklierToolboxCategory } from '../../components/blocklier/models/blocklier-toolbox-category.class';

@Component({
  selector: 'app-space-visual-editor',
  templateUrl: './space-visual-editor.component.html',
  styleUrls: ['./space-visual-editor.component.less'],
})
export class SpaceVisualEditorComponent implements OnInit {
  editor!: monaco.editor.IStandaloneCodeEditor;
  code = '';
  categorySelected?: BlocklierToolboxCategory;

  constructor() {}

  ngOnInit(): void {}
}
