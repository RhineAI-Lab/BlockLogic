import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-tabsset-bar',
  templateUrl: './space-tabsset-bar.component.html',
  styleUrls: ['./space-tabsset-bar.component.less']
})
export class SpaceTabssetBarComponent implements OnInit {

  mode: string = "split"
  tabs: TabItem[] = [
    new TabItem("file.js","project/file.js"),
    new TabItem("main.js","project/main.js",true),
    new TabItem("ui.xml","project/ui.xml"),
  ]

  constructor() {}

  ngOnInit(): void {
  }

  onModeChange(mode: string){

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