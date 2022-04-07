import { ProjectFile } from './project-file.class';
import {Observable} from "rxjs";

export class Project {
  target = -1;
  name = 'Project';
  constructor(
    public files: ProjectFile[],
    public engine: ProjectEngine = ProjectEngine.BLogic,
  ) {
    if (files.length >= 1) {
      this.name = files[0].path.split('/')[0];
      this.target = this.findDefaultTarget();
    }
  }

  getTargetFile(): ProjectFile {
    return this.files[this.target];
  }
  changeTargetFile(filePath: string): boolean {
    const file = this.getFileByPath(filePath);
    if (file) {
      this.target = this.files.indexOf(file);
      return true;
    } else {
      return false;
    }
  }

  get type(): ProjectType {
    return this.files.length == 1 ? ProjectType.File : ProjectType.Folder;
  }

  getFileByPath(path: string): ProjectFile | null {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].path === path) {
        return this.files[i];
      }
    }
    return null;
  }

  initAll(): Observable<void>{
    return new Observable<void>(observer => {
      let initialized: string[] = [];
      this.files.forEach(file => {
        if(file.gotCode||file.source){
          observer.next();
          initialized.push(file.path)
          if(initialized.length== this.files.length){
            observer.complete();
          }
        }else{
          file.init().subscribe({
            complete: () => {
              initialized.push(file.path)
              if (initialized.length == this.files.length) {
                observer.next();
                observer.complete();
              }
            },
          });
        }
      });
    });
  }

  findDefaultTarget(): number {
    const mainFileList = 'main.js index.js'.split(' ');
    let jsFile = -1;
    for (const filesKey in this.files) {
      const file = this.files[filesKey];
      if (mainFileList.includes(file.name)) {
        return parseInt(filesKey, 10);
      } else if (file.type == 'js') {
        jsFile = parseInt(filesKey, 10);
      }
    }
    if(jsFile !== -1) return jsFile;
    for (const filesKey in this.files) {
      if(ProjectFile.SUPPORT_OPEN_LIST.includes(this.files[filesKey].type))
        return parseInt(filesKey, 10);
    }
    return jsFile;
  }

  static getDefaultProject(): Project {
    return new Project(
      [ProjectFile.makeProjectFileByUrl('default-code.js', 'Project/main.js')],
      ProjectEngine.BLogic,
    );
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
