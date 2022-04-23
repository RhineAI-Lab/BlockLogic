import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as monaco from 'monaco-editor';

import { SpaceDevelopService } from '../services/space-develop.service';
import { SpaceState, ThemeMode } from '../services/space-state.service';

@Component({
  selector: 'app-space-code-editor',
  templateUrl: './space-code-editor.component.html',
  styleUrls: ['./space-code-editor.component.less'],
})
export class SpaceCodeEditorComponent implements OnInit {
  @Input() code!: string;
  @Input() language!: string;
  @Output() codeChange = new EventEmitter<string>();

  editor!: monaco.editor.IStandaloneCodeEditor;

  editorOptions!: monaco.editor.IStandaloneEditorConstructionOptions

  oneDarkLoaded = true;
  monaco: any = null;

  constructor(
    private developService: SpaceDevelopService,
    private state: SpaceState,
  ) {}

  ngOnInit() {
    this.state.theme$.subscribe((v) => {
      setTimeout(() => {
        if (v == ThemeMode.Default) {
          this.changeTheme('vs');
        } else {
          if (this.oneDarkLoaded) {
            this.changeTheme('one-dark');
          } else {
            this.changeTheme('vs-dark');
          }
        }
      }, 200);
    });

    this.editorOptions = {
      theme: this.state.isLight ? 'vs' : 'one-dark',
      language: this.language,
      scrollbar: {
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
    };

  }

  onInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor;
    this.monaco = (<any>window).monaco;
  }

  changeTheme(theme: string) {
    if (this.monaco != null) {
      if (this.editorOptions.theme != theme) {
        this.editorOptions.theme = theme;
        this.monaco.editor.setTheme(theme);
      }
    }
  }
  // changeLanguage(language: string) {
  //   if (this.editorOptions.language != language) {
  //     this.editorOptions.language = language;
  //     this.editor.updateOptions(this.editorOptions);
  //     console.log(language);
  //   }
  // }

  undo() {
    this.editor.trigger('undo', 'undo', this.editor);
  }
  redo() {
    this.editor.trigger('redo', 'redo', this.editor);
  }
}
