import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';

import { Project } from '../../common/project.class';
import { wait } from '../../common/promisify.utils';
import { FileUtils } from '../../common/utils/file.utils';
import { SpaceDevelopService } from '../services/space-develop.service';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProjectFile } from '../../common/project-file.class';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProjectFolder } from '../../common/project-folder.class';

@Component({
  selector: 'app-space-sidebar-files',
  templateUrl: './space-sidebar-projects.component.html',
  styleUrls: ['./space-sidebar-projects.component.less'],
})
export class SpaceSidebarProjectsComponent implements OnInit {
  @ViewChild('tree') tree!: NzTreeComponent;

  existsList: string[] = [];

  renameNode: NzTreeNode | null = null;
  renameModalVisible = false;
  renameValue = '';

  deleteTitle = '';
  deleteNode: NzTreeNode | null = null;
  deleteModalVisible = false;
  deleteTargetPath = '';

  NewFileType = NewType;
  newNode: NzTreeNode | null = null;
  newType = NewType.File;
  newModalVisible = false;
  newValue = '';

  showSearchBox = false;
  searchValue = '';

  freshLock = false;

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
    private notification: NzNotificationService,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {
    this.developService.project$.subscribe((project) => {
      this.resolve(project)
    });
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
    return FileUtils.getIconByFileName(name);
  }

  onDoubleClick(event: NzFormatEmitEvent): void {
    if (event.node) {
      if (event.node.isLeaf) {
        this.developService.openFile(event.node.origin.key);
      }
    }
  }

  onRename(node: NzTreeNode): void {
    const origin = node.origin;
    this.existsList = [];
    node.getParentNode()?.children.forEach((item) => {
      if (
        item.origin.isLeaf == origin.isLeaf &&
        item.origin.title != origin.title
      ) {
        this.existsList.push(item.origin.title);
      }
    });
    this.renameNode = node;
    this.renameValue = origin.title;
    this.renameModalVisible = true;
  }
  onDelete(node: NzTreeNode): void {
    this.deleteTargetPath = node.origin.key;
    this.deleteNode = node;
    this.deleteTitle = '确认要删除 ' + node.origin.title + ' 吗？';
    this.deleteModalVisible = true;
  }
  onNew(type: NewType, node: NzTreeNode): void {
    this.existsList = [];
    node.children.forEach((item) => {
      if (item.origin.isLeaf && type != NewType.Folder) {
        this.existsList.push(item.origin.title);
      } else if (item.origin.isLeaf == undefined && type == NewType.Folder) {
        this.existsList.push(item.origin.title);
      }
    });
    this.newNode = node;
    this.newType = type;
    this.newValue = '';
    if (type == NewType.BlockLogic || type == NewType.JavaScript) {
      this.newValue = '.js';
    } else if (type == NewType.Python) {
      this.newValue = '.py';
    }
    this.newModalVisible = true;
  }
  onMove(event: NzFormatEmitEvent): void {}

