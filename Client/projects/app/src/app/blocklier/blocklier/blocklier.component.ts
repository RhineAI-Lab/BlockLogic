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
  readonly allBlockList: string[] = ["常用语句","循环","变量","函数","逻辑","数学","文本","列表","颜色","基于坐标操作","基于控件操作",
    "无障碍服务","触摸模拟对象","快捷控件操作","自定义块","设备","设备信息","控制台","HTTP","对话框","全局","本地储存",
    "文件系统","多媒体","应用","调试工具","意图","插件","设置","电源管理","界面","常用功能","摘要/加密","文本控件","按钮控件"];
  readonly allBlockColor: string[] = ["#AAAAAA","#5AA45A","#A45A7F","#985AA4","#5A7FA4","#5A66A4","#5AA48B","#735AA4","#A4735A",
    "#5A66A4","#2195F1","#e5af00","#e6645c","#90b01f","#888888","#3264e1","#698a8a","#0eaf9e","#339999","#9abc86","#7476c6","#cb863a",
    "#b9993d","#d4285c","#d56331","#cc9999","#8e30be","#e5af00","#c68a16","#52a242","#3c2eaf","#AAAAAA","#88282a","#3c2eaf","#3c2eaf"];

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
      let color: string = "#AAAAAA";
      if(this.allBlockList.indexOf(name)){
        color = this.allBlockColor[this.allBlockList.indexOf(name)]
      }
      results.push({ name: name, depth, $host, $row, children, color});
    }
    return results;
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }
}

export interface BlocklierToolboxCategory {
  name: string;
  depth: number;
  $host: HTMLDivElement;
  $row: HTMLDivElement;
  children: BlocklierToolboxCategory[];
  color: string;
}
