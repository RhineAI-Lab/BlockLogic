import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as monaco from 'monaco-editor';

import { SpaceDevelopService } from '../shared/space-develop.service';
import { SpaceState, ThemeType } from '../shared/space-state.service';
import { SpaceToolBarButtonType } from '../space-tool-bar/space-tool-bar.component';
import { loadWASM } from 'onigasm';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-space-code-editor',
  templateUrl: './space-code-editor.component.html',
  styleUrls: ['./space-code-editor.component.less'],
})
export class SpaceCodeEditorComponent implements OnInit, AfterViewInit {
  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    value: 'console.log("Hello World!");',
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
    state.theme$.subscribe((v) => {
      if (v == ThemeType.Default) {
        monaco.editor.setTheme('vs');
      } else {
        monaco.editor.setTheme('vs-dark');
      }
    });
  }

  ngOnInit(): void {
    this.httpClient
      .get('assets/monaco/themes/one-dark.json', {responseType: 'text'})
      .subscribe({
        next:(text: string) => {
          monaco.editor.defineTheme('one-dark', JSON.parse(text));
        },
        error:(err) => {
          console.error(err);
        },
      });
    // this.loadTheme();
  }

  ngAfterViewInit() {
    this.editor = monaco.editor.create(
      document.getElementById('monaco-editor')!,
      this.editorOptions
    );
  }

  loadTheme() {
    const init = async () => {
      await loadWASM('assets/onigasm/onigasm.wasm');
      const grammars = new Map();
      grammars.set('javascript', 'source.js');
      grammars.set('css', 'source.css');
      grammars.set('html', 'text.html.basic');
      grammars.set('typescript', 'source.ts');
      grammars.set('scss', 'source.css.scss');
      grammars.set('less', 'source.css.less');
      grammars.set('json', 'source.json');
      grammars.set('python', 'source.python');

      // TODO: 取消注释下方代码会产生webpack报错
      // const registry = new Registry({
      //   getGrammarDefinition: async (scopeName) => {
      //     return {
      //       format: 'json',
      //       content: await (
      //         await fetch('assets/grammars/javascript.json')
      //       ).text(),
      //     };
      //   },
      // });
      // await wireTmGrammars(monaco, registry, grammars, this.editor)
    };
    init();
  }

  undo() {
    this.editor.trigger('undo', 'undo', this.editor);
  }
  redo() {
    this.editor.trigger('redo', 'redo', this.editor);
  }
}
