import { Component, OnInit } from '@angular/core';
import {SpaceSidebarProjectsComponent} from "../space-sidebar-projects/space-sidebar-projects.component";
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";
import {SpaceSidebarConsoleComponent} from "../space-sidebar-console/space-sidebar-console.component";

@Component({
  selector: 'app-space-sidebar-manager',
  templateUrl: './space-sidebar-manager.component.html',
  styleUrls: ['./space-sidebar-manager.component.less'],
})
export class SpaceSidebarManagerComponent implements OnInit {
  constructor() {}

  items: Item[] = [
    new Item('项目','folder',SpaceSidebarProjectsComponent,
        '项目目录树状图','left-top',true,true),
    new Item('控制台','code',SpaceSidebarConsoleComponent,
        '程序输出控制台','right-top',true,true),
  ];

  ngOnInit(): void {}
}

class Item<Component = unknown> {
  name: string;
  icon: string;
  tooltip: string;
  component: ComponentType<Component>;

  position: string;

  isOpen: boolean;
  showTab: boolean;

  constructor(
      name: string,
      icon: string,
      component: ComponentType<Component>,
      tooltip: string = name,
      position: string = "left-top",
      isOpen: boolean = false,
      showTab: boolean = true) {
    this.name = name;
    this.icon = icon;
    this.tooltip = tooltip;
    this.component = component;
    this.position = position;
    this.isOpen = isOpen;
    this.showTab = showTab;
  }
}
