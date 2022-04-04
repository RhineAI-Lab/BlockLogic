import { Injectable } from '@angular/core';

import { Project } from '../../common/project.class';
import { SpaceSidebarProjectsController } from '../space-sidebar-projects/space-sidebar-projects.component';
import { SpaceTabBarController } from '../space-tab-bar/space-tab-bar.component';

@Injectable()
// Space区域全局外观样式管理服务
export class SpaceStyleService {
  // TODO: remove
  public tabBarController?: SpaceTabBarController;
  public sidebarProjectController?: SpaceSidebarProjectsController;

  private option = {
    editorMode: SpaceStyleEditorMode.Logic,
    showMode: SpaceStyleShowMode.Split,
  };

  constructor() {}

  changeShowMode(mode: SpaceStyleShowMode): void {
    this.tabBarController?.changeShowMode(mode);
  }
  changeEditorMode(mode: SpaceStyleEditorMode): void {
    this.tabBarController?.changeEditorMode(mode);
  }

  setEditorMode(mode: SpaceStyleEditorMode): void {
    this.option.editorMode = mode;
  }
  setShowMode(mode: SpaceStyleShowMode): void {
    this.option.showMode = mode;
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

export enum SpaceStyleShowMode {
  Block,
  Split,
  Code,
}

export enum SpaceStyleEditorMode {
  Logic,
  Design,
}
