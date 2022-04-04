import { Component, OnInit } from '@angular/core';

import { SpaceSidebarEntry } from '../../space-sidebar-manager/space-sidebar-manager.component';

@Component({
  selector: 'app-space-sidebar-layout',
  templateUrl: './space-sidebar-layout.component.html',
  styleUrls: ['./space-sidebar-layout.component.less'],
})
export class SpaceSidebarLayoutComponent implements OnInit {
  constructor(public entry: SpaceSidebarEntry) {}

  ngOnInit(): void {}

  onHideBtn(): void {
    this.entry.isOpen = false;
  }

  onSetBtn(): void {}
}
