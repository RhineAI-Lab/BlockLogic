import { Injectable } from '@angular/core';

import { Project } from '../../common/project.class';
import { SpaceSidebarProjectsController } from '../space-sidebar-projects/space-sidebar-projects.component';
import {
  SpaceEditorMode,
  SpaceLayoutMode,
  SpaceTabBarController,
} from '../space-tab-bar/space-tab-bar.component';

@Injectable()
// Space区域全局外观样式管理服务
export class SpaceStyleService {
  // TODO: remove
  public tabBarController?: SpaceTabBarController;
  public sidebarProjectController?: SpaceSidebarProjectsController;

  private option = {
    editorMode: SpaceEditorMode.Logic,
    layoutMode: SpaceLayoutMode.Split,
  };

  constructor() {}

  changeShowMode(mode: SpaceLayoutMode): void {
    this.tabBarController?.changeLayoutMode(mode);
  }
  changeEditorMode(mode: SpaceEditorMode): void {
    this.tabBarController?.changeEditorMode(mode);
  }

  setEditorMode(mode: SpaceEditorMode): void {
    this.option.editorMode = mode;
  }
  setLayoutMode(mode: SpaceLayoutMode): void {
    this.option.layoutMode = mode;
  }

  openFile(file: string): void {
    this.tabBarController?.openFile(file);
  }
  changeFile(file: string): void {
    this.tabBarController?.changeFile(file);
  }
  closeFile(file: string): void {
    this.tabBarController?.closeFile(file);
  }

  openProject(project: Project): void {
    this.sidebarProjectController?.changeData(project);
  }
}
