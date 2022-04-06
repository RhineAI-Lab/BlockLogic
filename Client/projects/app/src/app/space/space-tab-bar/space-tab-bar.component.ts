import { Component, OnInit } from '@angular/core';

import { IconUtils } from '../../common/utils/icon.utils';
import { SpaceEditorMode, SpaceLayoutMode } from '../common/space-modes.enums';
import { SpaceDevelopService } from '../shared/space-develop.service';
import { SpaceState } from '../shared/space-state.service';

@Component({
  selector: 'app-space-tab-bar',
  templateUrl: './space-tab-bar.component.html',
  styleUrls: ['./space-tab-bar.component.less'],
})
export class SpaceTabBarComponent implements OnInit {
  constructor(
    private developService: SpaceDevelopService,
    private stateService: SpaceState,
  ) {}

  editorMode: SpaceEditorMode = SpaceEditorMode.Logic;
  layoutMode: SpaceLayoutMode = SpaceLayoutMode.Split;

  EditorMode = SpaceEditorMode;
  LayoutMode = SpaceLayoutMode;

  tabs: TabItem[] = [
    new TabItem('file.js', 'project/file.js'),
    new TabItem('main.js', 'project/main.js', true),
    new TabItem('ui.xml', 'project/ui.xml'),
  ];

  ngOnInit(): void {
    this.developService.project$.subscribe(() => {
      // this.tabs = project.files.map(file => new TabItem(file.name, file.path));
      this.tabs.splice(0, this.tabs.length);
    });
    this.developService.targetFile$.subscribe((file) => {
      const tab = this.tabs.find((t) => t.file == file.path);
      this.tabs.forEach((t) => (t.selected = false));
      if (tab) {
        tab.selected = true;
      } else {
        this.tabs.push(new TabItem(file.name, file.path, true));
      }
    });
  }

  getTabIndexByFile(file: string): number {
    let i = -1;
    for (const tabKey in this.tabs) {
      if (this.tabs[tabKey].file == file) {
        i = parseInt(tabKey);
        break;
      }
    }
    return i;
  }

  onEditorModeChange(mode: SpaceEditorMode): void {
    this.editorMode = mode;
    this.stateService.editorMode$.next(mode);
  }
  onLayoutModeChange(mode: SpaceLayoutMode): void {
    this.layoutMode = mode;
    this.stateService.layoutMode$.next(mode);
  }

  onTabClick(item: TabItem): void {
    this.developService.openFile(item.file);
  }
  onTabClose(item: TabItem): void {
    const index = this.getTabIndexByFile(item.file);
    if (this.tabs.length > 1 && index >= 0) {
      if (item.selected) {
        this.tabs.forEach((t) => (t.selected = false));
        if (index > 0) {
          this.tabs[index - 1].selected = true;
        } else {
          this.tabs[index + 1].selected = true;
        }
      }
      this.tabs.splice(index, 1);
    }
  }

  getFileIcon(name: string): string {
    return IconUtils.getIconByFileName(name);
  }
}

class TabItem {
  name: string;
  file: string;
  selected: boolean;

  constructor(name: string, file: string, selected = false) {
    this.name = name;
    this.file = file;
    this.selected = selected;
  }
}
