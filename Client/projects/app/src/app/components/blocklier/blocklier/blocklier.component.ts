import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as Blockly from 'blockly';

import { BlocklierRenderer } from '../blocklier-renderer';

@Component({
  selector: 'app-blocklier',
  templateUrl: './blocklier.component.html',
  styleUrls: ['./blocklier.component.less'],
})
export class BlocklierComponent implements OnInit, AfterViewInit {
  @Output() change = new EventEmitter();
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  workspace!: Blockly.WorkspaceSvg;
  categories: ToolboxCategory[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.httpClient
      .get('assets/toolbox.xml', { responseType: 'text' })
      .subscribe((xml) => {
        const $host = this.container.nativeElement;

        this.workspace = Blockly.inject($host, {
          grid: {
            spacing: 20,
            length: 6,
            colour: '#ddd',
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
        this.workspace.addChangeListener(() => this.change.emit());

        const toolbox = this.workspace.getToolbox();
        toolbox.setVisible(false);
        const flyout = toolbox.getFlyout();
        flyout.autoClose = false;

        this.categories = this.resolveToolboxCategories(
          $host.querySelector<HTMLDivElement>('.blocklyToolboxDiv')!,
        );
      });
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  toCode(): string {
    return Blockly.JavaScript.workspaceToCode(this.workspace);
  }

  private resolveToolboxCategories(
    $root: HTMLDivElement,
    depth = 1,
  ): ToolboxCategory[] {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const $categories = $root.querySelectorAll<HTMLDivElement>(
      ':scope > .blocklyToolboxContents > .blocklyToolboxCategory',
    );
    const results: ToolboxCategory[] = [];
    for (let i = 0; i < $categories.length; i++) {
      const $host = $categories[i];
      const $row = $host.querySelector<HTMLDivElement>(
        ':scope > .blocklyTreeRow',
      )!;
      const $label = $row.querySelector<HTMLSpanElement>('.blocklyTreeLabel')!;
      const children = this.resolveToolboxCategories($host, depth + 1);
      if (children.length) $row.click(); // expand the child categories.
      results.push({ name: $label.innerHTML, depth, $host, $row, children });
    }
    return results;
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }
}

interface ToolboxCategory {
  name: string;
  depth: number;
  $host: HTMLDivElement;
  $row: HTMLDivElement;
  children: ToolboxCategory[];
}
