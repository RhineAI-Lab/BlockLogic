import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as monaco from 'monaco-editor';

import { SpaceDevelopService } from '../services/space-develop.service';
import { SpaceState, ThemeType } from '../services/space-state.service';
import { SpaceToolBarButtonType } from '../space-tool-bar/space-tool-bar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-space-code-editor',
  templateUrl: './space-code-editor.component.html',
  styleUrls: ['./space-code-editor.component.less'],
})
export class SpaceCodeEditorComponent implements OnInit {
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    theme: this.state.isLight ? 'vs' : 'one-dark',
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
    // this.developService.targetFile$.subscribe((file) => {
    //   const languages = [
    //     'javascript js jsx',
    //     'typescript ts tsx',
    //     'html htm html',
    //     'xml xml config',
    //     'css css',
    //     'json json',
    //     'java java',
    //     'python py',
    //     'yaml yml yaml',
    //     'kotlin kt',
    //   ];
    //   for (const language of languages) {
    //     const lan = language.split(' ');
    //     for (const i in lan) {
    //       if(i=='0')continue;
    //       if (file.type == lan[i]) {
    //         this.changeLanguage(lan[0]);
    //         return;
    //       }
    //     }
    //   }
    //   this.changeLanguage('text');
    //   return;
    // });
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
