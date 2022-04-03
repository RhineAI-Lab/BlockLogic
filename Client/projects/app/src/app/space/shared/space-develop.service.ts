import { Injectable } from '@angular/core';

import { Project } from '../../common/project.class';
import { BFile } from '../../common/bfile.class';
import { SpaceStyleService } from './space-style.service';
import { SpaceDebugService } from './space-debug.service';

@Injectable({
  providedIn: 'root',
})

// Space区域开发相关管理服务
export class SpaceDevelopService {
  spaceStyleService?: SpaceStyleService;
  spaceDebugService: SpaceDebugService;
  project: Project;
  constructor(spaceDebugService: SpaceDebugService) {
    this.spaceDebugService = spaceDebugService;
    this.project = new Project();
  }

  openProject(files: BFile[]) {
    this.project = new Project(files);
    this.spaceStyleService?.openProject(this.project)
  }
  saveProject(): void {}

  connectDevice(url: string): void {

  }
}
