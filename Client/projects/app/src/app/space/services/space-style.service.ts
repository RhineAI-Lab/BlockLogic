import {Injectable} from '@angular/core';
import {SpaceModule} from "../space.module";
import {SpaceToolsBarController} from "../space-tools-bar/space-tools-bar.component";
import {SpaceHeaderController} from "../space-header/space-header.component";
import {SpaceSidebarManagerController} from "../space-sidebar-manager/space-sidebar-manager.component";
import {SpaceMainLayoutController} from "../space.component";
import {SpaceTabssetBarController} from "../space-tabsset-bar/space-tabsset-bar.component";

@Injectable({
  providedIn: 'root'
})

// Space区域全局显示样式管理服务
export class SpaceStyleService {
  constructor() { }

  public mainLayoutController? : SpaceMainLayoutController;
  public toolsBarController? : SpaceToolsBarController;
  public headerController? : SpaceHeaderController;
  public sidebarManagerController? : SpaceSidebarManagerController;
  public tabssetBarController? : SpaceTabssetBarController;

  public showHeader: boolean = true;

  option: SpaceStyleOption = {
    editorMode: OPTION.EDITOR_MODE_LOGIC,
    showMode: OPTION.SHOW_M0DE_SPLIT
  }

  changeHeaderDisplay(show: boolean){
    this.showHeader = show
    this.toolsBarController?.changeShowHideHeaderBtn(!show)
    this.headerController?.changeShowHeader(show)
    this.freshMainLayout(true)
  }
  async freshMainLayout(needWait: boolean = false) {
    if (needWait) {
      await new Promise(r => setTimeout(r))
      this.mainLayoutController?.freshMainLayout()
    } else {
      this.mainLayoutController?.freshMainLayout()
    }
  }
  changeShowMode(mode: number){
    this.tabssetBarController?.changeShowMode(mode)
  }
  changeEditorMode(mode: number){
    this.tabssetBarController?.changeEditorMode(mode)
  }

  openFile(file: string){
    this.tabssetBarController?.openFile(file)
  }
  changeFile(file: string){
    this.tabssetBarController?.changeFile(file)
  }
  closeFile(file: string){
    this.tabssetBarController?.closeFile(file)
  }

  setEditorMode(mode: number){
    this.option.editorMode = mode
  }
  setShowMode(mode: number){
    this.option.showMode = mode
  }


}

interface SpaceStyleOption {
  editorMode: number
  showMode: number
}

//TODO 重复静态常量
class OPTION {
  static readonly SHOW_MODE_BLOCK: number = 0;
  static readonly SHOW_M0DE_SPLIT: number = 1;
  static readonly SHOW_M0DE_CODE: number = 2;
  static readonly EDITOR_MODE_LOGIC: number = 0;
  static readonly EDITOR_M0DE_DESIGN: number = 1;
}
