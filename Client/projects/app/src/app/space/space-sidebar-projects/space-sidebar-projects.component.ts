import { Component, OnInit } from '@angular/core';
import {IconUtils} from "../utils/icon.utils";

@Component({
  selector: 'app-space-sidebar-files',
  templateUrl: './space-sidebar-projects.component.html',
  styleUrls: ['./space-sidebar-projects.component.less'],
})
export class SpaceSidebarProjectsComponent implements OnInit {
  constructor() {}

  data = [
    {
      title: 'Project',
      key: '100',
      expanded: true,
      children: [
        {
          title: 'src',
          key: '1000',
          expanded: true,
          children: [
            {
              title: 'main.js',
              key: '10001',
              isLeaf: true,
            },
            {
              title: 'file.js',
              key: '10002',
              isLeaf: true,
            },
          ],
        },
        {
          title: 'res',
          key: '1001',
          expanded: true,
          children: [
            {
              title: 'logo.ico',
              key: '10011',
              isLeaf: true,
            },
            {
              title: 'leaf.jpg',
              key: '10012',
              isLeaf: true,
            },
          ],
        },
      ]
    }
  ]

  ngOnInit(): void {}

  getFileIcon(name: string): string {
    return IconUtils.getIconByFileName(name)
  }
}
