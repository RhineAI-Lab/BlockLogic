import { ProjectFile } from './project-file.class';

export class Project {
  target = 0;
  name = 'Project';
  constructor(
    public files: ProjectFile[],
    public engine: ProjectEngine = ProjectEngine.BLogic,
  ) {
    if (files.length>1) {
      this.name = files[0].path.split('/')[0];
    }
  }

  getTargetFile(): ProjectFile {
    return this.files[this.target];
  }

  getType(){
    return this.files.length==1 ? ProjectType.File : ProjectType.Folder;
  }

  static getDefaultProject(): Project {
    const defaultCode = '';
    return new Project([
      ProjectFile.makeProjectFileByCode(defaultCode,'Project/main.js')
    ], ProjectEngine.BLogic);
  }

  static getEmptyProject(): Project {
    return new Project([], ProjectEngine.BLogic);
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
