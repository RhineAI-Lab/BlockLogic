import { Component, OnInit } from '@angular/core';
import {SpaceSidebarProjectsComponent} from "../space-sidebar-projects/space-sidebar-projects.component";
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";

@Component({
  selector: 'app-space-sidebar-manager',
  templateUrl: './space-sidebar-manager.component.html',
  styleUrls: ['./space-sidebar-manager.component.less'],
})
export class SpaceSidebarManagerComponent implements OnInit {
  constructor() {}

  items: Item[] = [
      new Item('项目','folder',SpaceSidebarProjectsComponent,'left-top',true,true),
  ];

  ngOnInit(): void {}
}

class Item<Component = unknown> {
  icon: string;
  name: string;
  component: ComponentType<Component>;

  position: string;

  isOpen: boolean;
  showTab: boolean;


  constructor(
      icon: string,
      name: string,
      component: ComponentType<Component>,
      position: string = "left-top",
      isOpen: boolean = false,
      showTab: boolean = true) {
    this.icon = icon;
    this.name = name;
    this.component = component;
    this.position = position;
    this.isOpen = isOpen;
    this.showTab = showTab;
  }
}
