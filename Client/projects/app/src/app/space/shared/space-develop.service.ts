import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import { SpaceSaveMode } from '../common/space-modes.enums';
import { SpaceDebugService } from './space-debug.service';
import { SpaceFileService } from './space-file.service';

@Injectable()
// Space区域开发相关管理服务
export class SpaceDevelopService {
  readonly project$ = new BehaviorSubject<Project>(new Project());
  readonly debugEvents = this.debugService.events$;

  constructor(
    private debugService: SpaceDebugService,
    private fileService: SpaceFileService,
  ) {
    this.debugEvents
      .pipe(filter((event) => event.type == 'connect'))
      .subscribe(() => this.runFile());
  }

  openProject(files: ProjectFile[]): void {
    this.project$.next(new Project(files));
  }
  saveProject(mode: SpaceSaveMode): void {
    const project = this.project$.getValue();
    this.fileService.saveProject(project, mode);
  }

  runFile(): void {}

  connectDevice(url: string): void {
    this.debugService.connect(url);
  }
}
