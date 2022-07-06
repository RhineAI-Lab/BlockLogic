import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { SpaceState, ThemeMode } from '../services/space-state.service';
import { SpaceComponent } from '../space.component';
import { SpaceSidebarConsoleOldComponent } from '../space-sidebar-console-old/space-sidebar-console-old.component';
import { SpaceSidebarProjectsComponent } from '../space-sidebar-projects/space-sidebar-projects.component';
import { SpaceSidebarTerminalComponent } from '../space-sidebar-terminal/space-sidebar-terminal.component';
import { SpaceDevelopService } from '../services/space-develop.service';
import { SpaceSidebarUiNewComponent } from '../space-sidebar-ui-new/space-sidebar-ui-new.component';
import { SpaceSidebarUiStructureComponent } from '../space-sidebar-ui-structure/space-sidebar-ui-structure.component';
import { SpaceSidebarUiTreeComponent } from '../space-sidebar-ui-tree/space-sidebar-ui-tree.component';
import { SpaceSidebarUiAttributeComponent } from '../space-sidebar-ui-attribute/space-sidebar-ui-attribute.component';

@Component({
  selector: 'app-space-sidebar-manager',
  templateUrl: './space-sidebar-manager.component.html',
  styleUrls: ['./space-sidebar-manager.component.less'],
})
export class SpaceSidebarManagerComponent implements OnInit, AfterViewInit {
  constructor(
    private layout: SpaceComponent,
    private developService: SpaceDevelopService,
    private state: SpaceState,
    private injector: Injector,
  ) {}

  items: SpaceSidebarEntry[] = [
    this.use({
      name: '项目',
      icon: 'folder',
      component: SpaceSidebarProjectsComponent,
      tooltip: '项目目录树状图',
      position: 'left-top',
      width: 240,
      minWidth: 160,
      isOpen: true,
      showTab: true,
    }),
    this.use({
      name: '控制台',
      icon: 'code',
      component: SpaceSidebarConsoleOldComponent,
      tooltip: '程序输出控制台',
      position: 'right-top',
      width: 380,
      minWidth: 220,
      isOpen: false,
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
    this.use({
      name: ' UI 新增',
      icon: 'appstore-add',
      component: SpaceSidebarUiNewComponent,
      tooltip: '新增UI控件',
      position: 'left-top',
      width: 280,
      minWidth: 180,
      isOpen: false,
      showTab: true,
    }),
    this.use({
      name: ' UI 控件树',
      icon: 'menu-unfold',
      component: SpaceSidebarUiTreeComponent,
      tooltip: '控件树视图',
      position: 'left-top',
      width: 280,
      minWidth: 180,
      isOpen: false,
      showTab: true,
    }),
    this.use({
      name: ' UI 结构',
      icon: 'appstore',
      component: SpaceSidebarUiStructureComponent,
      tooltip: '控件结构视图',
      position: 'left-top',
      width: 320,
      minWidth: 180,
      isOpen: false,
      showTab: true,
    }),
    this.use({
      name: ' UI 属性',
      icon: 'unordered-list',
      component: SpaceSidebarUiAttributeComponent,
      tooltip: '调整控件属性',
      position: 'right-top',
      width: 320,
      minWidth: 180,
      isOpen: false,
      showTab: true,
    }),
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.developService.showConsole$.subscribe(() => {
      const consoleItem: SpaceSidebarEntry | undefined = this.items.find(
        (item) => item.name === '控制台',
      );
      if (consoleItem) consoleItem.isOpen = true;
    });
    this.developService.targetFile$.subscribe((file) => {
      this.items.forEach((item) => {
        if (item.name.startsWith(' UI ')) item.showTab = file.type == 'js';
      });
    });
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
      this.state.needResize$.next(false);
    };
    document.onmouseup = (e) => {
      e.stopPropagation();
      document.onmousemove = null;
      document.onmouseup = null;
      this.state.needResize$.next(true);
    };
  }

  onBtnClick(item: SpaceSidebarEntry): void {
    item.isOpen = !item.isOpen;
    this.state.needResize$.next(true);
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

  getThirdBackground(): string {
    if (this.state.theme$.getValue() == ThemeMode.Default) {
      return '#bdbdbd';
    } else {
      return '#202020';
    }
  }

  getNameLength(name: string): string {
    let len = name.length * 12 + 50;
    if (name.startsWith(' UI ')) {
      len = len - 30;
    }
    return len + 'px';
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
