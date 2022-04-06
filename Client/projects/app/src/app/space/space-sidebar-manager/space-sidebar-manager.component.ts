import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';

import { wait } from '../../common/promisify.utils';
import { SpaceState } from '../shared/space-state.service';
import { SpaceComponent } from '../space.component';
import { SpaceSidebarConsoleComponent } from '../space-sidebar-console/space-sidebar-console.component';
import { SpaceSidebarProjectsComponent } from '../space-sidebar-projects/space-sidebar-projects.component';
import { SpaceSidebarTerminalComponent } from '../space-sidebar-terminal/space-sidebar-terminal.component';

@Component({
  selector: 'app-space-sidebar-manager',
  templateUrl: './space-sidebar-manager.component.html',
  styleUrls: ['./space-sidebar-manager.component.less'],
})
export class SpaceSidebarManagerComponent implements OnInit, AfterViewInit {
  constructor(
    private layout: SpaceComponent,
    private spaceState: SpaceState,
    private injector: Injector,
  ) {}

  items: SpaceSidebarEntry[] = [
    this.use({
      name: '项目',
      icon: 'folder',
      component: SpaceSidebarProjectsComponent,
      tooltip: '项目目录树状图',
      position: 'left-top',
      width: 260,
      minWidth: 160,
      isOpen: true,
      showTab: true,
    }),
    this.use({
      name: '控制台',
      icon: 'code',
      component: SpaceSidebarConsoleComponent,
      tooltip: '程序输出控制台',
      position: 'right-top',
      width: 400,
      minWidth: 220,
      isOpen: true,
      showTab: true,
    }),
    this.use({
      name: '终端',
      icon: 'control',
      component: SpaceSidebarTerminalComponent,
      tooltip: '控制终端',
      position: 'right-top',
      width: 400,
      minWidth: 220,
      isOpen: false,
      showTab: true,
    }),
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  async hide(name: string): Promise<boolean> {
    for (const item of this.items) {
      if (item.name == name) {
        if (item.isOpen) {
          item.isOpen = false;
          await wait();
          this.spaceState.needResize$.next();
        }
        return true;
      }
    }
    return false;
  }

  onChangeWidth(e: MouseEvent, item: SpaceSidebarEntry): void {
    const startX = e.clientX;
    const startW = item.width;
    document.onmousemove = (e) => {
      const endX = e.clientX;
      let finalWidth = 0;
      if (item.position.includes('left')) {
        finalWidth = startW + endX - startX;
      } else if (item.position.includes('right')) {
        finalWidth = startW - endX + startX;
      }
      if (finalWidth > item.minWidth) {
        item.width = finalWidth;
      }
      this.spaceState.needResize$.next();
    };
    document.onmouseup = (e) => {
      e.stopPropagation();
      document.onmousemove = null;
      document.onmouseup = null;
      this.spaceState.needResize$.next();
    };
  }

  async onBtnClick(item: SpaceSidebarEntry): Promise<void> {
    item.isOpen = !item.isOpen;
    await wait();
    this.spaceState.needResize$.next();
  }

  private use<Component>(
    definition: SpaceSidebarEntry<Component>,
  ): SpaceSidebarEntry<Component> {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: SpaceSidebarEntry, useValue: definition }],
    });
    const portal = new ComponentPortal(
      definition.component,
      undefined,
      injector,
    );
    definition.portal = portal;
    return definition;
  }
}

export abstract class SpaceSidebarEntry<Component = unknown> {
  abstract name: string;
  abstract icon: string;
  abstract component: ComponentType<Component>;
  abstract tooltip: string;
  abstract position: string;
  abstract width: number;
  abstract minWidth: number;
  abstract isOpen: boolean;
  abstract showTab: boolean;
  abstract portal?: ComponentPortal<Component>;
}
