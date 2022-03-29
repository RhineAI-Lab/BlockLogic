import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Component, Injector, OnInit } from '@angular/core';

import { SpaceSidebarFilesComponent } from '../space-sidebar-files-ck/space-sidebar-files.component';

@Component({
  selector: 'app-space-sidebar',
  templateUrl: './space-sidebar.component.html',
  styleUrls: ['./space-sidebar.component.less'],
})
export class SpaceSidebarComponent implements OnInit {
  static readonly ITEM_NAME = Symbol();

  items: Item[] = [
    {
      name: '资源管理器',
      icon: 'file',
      component: SpaceSidebarFilesComponent,
    },
  ];
  itemActive = this.items[0];

  constructor(private injector: Injector) {}

  ngOnInit(): void {}

  use<Component>(item: Item<Component>): ComponentPortal<Component> {
    if (item.portal) return item.portal;
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: SpaceSidebarComponent.ITEM_NAME, useValue: item.name },
      ],
    });
    item.portal = new ComponentPortal(item.component, undefined, injector);
    return item.portal;
  }
}

interface Item<Component = unknown> {
  icon: string;
  name: string;
  component: ComponentType<Component>;
  portal?: ComponentPortal<Component>;
}
