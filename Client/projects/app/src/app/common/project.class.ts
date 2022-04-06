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
      this.target = this.getDefaultTarget();
    }
  }

  getTargetFile(): ProjectFile {
    return this.files[this.target];
  }
  changeTargetFile(filePath: string): boolean {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].path === filePath) {
        this.target = i;
        return true;
      }
    }
    return false;
  }

  getType(){
    return this.files.length==1 ? ProjectType.File : ProjectType.Folder;
  }

  getDefaultTarget(): number {
    const mainFileList = 'main.js index.js'.split(' ')
    let jsFile: number = -1;
    for (const filesKey in this.files) {
      const file = this.files[filesKey]
      if(mainFileList.includes(file.name)){
        return parseInt(filesKey,10);
      }else if(file.type=='js'){
        jsFile = parseInt(filesKey,10);
      }
    }
    return jsFile;
  }

  static getDefaultProject(): Project {
    const defaultCode = '';
    return new Project([
      ProjectFile.makeProjectFileByCode(defaultCode,'Project/main.js')
    ], ProjectEngine.BLogic);
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
