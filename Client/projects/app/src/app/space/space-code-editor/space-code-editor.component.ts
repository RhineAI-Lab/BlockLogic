import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as monaco from 'monaco-editor';

import { SpaceDevelopService } from '../shared/space-develop.service';
import {SpaceState} from "../shared/space-state.service";
import {SpaceToolBarButtonType} from "../space-tool-bar/space-tool-bar.component";

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
  editor!: monaco.editor.IStandaloneCodeEditor;

  get code(): string {
    return this.developService.targetCode;
  }
  set code(v: string) {
    this.developService.targetCode = v;
  }

  constructor(
    private developService: SpaceDevelopService,
    private state: SpaceState,
  ) {
    state.toolbarButtonEvent$.subscribe((v) => {
      if(!state.logicMode$.getValue()){
        if(v==SpaceToolBarButtonType.Undo){
          this.undo();
        }else if (v==SpaceToolBarButtonType.Redo) {
          this.redo();
        }
      }
    });
  }

  undo() {
    this.editor.trigger('undo','undo',this.editor);
  }
  redo() {
    this.editor.trigger('redo', 'redo', this.editor);
  }

  ngOnInit(): void {}
}
