import { Injectable } from '@angular/core';

import { Project } from './project.class';

@Injectable({
  providedIn: 'root',
})

// Space区域文件编辑相关管理服务
export class SpaceEditorService {
  constructor() {}

  project: Project = Project.getDefaultProject();

  openProject(): void {}
  saveProject(): void {}
}
