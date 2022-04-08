import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as monaco from 'monaco-editor';

import { SpaceDevelopService } from '../shared/space-develop.service';

@Component({
  selector: 'app-space-code-editor',
  templateUrl: './space-code-editor.component.html',
  styleUrls: ['./space-code-editor.component.less'],
})
export class SpaceCodeEditorComponent implements OnInit {
  editorOptions = {
    theme: 'vs',
    language: 'javascript',
    scrollbar: {
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
  };

  @Output() change = new EventEmitter();
  workspace!: monaco.editor.IStandaloneCodeEditor;

  get code(): string {
    return this.developService.targetCode;
  }
  set code(v: string) {
    this.developService.targetCode = v;
  }

  undo() {
    this.workspace.trigger('undo', 'id', this.workspace);
  }
  redo() {
    this.workspace.trigger('redo', 'id', this.workspace);
  }

  constructor(private developService: SpaceDevelopService) {}

  ngOnInit(): void {}
}