  onNewOk(): void {
    this.newValue = this.newValue.trim();
    if (this.existsList.includes(this.newValue)||this.newValue.length==0) return;
    this.newModalVisible = false;

    const project = this.developService.project$.getValue();
    if (this.newType == NewType.Folder) {
      const folder = new ProjectFolder(
        this.newNode!.origin.key + '/' + this.newValue,
      );
      project.folders.push(folder);
      project.sortFoldersByPath();
    } else {
      let defaultCode = '';
      if (this.newType == NewType.BlockLogic) {
        defaultCode = `
console.log('HelloWorld');



//------ 图形块结构记录 请勿随意修改 ------
/*<xml xmlns="https://logic.autojs.org/xml"><block type="console_output" id="+=3+{]OC^:(lSk.2D}{C" x="70" y="150"><field name="TYPE">log</field><value name="CONTENT"><shadow type="text" id="UuJldUNi}cp6]}gp3Ldr"><field name="TEXT">HelloWorld</field></shadow></value></block></xml>*/
`;
      } else if (this.newType == NewType.JavaScript) {
        defaultCode = 'console.log("HelloWorld");';
      } else if (this.newType == NewType.Python) {
        defaultCode = 'print("HelloWorld");';
      }
      const file = ProjectFile.makeProjectFileByCode(
        defaultCode,
        this.newNode!.origin.key + '/' + this.newValue,
      );
      project.files.push(file);
      project.sortFilesByPath();
      this.developService.openFile(file.path);
    }
    this.resolve(project);
  }
  onDeleteOk(): void {
    this.deleteModalVisible = false;
    const project = this.developService.project$.getValue();
    if (this.deleteNode!.origin.isLeaf) {
      for (const file of project.files) {
        if (file.path == this.deleteTargetPath) {
          project.files.splice(project.files.indexOf(file), 1);
          this.developService.closeEvent$.next(file);
          this.notification.success('文件已删除', '');
          break;
        }
      }
    } else {
      const deleteFolder = this.deleteTargetPath + '/';
      for (const file of project.files) {
        if (file.path.startsWith(deleteFolder)) {
          this.developService.closeEvent$.next(file);
          project.files.splice(project.files.indexOf(file), 1);
        }
      }
      for (let i=0;i<project.folders.length;i++) {
        const folder = project.folders[i];
        if (
          folder.path.startsWith(deleteFolder) ||
          folder.path == this.deleteTargetPath
        ) {
          project.folders.splice(project.folders.indexOf(folder), 1);
          i--;
        }
      }
      this.notification.success('文件夹已删除', '');
    }
    this.resolve(project);
  }
  onRenameOk(): void {
    this.renameValue = this.renameValue.trim();
    if (this.existsList.includes(this.renameValue)||this.renameValue.length==0) return;
    if (this.renameValue == this.renameNode?.title) return;
    this.renameModalVisible = false;

    const origin = this.renameNode!.origin;
    const name = this.renameValue.trim();
    const project = this.developService.project$.getValue();
    let old = origin.title;
    if (origin.isLeaf) {
      const path =
        origin.key.substring(0, origin.key.length - old.length) + name;
      const file = project.getFileByPath(origin.key)!;
      file.renamePath(path);
      project.sortFilesByPath();
    } else {
      const oldPath = origin.key + '/';
      const newPath =
        origin.key.substring(0, origin.key.length - old.length) + name;
      for (const folder of project.folders) {
        if (folder.path.startsWith(oldPath)) {
          const newFolderPath = newPath + '/' + folder.path.substring(oldPath.length);
          folder.renamePath(newFolderPath);
        } else if (folder.path == origin.key) {
          folder.renamePath(newPath);
        }
      }
      for (const file of project.files) {
        if (file.path.startsWith(oldPath)) {
          const oldFilePath = file.path;
          const newFilePath = newPath + '/' + file.path.substring(oldPath.length);
          file.renamePath(newFilePath);
        }
      }
      project.sortFoldersByPath();
      project.sortFilesByPath();
    }
    this.resolve(project);
    this.notification.success('重命名成功', old + ' -> ' + name);
  }

  onCopyName(origin: NzTreeNodeOptions): void {
    this.clipboard.copy(origin.title);
    this.notification.success('复制成功 ' + origin.title, '');
  }
  onCopyPath(origin: NzTreeNodeOptions): void {
    this.clipboard.copy(origin.key);
    this.notification.success('复制成功 ' + origin.key, '');
  }

  onSearchChange(event: NzFormatEmitEvent): void {}

  private async resolve(project: Project): Promise<void> {
    if(this.freshLock) {
      const interval = setInterval(() => {
        if(!this.freshLock) {
          clearInterval(interval);
          this.resolve(project);
        }
      }, 1);
      return ;
    }
    this.freshLock = true;
    let projectName = project.name;
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
    for (const folder of project.folders) {
      const ps = folder.path.split('/');
      let focusNode: NzTreeNode = rootNode;
      let focusPath: string = projectName;
      for (const psKey in ps) {
        if (psKey == '0') continue;
        const name = ps[psKey];
        focusPath = focusPath + '/' + name;
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
      }
    }
    for (const file of project.files) {
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
    this.freshLock = false;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }
}

enum NewType {
  File,
  Folder,
  BlockLogic,
  JavaScript,
  Python,
}
