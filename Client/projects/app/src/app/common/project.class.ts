import { ProjectFile } from './project-file.class';

export class Project {
  target = 0;
  name = 'Project';
  constructor(
    public files: ProjectFile[],
    public type: ProjectType = ProjectType.File,
    public engine: ProjectEngine = ProjectEngine.BLogic,
  ) {
    if (type == ProjectType.Folder) {
      this.name = files[0].path.split('/')[0];
    }
  }

  getTargetFile(): ProjectFile {
    return this.files[this.target];
  }

  static getDefaultProject(): Project {
    const defaultCode = '';
    return new Project([
      ProjectFile.makeProjectFileByCode(defaultCode,'Project/main.js')
    ], ProjectType.File, ProjectEngine.BLogic);
  }

  static getEmptyProject(): Project {
    return new Project([], ProjectType.File, ProjectEngine.BLogic);
  }
}

export enum ProjectType {
  File,
  Folder,
}

export enum ProjectEngine {
  BLogic,
  AutoJs,
  Harmony,
  PyTorch,
}
