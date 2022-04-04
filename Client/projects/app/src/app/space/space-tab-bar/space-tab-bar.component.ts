import { AfterViewInit, Component, OnInit } from '@angular/core';

import { IconUtils } from '../../common/utils/icon.utils';
import { SpaceStyleService } from '../shared/space-style.service';

@Component({
  selector: 'app-space-tab-bar',
  templateUrl: './space-tab-bar.component.html',
  styleUrls: ['./space-tab-bar.component.less'],
})
export class SpaceTabBarComponent implements OnInit, AfterViewInit {
  constructor(private styleService: SpaceStyleService) {}

  editorMode: SpaceEditorMode = SpaceEditorMode.Logic;
  layoutMode: SpaceLayoutMode = SpaceLayoutMode.Split;

  EditorMode = SpaceEditorMode;
  LayoutMode = SpaceLayoutMode;

  tabs: TabItem[] = [
    new TabItem('file.js', 'project/file.js'),
    new TabItem('main.js', 'project/main.js', true),
    new TabItem('ui.xml', 'project/ui.xml'),
  ];

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.styleService.tabBarController = {
      changeEditorMode: (mode: SpaceEditorMode): void => {
        this.editorMode = mode;
      },
      changeLayoutMode: (mode: SpaceLayoutMode): void => {
        this.layoutMode = mode;
      },

      openFile: (file: string): void => {
        const path: string[] = file.split('/');
        const name = path[path.length - 1];
        this.tabs.push(new TabItem(name, file, false));
        this.styleService.changeFile(file);
      },
      changeFile: (file: string): boolean => {
        const i = this.getTabIndexByFile(file);
        if (i == -1) {
          return false;
        } else {
          for (const tab of this.tabs) {
            tab.selected = false;
          }
          this.tabs[i].selected = true;
          return true;
        }
      },
      closeFile: (file: string): boolean => {
        const i = this.getTabIndexByFile(file);
        if (i == -1) {
          return false;
        } else {
          if (this.tabs[i].selected) {
            if (this.tabs.length == 1) {
              return false;
            } else {
              if (i == 0) {
                this.styleService.changeFile(this.tabs[1].file);
              } else {
                this.styleService.changeFile(this.tabs[i - 1].file);
              }
            }
          }
          this.tabs.splice(i, 1);
          return true;
        }
      },
    };
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
    this.styleService.changeEditorMode(mode);
  }
  onLayoutModeChange(mode: SpaceLayoutMode): void {
    this.styleService.changeShowMode(mode);
  }

  onTabClick(item: TabItem): void {
    this.styleService.changeFile(item.file);
  }
  onTabClose(item: TabItem): void {
    this.styleService.closeFile(item.file);
  }

  getFileIcon(name: string): string {
    return IconUtils.getIconByFileName(name);
  }
}

export interface SpaceTabBarController {
  changeEditorMode: (mode: SpaceEditorMode) => void;
  changeLayoutMode: (mode: SpaceLayoutMode) => void;

  openFile: (file: string) => void;
  changeFile: (file: string) => boolean;
  closeFile: (file: string) => boolean;
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

export enum SpaceEditorMode {
  Logic = '逻辑模式',
  Design = '设计模式',
}

export enum SpaceLayoutMode {
  Visual,
  Split,
  Classic,
}
