import {Component, Injector, OnInit} from '@angular/core';
import {SpaceStyleService} from "../services/space-style.service";

@Component({
  selector: 'app-space-tabsset-bar',
  templateUrl: './space-tabsset-bar.component.html',
  styleUrls: ['./space-tabsset-bar.component.less']
})
export class SpaceTabssetBarComponent implements OnInit {

  readonly STRS_EDITOR_MODE: string[] = ['逻辑模式','设计模式']

  readonly SHOW_MODE_BLOCK: number = 0;
  readonly SHOW_M0DE_SPLIT: number = 1;
  readonly SHOW_M0DE_CODE: number = 2;

  readonly EDITOR_MODE_LOGIC: number = 0;
  readonly EDITOR_M0DE_DESIGN: number = 1;

  styleService: SpaceStyleService;
  constructor(styleService: SpaceStyleService) {
    this.styleService = styleService;
  }


  editorMode: number = this.EDITOR_MODE_LOGIC
  showMode: number = this.SHOW_M0DE_SPLIT

  tabs: TabItem[] = [
    new TabItem("file.js","project/file.js"),
    new TabItem("main.js","project/main.js",true),
    new TabItem("ui.xml","project/ui.xml"),
  ]

  ngOnInit(): void {
  }

  onEditorModeChange(mode: number){
    this.editorMode = mode;
  }
  onShowModeChange(mode: number){

  }

  onTabClick(item: TabItem){

  }
  onTabClose(item: TabItem){

  }

  getIcon(name: string): string{
    if(name.indexOf(".js")>=0){
      return 'file-text'
    }else{
      return 'file'
    }
  }

}

class TabItem{
  name: string;
  file: string;
  selected: boolean;

  constructor(name: string, file: string, selected: boolean = false) {
    this.name = name;
    this.file = file;
    this.selected = selected;
  }
}