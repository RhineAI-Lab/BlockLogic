import { ProjectFile } from './project-file.class';

export class Project {
  target = 0;
  name = 'Project'
  constructor(
    public files: ProjectFile[] = [],
    public type: ProjectType = ProjectType.File,
    public engine: ProjectEngine = ProjectEngine.BLogic,
  ) {
    if (!files.length) files.push(new ProjectFile(new File([], '')));
    if(type == ProjectType.Folder){
      this.name = files[0].path.split('/')[0]
    }
  }

  getTargetFile(): ProjectFile {
    return this.files[this.target];
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
