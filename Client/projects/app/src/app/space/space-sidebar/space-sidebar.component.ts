import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';

import { SpaceSidebarFilesComponent } from '../space-sidebar-files/space-sidebar-files.component';

@Component({
  selector: 'app-space-sidebar',
  templateUrl: './space-sidebar.component.html',
  styleUrls: ['./space-sidebar.component.less'],
})
export class SpaceSidebarComponent implements OnInit {
  items: Item[] = [
    {
      icon: 'file',
      tooltip: '资源管理器',
      portal: new ComponentPortal(SpaceSidebarFilesComponent),
    },
  ];
  itemActive = this.items[0];

  constructor() {}

  ngOnInit(): void {}
}

interface Item {
  icon: string;
  tooltip: string;
  portal: ComponentPortal<unknown>;
}
