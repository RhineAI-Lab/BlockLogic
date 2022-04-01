import {Injectable} from '@angular/core';
import {SpaceModule} from "../space.module";
import {SpaceToolsBarController} from "../space-tools-bar/space-tools-bar.component";
import {SpaceHeaderController} from "../space-header/space-header.component";

@Injectable({
  providedIn: 'root'
})

// Space区域全局显示样式管理服务
export class SpaceStyleService {
  public freshMainLayout: Function;
  public hideSidebar: Function;

  public toolsBarController? : SpaceToolsBarController;
  public headerController? : SpaceHeaderController;

  public showHeader: boolean = true;

  public option = {

  }

  constructor() {
    this.freshMainLayout = (): boolean => {
      return false
    }
    this.hideSidebar = (name: string): boolean => {
      return false
    }
  }

  onChangeHeaderDisplay(show: boolean){
    this.showHeader = show
    this.toolsBarController?.changeShowHideHeaderBtn(!show)
    this.headerController?.changeShowHeader(show)
  }

}
