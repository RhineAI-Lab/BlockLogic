import { Injectable } from '@angular/core';

import { BFile } from '../../common/bfile.class';
import { SpaceMainLayoutController } from '../space.component';
import { SpaceHeaderController } from '../space-header/space-header.component';
import { SpaceSidebarManagerController } from '../space-sidebar-manager/space-sidebar-manager.component';
import { SpaceSidebarProjectsController } from '../space-sidebar-projects/space-sidebar-projects.component';
import { SpaceTabssetBarController } from '../space-tabsset-bar/space-tabsset-bar.component';
import { SpaceToolsBarController } from '../space-tools-bar/space-tools-bar.component';
import {SpaceDevelopService} from "./space-develop.service";
import {Project} from "../../common/project.class";

@Injectable({
  providedIn: 'root',
})

// Space区域全局外观样式管理服务
export class SpaceStyleService {
  spaceDevelopService: SpaceDevelopService;
  constructor(spaceDevelopService: SpaceDevelopService) {
    this.spaceDevelopService = spaceDevelopService
    this.spaceDevelopService.spaceStyleService = this
  }

  public mainLayoutController?: SpaceMainLayoutController;
  public toolsBarController?: SpaceToolsBarController;
  public headerController?: SpaceHeaderController;
  public sidebarManagerController?: SpaceSidebarManagerController;
  public tabssetBarController?: SpaceTabssetBarController;
  public sidebarProjectController?: SpaceSidebarProjectsController;

  public showHeader = true;

  option: SpaceStyleOption = {
    editorMode: OPTION.EDITOR_MODE_LOGIC,
    showMode: OPTION.SHOW_M0DE_SPLIT,
  };

  changeHeaderDisplay(show: boolean): void {
    this.showHeader = show;
    this.toolsBarController?.changeShowHideHeaderBtn(!show);
    this.headerController?.changeShowHeader(show);
    this.freshMainLayout(true);
  }
  async freshMainLayout(needWait = false): Promise<any> {
    if (needWait) {
      await new Promise((r) => setTimeout(r));
      this.mainLayoutController?.freshMainLayout();
    } else {
      this.mainLayoutController?.freshMainLayout();
    }
  }
  changeShowMode(mode: number): void {
    this.tabssetBarController?.changeShowMode(mode);
  }
  changeEditorMode(mode: number): void {
    this.tabssetBarController?.changeEditorMode(mode);
  }

  setEditorMode(mode: number): void {
    this.option.editorMode = mode;
  }
  setShowMode(mode: number): void {
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

interface SpaceStyleOption {
  editorMode: number;
  showMode: number;
}

//TODO 重复静态常量
class OPTION {
  static readonly SHOW_MODE_BLOCK: number = 0;
  static readonly SHOW_M0DE_SPLIT: number = 1;
  static readonly SHOW_M0DE_CODE: number = 2;

  static readonly EDITOR_MODE_LOGIC: number = 0;
  static readonly EDITOR_M0DE_DESIGN: number = 1;
}
