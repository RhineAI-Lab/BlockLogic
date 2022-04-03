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
      const color = colors[name] ?? '#AAAAAA';
      results.push({ name, depth, $host, $row, children, color });
    }
    return results;
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }
}

export interface BlocklierToolboxCategory {
  name: string;
  color: string;
  depth: number;
  $host: HTMLDivElement;
  $row: HTMLDivElement;
  children: BlocklierToolboxCategory[];
}

// TODO: refactor
const colors: Record<string, string> = {
  ['常用语句']: '#AAAAAA',
  ['循环']: '#5AA45A',
  ['变量']: '#A45A7F',
  ['函数']: '#985AA4',
  ['逻辑']: '#5A7FA4',
  ['数学']: '#5A66A4',
  ['文本']: '#5AA48B',
  ['列表']: '#735AA4',
  ['颜色']: '#A4735A',
  ['基于坐标操作']: '#5A66A4',
  ['基于控件操作']: '#2195F1',
  ['无障碍服务']: '#e5af00',
  ['触摸模拟对象']: '#e6645c',
  ['快捷控件操作']: '#90b01f',
  ['自定义块']: '#888888',
  ['设备']: '#3264e1',
  ['设备信息']: '#698a8a',
  ['控制台']: '#0eaf9e',
  ['HTTP']: '#339999',
  ['对话框']: '#9abc86',
  ['全局']: '#7476c6',
  ['本地储存']: '#cb863a',
  ['文件系统']: '#b9993d',
  ['多媒体']: '#d4285c',
  ['应用']: '#d56331',
  ['调试工具']: '#cc9999',
  ['意图']: '#8e30be',
  ['插件']: '#e5af00',
  ['设置']: '#c68a16',
  ['电源管理']: '#52a242',
  ['界面']: '#3c2eaf',
  ['常用功能']: '#AAAAAA',
  ['摘要/加密']: '#88282a',
  ['文本控件']: '#3c2eaf',
  ['按钮控件']: '#3c2eaf',
};
