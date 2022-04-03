import { Injectable } from '@angular/core';

import { Project } from '../../common/project.class';
import {BFile} from "../../common/bfile.class";

@Injectable({
  providedIn: 'root',
})

// Space区域文件编辑相关管理服务
export class SpaceEditorService {
  project: Project;
  constructor() {
    this.project = new Project()
  }

  openProject(files: BFile[]): Project {
    this.project = new Project(files)
    return this.project
  }
  saveProject(): void {}
}
