import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Blockly, NgxBlocklyConfig, NgxBlocklyGenerator } from 'ngx-blockly';

import {
  AppAutojsBlock,
  AppEditFileBlock,
  AppGetAppNameBlock,
  AppGetPackageNameBlock,
  AppLaunchAppBlock,
  AppLaunchBlock,
  AppOpenAppSettingBlock,
  AppOpenUrlBlock,
  AppSendEmailBlock,
  AppStartActivityBlock,
  AppUninstallBlock,
  AppVersionCodeBlock,
  AppVersionNameBlock,
  AppViewFileBlock,
} from '../definitions/app.blocks';
import { CustomBlockEnhanced } from '../definitions/common';
import { ListsGetBlock, ListsSetBlock } from '../definitions/lists.blocks';

@Component({
  selector: 'app-blocklier',
  templateUrl: './blocklier.component.html',
  styleUrls: ['./blocklier.component.less'],
})
export class BlocklierComponent implements OnInit {
  blocks = CustomBlockEnhanced.use([
    ListsGetBlock,
    ListsSetBlock,
    AppVersionCodeBlock,
    AppVersionNameBlock,
    AppAutojsBlock,
    AppLaunchBlock,
    AppLaunchAppBlock,
    AppGetPackageNameBlock,
    AppGetAppNameBlock,
    AppOpenAppSettingBlock,
    AppViewFileBlock,
    AppEditFileBlock,
    AppUninstallBlock,
    AppOpenUrlBlock,
    AppSendEmailBlock,
    AppStartActivityBlock,
  ]);
  config?: NgxBlocklyConfig;
  categories: ToolboxCategory[] = [];
  categorySelected?: ToolboxCategory;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this.httpClient
      .get('assets/toolbox.xml', { responseType: 'text' })
      .subscribe(
        (xmlText) =>
          (this.config = {
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
            toolbox: xmlText,
            generators: [NgxBlocklyGenerator.JAVASCRIPT],
          }),
      );
  }

  onWorkspaceInit(workspace: Blockly.WorkspaceSvg): void {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const toolbox = workspace.getToolbox();
    toolbox.setVisible(false);
    const flyout = toolbox.getFlyout();
    flyout.autoClose = false;
    const $host = this.elementRef.nativeElement;
    const $root = $host.querySelector<HTMLDivElement>('.blocklyToolboxDiv')!;
    this.categories = this.resolveToolboxCategories($root);
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
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

  console = console;
}

interface ToolboxCategory {
  name: string;
  depth: number;
  $host: HTMLDivElement;
  $row: HTMLDivElement;
  children: ToolboxCategory[];
}
