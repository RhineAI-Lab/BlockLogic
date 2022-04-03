import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { BFile } from '../services/bfile.class';
import { SpaceStyleService } from '../services/space-style.service';
import { IconUtils } from '../utils/icon.utils';

@Component({
  selector: 'app-space-sidebar-files',
  templateUrl: './space-sidebar-projects.component.html',
  styleUrls: ['./space-sidebar-projects.component.less'],
})
export class SpaceSidebarProjectsComponent implements OnInit, AfterViewInit {
  spaceStyleService: SpaceStyleService;
  notification: NzNotificationService;
  constructor(
    spaceStyleService: SpaceStyleService,
    notification: NzNotificationService,
  ) {
    this.spaceStyleService = spaceStyleService;
    this.notification = notification;
  }

  data: NzTreeNodeOptions[] | NzTreeNode[] = [
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
      ],
    },
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.spaceStyleService.sidebarProjectController = {
      changeData: (files) => {
        if (files.length == 0) {
          this.data = [
            {
              title: 'Project',
              key: 'Project',
              expanded: true,
              children: [
                {
                  title: files[0].name,
                  key: 'Project/' + files[0].name,
                  isLeaf: true,
                },
              ],
            },
          ];
        } else {
          this.data = [];
          for (const file of files) {
            // TODO: unused variable
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const ps = file.path.split('/');
          }
        }
      },
    };
  }

  getFileIcon(name: string): string {
    return IconUtils.getIconByFileName(name);
  }
}

export interface SpaceSidebarProjectsController {
  changeData: (files: BFile[]) => void;
}
