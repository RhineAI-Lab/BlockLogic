import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Project } from '../../common/project.class';
import { SpaceMainLayoutController } from '../space.component';
import { SpaceHeaderController } from '../space-header/space-header.component';
import { SpaceSidebarManagerController } from '../space-sidebar-manager/space-sidebar-manager.component';
import { SpaceSidebarProjectsController } from '../space-sidebar-projects/space-sidebar-projects.component';
import { SpaceTabssetBarController } from '../space-tabsset-bar/space-tabsset-bar.component';
import { SpaceToolsBarController } from '../space-tools-bar/space-tools-bar.component';

@Injectable()
// TODO: purpose of this service?
// Space区域全局外观样式管理服务
export class SpaceStyleService {
  // TODO: ??????
  public mainLayoutController?: SpaceMainLayoutController;
  public toolsBarController?: SpaceToolsBarController;
  public headerController?: SpaceHeaderController;
  public sidebarManagerController?: SpaceSidebarManagerController;
  public tabssetBarController?: SpaceTabssetBarController;
  public sidebarProjectController?: SpaceSidebarProjectsController;

  public showHeader = true;

  private option = {
    editorMode: SpaceStyleEditorMode.Logic,
    showMode: SpaceStyleShowMode.Split,
  };

  // TODO: is `notifier` required?
  constructor(private notifier: NzNotificationService) {}

  changeHeaderDisplay(show: boolean): void {
    this.showHeader = show;
    this.toolsBarController?.changeShowHideHeaderBtn(!show);
    this.headerController?.changeShowHeader(show);
    this.freshMainLayout(true);
  }

  async freshMainLayout(needWait = false): Promise<any> {
    if (needWait) await new Promise((r) => setTimeout(r));
    this.mainLayoutController?.freshMainLayout();
  }

  changeShowMode(mode: SpaceStyleShowMode): void {
    this.tabssetBarController?.changeShowMode(mode);
  }
  changeEditorMode(mode: SpaceStyleEditorMode): void {
    this.tabssetBarController?.changeEditorMode(mode);
  }

  setEditorMode(mode: SpaceStyleEditorMode): void {
    this.option.editorMode = mode;
  }
  setShowMode(mode: SpaceStyleShowMode): void {
    this.option.showMode = mode;
  }

  openFile(file: string): void {
    this.tabssetBarController?.openFile(file);
  }
  changeFile(file: string): void {
    this.tabssetBarController?.changeFile(file);
  }
  closeFile(file: string): void {
    this.tabssetBarController?.closeFile(file);
  }

  openProject(project: Project): void {
    this.sidebarProjectController?.changeData(project);
  }
}

export enum SpaceStyleShowMode {
  Block,
  Split,
  Code,
}

export enum SpaceStyleEditorMode {
  Logic,
  Design,
}
