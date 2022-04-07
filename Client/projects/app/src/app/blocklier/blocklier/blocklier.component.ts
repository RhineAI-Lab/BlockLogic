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
  @Output() init = new EventEmitter();
  @Output() change = new EventEmitter();
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  workspace!: Blockly.WorkspaceSvg;
  categories: BlocklierToolboxCategory[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.httpClient
      .get('assets/toolbox.xml', { responseType: 'text' })
      .subscribe((xml) => {
        const $host = this.container.nativeElement;

        this.workspace = Blockly.inject($host, {
          media: 'assets/blockly/media/',
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
        this.init.emit();
        this.workspace.addChangeListener((event: Event) => {
          this.change.emit(event);
        });

        const toolbox = this.workspace.getToolbox();
        toolbox.setVisible(false);
        const flyout = toolbox.getFlyout();
        flyout.autoClose = true;

        this.categories = this.resolveToolboxCategories(
          $host.querySelector<HTMLDivElement>('.blocklyToolboxDiv')!,
        );
      });
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
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
      const colorRgba = $row.style.borderLeftColor;
      const color = colorRgba ? rgba2hex(colorRgba) : '#aaaaaa';
      results.push({ name, depth, $host, $row, children, color });
    }
    return results;
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
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
