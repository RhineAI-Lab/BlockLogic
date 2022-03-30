import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SpaceSidebarProjectsComponent} from "../space-sidebar-projects/space-sidebar-projects.component";
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";
import {SpaceSidebarConsoleComponent} from "../space-sidebar-console/space-sidebar-console.component";
import {SpaceStyleService} from "../services/space-style.service";

@Component({
  selector: 'app-space-sidebar-manager',
  templateUrl: './space-sidebar-manager.component.html',
  styleUrls: ['./space-sidebar-manager.component.less'],
})
export class SpaceSidebarManagerComponent implements OnInit {
  styleService: SpaceStyleService;

  constructor(styleService: SpaceStyleService,private injector: Injector) {
    this.styleService = styleService;
  }

  items: Item[] = [
    new Item('项目','folder',SpaceSidebarProjectsComponent,
        '项目目录树状图','left-top',300,160,true,true),
    new Item('控制台','code',SpaceSidebarConsoleComponent,
        '程序输出控制台','right-top',400,220,true,true),
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.styleService.hideSidebar = async (name: string): Promise<boolean> => {
      for (let item of this.items) {
        if (item.name == name) {
          if (item.isOpen) {
            item.isOpen = false
            await new Promise(r => setTimeout(r))
            this.styleService.freshMainLayout()
          }
          return true
        }
      }
      return false
    }
  }

  use<Component>(item: Item<Component>): ComponentPortal<Component> {
    if (item.portal) return item.portal;
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: SpaceSidebarManagerComponent, useValue: item.name },
      ],
    });
    item.portal = new ComponentPortal(item.component, undefined, injector);
    return item.portal;
  }

  onChangeWidth(e: MouseEvent, item: Item): void {
    let startX = e.clientX;
    let startW = item.width;
    document.onmousemove = (e) => {
      let endX = e.clientX;
      let finalWidth = 0;
      if(item.position.indexOf("left")>=0){
        finalWidth = startW+endX-startX
      }else if(item.position.indexOf("right")>=0){
        finalWidth = startW-endX+startX
      }
      if(finalWidth>item.minWidth){
        item.width = finalWidth
      }
      this.styleService.freshMainLayout()
    };
    document.onmouseup = (e) => {
      e.stopPropagation();
      document.onmousemove = null;
      document.onmouseup = null;
      this.styleService.freshMainLayout()
    };
  }

  async onBtnClick(item: Item): Promise<void> {
    item.isOpen = !item.isOpen
    await new Promise(r => setTimeout(r))
    this.styleService.freshMainLayout()
  }

}

class Item<Component = unknown> {
  name: string;
  icon: string;
  tooltip: string;
  component: ComponentType<Component>;
  portal?: ComponentPortal<Component>;

  position: string;
  width: number;
  minWidth: number;

  isOpen: boolean;
  showTab: boolean;

  constructor(
      name: string,
      icon: string,
      component: ComponentType<Component>,
      tooltip: string = name,
      position: string = 'left-top',
      width: number = 300,
      minWidth: number = 240,
      isOpen: boolean = false,
      showTab: boolean = true) {
    this.name = name;
    this.icon = icon;
    this.tooltip = tooltip;
    this.component = component;
    this.position = position;
    this.width = width;
    this.minWidth = minWidth;
    this.isOpen = isOpen;
    this.showTab = showTab;
  }
}
