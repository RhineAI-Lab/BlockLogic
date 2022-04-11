import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class SpaceCodeEditorComponent implements OnInit, AfterViewInit {
  editorOptions = {
    theme: 'one-dark',
    language: 'javascript',
    scrollbar: {
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
  };

  @Output() change = new EventEmitter();
  editor!: monaco.editor.IStandaloneCodeEditor;

  oneDarkLoaded = true;

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
  ) {
    state.toolbarButtonEvent$.subscribe((v) => {
      if (!state.logicMode$.getValue()) {
        if (v == SpaceToolBarButtonType.Undo) {
          this.undo();
        } else if (v == SpaceToolBarButtonType.Redo) {
          this.redo();
        }
      }
    });
    // state.theme$.subscribe((v) => {
    //   if (v == ThemeType.Default) {
    //     this.changeTheme('vs')
    //   } else {
    //     if(this.oneDarkLoaded){
    //       this.changeTheme('one-dark')
    //     }else{
    //       this.changeTheme('vs-dark')
    //     }
    //   }
    // });
  }

  onInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor;
  }

  ngOnInit(): void {
    // this.httpClient
    //   .get('assets/monaco/themes/one-dark.json', {responseType: 'text'})
    //   .subscribe({
    //     next:(text: string) => {
    //       monaco.editor.defineTheme('one-dark', JSON.parse(text));
    //       this.oneDarkLoaded = true;
    //       if(this.state.theme$.getValue() == ThemeType.Dark){
    //         this.changeTheme('one-dark')
    //       }
    //     },
    //     error:(err) => {
    //       console.error(err);
    //     },
    //   });
  }

  ngAfterViewInit() {}

  changeTheme(theme: string) {
    monaco.editor.setTheme(theme);
    this.editorOptions.theme = theme;
    this.editor.updateOptions(this.editorOptions);
  }

  undo() {
    this.editor.trigger('undo', 'undo', this.editor);
  }
  redo() {
    this.editor.trigger('redo', 'redo', this.editor);
  }
}
