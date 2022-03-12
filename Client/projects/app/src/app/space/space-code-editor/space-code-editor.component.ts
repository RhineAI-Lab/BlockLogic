import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-space-code-editor',
  templateUrl: './space-code-editor.component.html',
  styleUrls: ['./space-code-editor.component.less'],
})
export class SpaceCodeEditorComponent implements OnInit {
  @Output() change = new EventEmitter();
  code = '';
  workspace!: monaco.editor.IStandaloneCodeEditor;

  constructor() {}

  ngOnInit(): void {}
}
