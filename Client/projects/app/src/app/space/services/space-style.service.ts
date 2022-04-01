import {Injectable} from '@angular/core';
import {SpaceModule} from "../space.module";
import {SpaceToolsBarController} from "../space-tools-bar/space-tools-bar.component";
import {SpaceHeaderController} from "../space-header/space-header.component";
import {SpaceSidebarManagerController} from "../space-sidebar-manager/space-sidebar-manager.component";
import {SpaceMainLayoutController} from "../space.component";

@Injectable({
  providedIn: 'root'
})

// Space区域全局显示样式管理服务
export class SpaceStyleService {
  public mainLayoutController? : SpaceMainLayoutController;
  public toolsBarController? : SpaceToolsBarController;
  public headerController? : SpaceHeaderController;
  public sidebarManagerController? : SpaceSidebarManagerController;

  public showHeader: boolean = true;

  constructor() { }

  changeHeaderDisplay(show: boolean){
    this.showHeader = show
    this.toolsBarController?.changeShowHideHeaderBtn(!show)
    this.headerController?.changeShowHeader(show)
  }

  freshMainLayout(){
    this.mainLayoutController?.freshMainLayout()
  }

}

interface spaceStyleOption {
  editorMode: number
  showMode: number
}

class STATIC_OPTION {

}


