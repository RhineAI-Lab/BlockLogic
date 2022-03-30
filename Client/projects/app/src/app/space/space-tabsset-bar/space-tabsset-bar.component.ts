import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-tabsset-bar',
  templateUrl: './space-tabsset-bar.component.html',
  styleUrls: ['./space-tabsset-bar.component.less']
})
export class SpaceTabssetBarComponent implements OnInit {

  mode: string = "split"
  tabs: TabItem[] = [
      new TabItem("File.js","project/File.js")
  ]

  constructor() {}

  ngOnInit(): void {
  }

  onModeChange(mode: string){

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