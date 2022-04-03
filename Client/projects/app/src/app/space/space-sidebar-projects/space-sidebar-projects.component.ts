import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  NzTreeNode,
  NzTreeNodeOptions,
  NzTreeComponent,
} from 'ng-zorro-antd/tree';

import { IconUtils } from '../../common/utils/icon.utils';
import { SpaceStyleService } from '../shared/space-style.service';
import { Project } from '../../common/project.class';

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

  @ViewChild('tree') tree!: NzTreeComponent;

  data: NzTreeNodeOptions[] | NzTreeNode[] = [
    {
      title: 'Project',
      isRoot: true,
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
      changeData: async (projects) => {
        let files = projects.files;
        if (files.length == 1) {
          this.data = [
            {
              title: 'Project',
              key: 'Project',
              isRoot: true,
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
          let projectName = files[0].path.split('/')[0];
          this.data = [
            {
              title: projectName,
              key: projectName,
              isRoot: true,
              expanded: true,
              children: [],
            },
          ];
          await new Promise((r) => setTimeout(r));
          let rootNode = this.tree.getTreeNodeByKey(projectName);
          if (!rootNode) return;
          for (const file of files) {
            const ps = file.path.split('/');
            let focusNode: NzTreeNode = rootNode;
            let focusPath: string = projectName;
            for (const psKey in ps) {
              if (psKey == '0') continue;
              let name = ps[psKey];
              focusPath = focusPath + '/' + name;
              if (psKey != ps.length - 1 + '') {
                let node = this.tree.getTreeNodeByKey(focusPath);
                if (node) {
                  focusNode = node;
                } else {
                  focusNode.addChildren([
                    {
                      title: name,
                      key: focusPath,
                      expanded: true,
                      children: [],
                    },
                  ]);
                  let temp = this.tree.getTreeNodeByKey(focusPath);
                  if (temp) focusNode = temp;
                }
              } else {
                focusNode.addChildren([
                  {
                    title: name,
                    key: focusPath,
                    isLeaf: true,
                  },
                ]);
                let temp = this.tree.getTreeNodeByKey(focusPath);
                if (temp) focusNode = temp;
              }
            }
          }
        }
      },
    };
  }

  getNodeIdFromListByTitle(
    data: NzTreeNodeOptions[] | undefined,
    title: string,
  ): number {
    if (data) {
      for (const dataKey in data) {
        if (data[dataKey].title == title) {
          return parseInt(dataKey, 10);
        }
      }
    }
    return -1;
  }

  getFileIcon(name: string): string {
    return IconUtils.getIconByFileName(name);
  }
}

export interface SpaceSidebarProjectsController {
  changeData: (project: Project) => void;
}
