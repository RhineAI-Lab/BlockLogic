import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { BFile } from '../../common/bfile.class';
import { Project } from '../../common/project.class';
import { SpaceDebugService } from './space-debug.service';
import { SpaceStyleService } from './space-style.service';

@Injectable({
  providedIn: 'root',
})

// Space区域开发相关管理服务
export class SpaceDevelopService {
  spaceStyleService: SpaceStyleService;
  spaceDebugService: SpaceDebugService;
  notification?: NzNotificationService;
  constructor(
    spaceDebugService: SpaceDebugService,
    spaceStyleService: SpaceStyleService,
  ) {
    this.spaceDebugService = spaceDebugService;
    this.spaceStyleService = spaceStyleService;
    this.project = new Project();

    this.spaceDebugService.onConnect = () => {
      this.notification?.remove();
      this.notification?.success(
        '连接成功',
        '设备: ' + spaceDebugService.device,
      );
    };
    this.spaceDebugService.onClose = () => {
      this.notification?.warning(
        '连接断开',
        '设备: ' + spaceDebugService.device,
      );
    };
    this.spaceDebugService.onError = (evt: any) => {
      this.notification?.error('连接错误', '地址: ' + evt.target.url);
    };
  }

  project: Project;

  openProject(files: BFile[]): void {
    this.project = new Project(files);
    this.spaceStyleService?.openProject(this.project);
  }
  saveProject(): void {}

  connectDevice(url: string): void {
    this.spaceDebugService.connect(url);
    setTimeout(() => {
      if (!this.spaceDebugService.connected) {
        this.notification?.info('正在连接...', '');
      }
    }, 100);
  }
}
