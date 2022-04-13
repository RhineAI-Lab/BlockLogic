import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as monaco from 'monaco-editor';

import { SpaceDevelopService } from '../shared/space-develop.service';
import { SpaceState, ThemeType } from '../shared/space-state.service';
import { SpaceToolBarButtonType } from '../space-tool-bar/space-tool-bar.component';
import { HttpClient } from "@angular/common/http";

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

  oneDarkLoaded = true;
  monaco: any = null;

  get code(): string {
    return this.developService.targetCode;
  }
  set code(v: string) {
    this.developService.targetCode = v;
  }

  constructor(
    private developService: SpaceDevelopService,
    private state: SpaceState,
    private httpClient: HttpClient,
  ) {}

  ngOnInit() {
    this.state.toolbarButtonEvent$.subscribe((v) => {
      if (!this.state.isLogicFile$.getValue()) {
        if (v == SpaceToolBarButtonType.Undo) {
          this.undo();
        } else if (v == SpaceToolBarButtonType.Redo) {
          this.redo();
        }
      }
    });
    this.state.theme$.subscribe((v) => {
      setTimeout(() => {
        if (v == ThemeType.Default) {
          this.changeTheme('vs')
        } else {
          if(this.oneDarkLoaded){
            this.changeTheme('one-dark')
          }else{
            this.changeTheme('vs-dark')
          }
        }
      },200);
    });
  }

  onInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor;
    this.monaco = (<any>window).monaco;
  }

  changeTheme(theme: string) {
    if(this.monaco!=null){
      this.monaco.editor.setTheme(theme);
    }
  }

  undo() {
    this.editor.trigger('undo', 'undo', this.editor);
  }
  redo() {
    this.editor.trigger('redo', 'redo', this.editor);
  }
}
