import { Component, OnInit } from '@angular/core';

import { SpaceSidebarEntry } from '../../space-sidebar-manager/space-sidebar-manager.component';
import { SpaceState } from '../../services/space-state.service';

@Component({
  selector: 'app-space-sidebar-layout',
  templateUrl: './space-sidebar-layout.component.html',
  styleUrls: ['./space-sidebar-layout.component.less'],
})
export class SpaceSidebarLayoutComponent implements OnInit {
  constructor(public entry: SpaceSidebarEntry, public state: SpaceState) {}

  ngOnInit(): void {}

  onHideBtn(): void {
    this.entry.isOpen = false;
    this.state.needResize$.next(true);
  }

  onSetBtn(): void {}
}
