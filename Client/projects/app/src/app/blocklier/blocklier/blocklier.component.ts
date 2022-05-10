import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/python';

import { BlocklierRenderer } from '../blocklier-renderer';
import { BlocklierTheme, colorMap } from './blocklier-theme';

@Component({
  selector: 'app-blocklier',
  templateUrl: './blocklier.component.html',
  styleUrls: ['./blocklier.component.less'],
})
export class BlocklierComponent implements OnInit, AfterViewInit {
  @Input() type: string = 'js';
  @Output() init = new EventEmitter();
  @Output() change = new EventEmitter();
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  workspace!: Blockly.WorkspaceSvg;
  toolbox!: Blockly.IToolbox;
  categories: BlocklierToolboxCategory[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let toolboxPath = 'assets/blockly/toolbox/';
    if (this.type == 'py') {
      toolboxPath += 'python.xml';
    } else {
      toolboxPath += 'javascript.xml';
    }
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.httpClient
      .get(toolboxPath, { responseType: 'text' })
      .subscribe((xml) => {
        const $host = this.container.nativeElement;

        this.workspace = Blockly.inject($host, {
          media: 'assets/blockly/media/',
          grid: {
            spacing: 20,
            length: 6,
            colour: '#88888866',
            snap: true,
          },
          zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 2,
            minScale: 0.5,
            scaleSpeed: 1.2,
          },
          renderer: BlocklierRenderer.name,
          toolbox: xml,
        });
        this.workspace.registerButtonCallback('varCreateAny', (button) => {
          this.createVariable(button, undefined);
        });
        this.workspace.registerButtonCallback('varCreateNumber', (button) => {
          this.createVariable(button, 'Number');
        });
        this.workspace.registerButtonCallback('varCreateBoolean', (button) => {
          this.createVariable(button, 'Boolean');
        });
        this.workspace.registerButtonCallback('varCreateString', (button) => {
          this.createVariable(button, 'String');
        });
        this.workspace.registerButtonCallback('varCreateArray', (button) => {
          this.createVariable(button, 'Array');
        });
        this.workspace.registerButtonCallback('varCreateModule', (button) => {
          this.createVariable(button, 'Module');
        });
        this.workspace.registerButtonCallback(
          'varCreateTransforms',
          (button) => {
            this.createVariable(button, 'Transforms');
          },
        );
        this.workspace.registerButtonCallback(
          'varCreateLearner',
          (button) => {
            this.createVariable(button, 'Learner');
          },
        );

        this.workspace.addChangeListener((event: Event) => {
          this.change.emit(event);
        });

        this.toolbox = this.workspace.getToolbox();
        const flyout = this.toolbox.getFlyout();
        flyout.autoClose = true;

        this.categories = this.resolveToolboxCategories(
          $host.querySelector<HTMLDivElement>('.blocklyToolboxDiv')!,
        );

        this.workspace.setTheme(BlocklierTheme.themeLight);
        this.toolbox.setVisible(false);

        this.init.emit();
      });
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  setTheme(isLight: boolean): void {
    if (isLight) {
      this.workspace.setTheme(BlocklierTheme.themeLight);
    } else {
      this.workspace.setTheme(BlocklierTheme.themeDark);
    }
    this.toolbox.setVisible(false);
    Blockly.svgResize(this.workspace);
  }

  private resolveToolboxCategories(
    $root: HTMLDivElement,
    depth = 1,
  ): BlocklierToolboxCategory[] {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const $categories = $root.querySelectorAll<HTMLDivElement>(
      ':scope > .blocklyToolboxContents > .blocklyToolboxCategory',
    );
    const results: BlocklierToolboxCategory[] = [];
    for (let i = 0; i < $categories.length; i++) {
      const $host = $categories[i];
      const $row = $host.querySelector<HTMLDivElement>(
        ':scope > .blocklyTreeRow',
      )!;
      const $label = $row.querySelector<HTMLSpanElement>('.blocklyTreeLabel')!;
      const children = this.resolveToolboxCategories($host, depth + 1);
      if (children.length) $row.click(); // expand the child categories.
      const name = $label.innerHTML;
      let color = colorMap.get(name);
      color = color ? color : '#aaaaaa';
      results.push({ name, depth, $host, $row, children, color });
    }
    return results;
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  createVariable(button: any, type: string | undefined): void {
    Blockly.Variables.createVariableButtonHandler(
      button.getTargetWorkspace(),
      undefined,
      type,
    );
  }
}

/**
 *
 * @param rgba
 * @see https://stackoverflow.com/a/3627747/14952417
 */
function rgba2hex(rgba: string): string {
  const hex = rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    ?.slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, '0')
        .replace('NaN', ''),
    )
    .join('');
  if (!hex) throw new Error('rgba2hex failed');
  return `#${hex}`;
}

export interface BlocklierToolboxCategory {
  name: string;
  color: string;
  depth: number;
  $host: HTMLDivElement;
  $row: HTMLDivElement;
  children: BlocklierToolboxCategory[];
}
