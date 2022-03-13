import { Component, Inject, OnInit } from '@angular/core';

import { SpaceSidebarComponent } from '../../space-sidebar/space-sidebar.component';

@Component({
  selector: 'app-space-sidebar-layout',
  templateUrl: './space-sidebar-layout.component.html',
  styleUrls: ['./space-sidebar-layout.component.less'],
})
export class SpaceSidebarLayoutComponent implements OnInit {
  constructor(@Inject(SpaceSidebarComponent.ITEM_NAME) public name: string) {}

  ngOnInit(): void {}
}
