import {Component, Injector, OnInit, AfterViewInit} from '@angular/core';
import {SpaceStyleService} from "../services/space-style.service";
import {IconUtils} from "../utils/icon.utils";

@Component({
  selector: 'app-space-tabsset-bar',
  templateUrl: './space-tabsset-bar.component.html',
  styleUrls: ['./space-tabsset-bar.component.less']
})
export class SpaceTabssetBarComponent implements OnInit, AfterViewInit {

  styleService: SpaceStyleService;
  constructor(styleService: SpaceStyleService) {
    this.styleService = styleService;
  }

  readonly STRS_EDITOR_MODE: string[] = ['逻辑模式','设计模式']

  readonly SHOW_MODE_BLOCK: number = 0;
  readonly SHOW_M0DE_SPLIT: number = 1;
  readonly SHOW_M0DE_CODE: number = 2;

  readonly EDITOR_MODE_LOGIC: number = 0;
  readonly EDITOR_M0DE_DESIGN: number = 1;

  editorMode: number = this.EDITOR_MODE_LOGIC
  showMode: number = this.SHOW_M0DE_SPLIT

  tabs: TabItem[] = [
    new TabItem("file.js","project/file.js"),
    new TabItem("main.js","project/main.js",true),
    new TabItem("ui.xml","project/ui.xml"),
  ]

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.styleService.tabssetBarController = {
      changeEditorMode: (mode: number): void => {
        this.editorMode = mode;
      },
      changeShowMode: (mode: number): void => {
        this.showMode = mode;
      },

      openFile: (file: string): void => {
        let path: string[] = file.split('/')
        let name = path[path.length-1]
        this.tabs.push(
            new TabItem(name,file,false)
        )
        this.styleService.changeFile(file)
      },
      changeFile: (file: string): boolean => {
        let i = this.getTabIndexByFile(file)
        if(i == -1){
          return false
        }else{
          for (const tab of this.tabs) {
            tab.selected=false
          }
          this.tabs[i].selected=true
          return true
        }
      },
      closeFile: (file: string): boolean => {
        let i = this.getTabIndexByFile(file)
        if(i == -1){
          return false
        }else{
          if(this.tabs[i].selected){
            if(this.tabs.length==1){
              return false
            }else{
              if(i==0){
                this.styleService.changeFile(this.tabs[1].file)
              }else{
                this.styleService.changeFile(this.tabs[i-1].file)
              }
            }
          }
          this.tabs.splice(i, 1);
          return true
        }
      }
    }
  }

  getTabIndexByFile(file: string): number{
    let i = -1;
    for (const tabKey in this.tabs) {
      if(this.tabs[tabKey].file==file){
        i = parseInt(tabKey)
        break
      }
    }
    return i
  }

  onEditorModeChange(mode: number){
    this.styleService.changeEditorMode(mode);
  }
  onShowModeChange(mode: number){
    this.styleService.changeShowMode(mode);
  }

  onTabClick(item: TabItem){
    this.styleService.changeFile(item.file)
  }
  onTabClose(item: TabItem){
    this.styleService.closeFile(item.file)
  }

  getFileIcon(name: string): string {
    return IconUtils.getIconByFileName(name)
  }
}

export interface SpaceTabssetBarController {
  changeEditorMode: Function
  changeShowMode: Function

  openFile: Function
  changeFile: Function
  closeFile: Function
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