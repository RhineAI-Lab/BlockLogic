import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NzTreeComponent,
  NzTreeNode,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { filter } from 'rxjs';

import { Project } from '../../common/project.class';
import { wait } from '../../common/promisify.utils';
import { IconUtils } from '../../common/utils/icon.utils';
import { SpaceDevelopService } from '../shared/space-develop.service';

@Component({
  selector: 'app-space-sidebar-files',
  templateUrl: './space-sidebar-projects.component.html',
  styleUrls: ['./space-sidebar-projects.component.less'],
})
export class SpaceSidebarProjectsComponent implements OnInit {
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

  constructor(private developService: SpaceDevelopService) {}

  ngOnInit(): void {
    this.developService.project$.subscribe((project) => this.resolve(project));
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

  private async resolve(project: Project): Promise<void> {
    const files = project.files;
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
      const projectName = files[0].path.split('/')[0];
      this.data = [
        {
          title: projectName,
          key: projectName,
          isRoot: true,
          expanded: true,
          children: [],
        },
      ];
      await wait();
      const rootNode = this.tree.getTreeNodeByKey(projectName);
      if (!rootNode) return;
      for (const file of files) {
        const ps = file.path.split('/');
        let focusNode: NzTreeNode = rootNode;
        let focusPath: string = projectName;
        for (const psKey in ps) {
          if (psKey == '0') continue;
          const name = ps[psKey];
          focusPath = focusPath + '/' + name;
          if (psKey != ps.length - 1 + '') {
            const node = this.tree.getTreeNodeByKey(focusPath);
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
              const temp = this.tree.getTreeNodeByKey(focusPath);
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
            const temp = this.tree.getTreeNodeByKey(focusPath);
            if (temp) focusNode = temp;
          }
        }
      }
    }
  }
}
