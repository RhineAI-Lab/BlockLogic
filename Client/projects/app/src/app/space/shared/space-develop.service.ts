import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import { wait } from '../../common/promisify.utils';
import { SpaceSaveMode } from '../common/space-modes.enums';
import { SpaceDebugService } from './space-debug.service';
import { SpaceFileService } from './space-file.service';

@Injectable()
// Space区域开发相关管理服务
export class SpaceDevelopService {
  readonly project$ = new BehaviorSubject<Project | null>(null);

  constructor(
    private debugService: SpaceDebugService,
    private fileService: SpaceFileService,
    private notifier: NzNotificationService,
  ) {
    this.debugService.connect$.subscribe(() => {
      this.notifier.remove();
      this.notifier.success('连接成功', '设备: ' + debugService.device);
    });
    this.debugService.close$.subscribe(() => {
      this.notifier.warning('连接断开', '设备: ' + debugService.device);
    });
    // TODO: argument type `evt`?
    this.debugService.error$.subscribe((evt: any) => {
      this.notifier.error('连接错误', '地址: ' + evt.target?.url);
    });
  }

  openProject(files: ProjectFile[]): void {
    this.project$.next(new Project(files));
  }
  saveProject(mode: SpaceSaveMode): void {
    const project = this.project$.getValue();
    if (!project) throw new Error();
    this.fileService.saveProject(project, mode);
  }

  async connectDevice(url: string): Promise<void> {
    this.debugService.connect(url);
    // TODO: extract as a utility function
    await wait(100);
    if (!this.debugService.connected) {
      this.notifier?.info('正在连接...', '');
    }
  }
}
