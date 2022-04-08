import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';

import { Project } from '../../common/project.class';
import { wait } from '../../common/promisify.utils';
import { IconUtils } from '../../common/utils/icon.utils';
import { SpaceDevelopService } from '../shared/space-develop.service';
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {Clipboard} from "@angular/cdk/clipboard";

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
      children: [],
    },
  ];

  constructor(
    private developService: SpaceDevelopService,
    private nzContextMenuService: NzContextMenuService,
    private clipboard: Clipboard,
  ) {}

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

  onDoubleClick(event: NzFormatEmitEvent): void {
    if (event.node) {
      this.developService.openFile(event.node.origin.key);
    }
  }

  onRename(node: NzTreeNode): void {
    const origin = node.origin;
    const exist_list: string[] = [];
    node.getParentNode()?.children.forEach(item => {
      if(item.origin.isLeaf == origin.isLeaf && item.origin.title != origin.title){
        exist_list.push(item.origin.title);
      }
    });
    if(origin.isLeaf){
    }else{
    }
  }
  onDelete(node: NzTreeNode): void {

  }
  onNew(): void {

  }
  onMove(): void {

  }

  onCopyName(origin: NzTreeNodeOptions): void {
    this.clipboard.copy(origin.title);
    this.developService.notifiy('复制成功 '+origin.title, 'success');
  }
  onCopyPath(origin: NzTreeNodeOptions): void {
    this.clipboard.copy(origin.key);
    this.developService.notifiy('复制成功 '+origin.key, 'success');
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

  do(): void{}

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }
}
